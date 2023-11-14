<!--
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 09:42:34
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-14 17:46:16
 * @FilePath: \vue3-vite\src\view\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import router from '../../router';
import CountDown from '../../components/CountDown/index.vue';
import newTime from '../../assets/data/newTime.json'

const newTimeOptions = newTime;
console.log(newTimeOptions);

const toNotFound = () => {
    router.push({
        path: '/index'
    })
}
</script>

<template>
    <div class="home">
        <div>Home</div>
        <CountDown :time="newTimeOptions[0].positiveSideOneMakeAPoint" :format="'mm:ss:SSS'"></CountDown>
        <CountDown :time="newTimeOptions[0].negativeSideFourParadox" :format="'mm:ss:SSS'"></CountDown>
        <button @click="toNotFound">></button>
    </div>
</template>

<!-- 3 * 60 * 1000 -->