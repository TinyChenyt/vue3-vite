<!--
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-15 14:35:24
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 15:23:48
 * @FilePath: \vue3-vite\src\view\chooseTime\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { useTime } from "@/stores"

const store = useTime();
console.log(store);
</script>

<template>
    <div class="chooseTime">
        <el-row :gutter="12">
            <el-col :span="8">
                <el-card shadow="always"> one </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always"> Hover </el-card>
            </el-col>
            <el-col :span="8">
                <el-card shadow="always"> Never </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<style scope>
.el-card {
    cursor:pointer;
}
</style>