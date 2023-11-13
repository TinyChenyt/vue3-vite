<!--
 * @Author: chenyt
 * @Date: 2023-11-11 10:24:24
 * @Description: 
-->

<script setup lang="ts">
import UseTest from '@/hook/useTest'
import { onMounted } from 'vue';
const useTest = UseTest();
const getMenu = async() => {
    const res = await useTest.getMenu();
    console.log(res);   
}
// getMenu()
onMounted(() => {
    getMenu();
})
</script>

<template>
    <div class="home"></div>
</template>

<style scoped>
.home {
    width: 100px;
    height: 100px;
    background-color: var(--brand-color);
}
</style>