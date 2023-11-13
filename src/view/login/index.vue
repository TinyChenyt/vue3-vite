<!--
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 14:21:54
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-13 16:54:23
 * @FilePath: \vue3-vite\src\view\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import LoginForm from './components/loginForm.vue';

const login = (data: any) => {
    console.log(data);
    // 正式的请求
}
</script>

<template>
    <div class="login">
        <LoginForm @login="login"></LoginForm>
    </div>
</template>

<style>
.login {
    width: 400px;
    height: 400px;
}
</style>