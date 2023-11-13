<!--
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 14:33:46
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-13 16:50:58
 * @FilePath: \vue3-vite\src\view\login\components\loginForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import UseLogin from '@/hook/useLogin';
const emit = defineEmits(['login'])
const useLogin = UseLogin();
interface RuleForm {
    username: string,
    password: string,
    code: string
}
const form = reactive<RuleForm>({
    username: '',
    password: '',
    code: ''
})
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
})
const ruleFormRef = ref();
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 正式请求
            console.log('submit!')
            emit('login', form)
        } else {
            console.log('error submit!', fields)
        }
    })
}
let codeImg = ref();
const getCodeImg = async () => {
    let img = await useLogin.getCodeImg();
    codeImg.value = window.webkitURL.createObjectURL(img.data);
}
onMounted(() => {
    getCodeImg();
})
</script>

<template>
    <div class="login_form">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="输入账号" size="large" clearable>
                    <template #prepend>账号</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password size="large" clearable>
                    <template #prepend>密码</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="code" size="large">
                <el-input v-model="form.code" placeholder>
                    <template #prepend>验证码</template>
                    <template #append style="padding: 0 !important;">
                        <img :src="codeImg" alt="" @click="getCodeImg">
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="large" @click="submitForm(ruleFormRef)" class="login__form__btn">登
                    录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.login_form {
    width: 100%;
    height: 100%;
}

:deep(.el-input-group__append) {
    padding: 0;
}
</style>