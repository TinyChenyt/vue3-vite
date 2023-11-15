<!--
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 09:42:34
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 14:29:27
 * @FilePath: \vue3-vite\src\view\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { ref } from "vue";
import CountDown from '../../components/CountDown/index.vue';
import { debounce } from '@/utils/DebounceThrottle'
import FreeDebate from "@/components/CountDown/freeDebate.vue";
import arrFn from '../../utils/array.ts'
import newTime from '../../assets/data/newTime.json'

const newTimeOptions = newTime;
const length = newTimeOptions.length - 1;
let nowIndex = ref(0);
let index = ref(0);
let time = newTimeOptions[index.value].time;
let linkId = newTimeOptions[index.value].id;
let flag: string = 'next';
let savePreTimeList:Array<number> = arrFn.createNumberArray(length + 1, -1);
const next = () => {
    index.value++;
    // console.log(index.value);
    if(savePreTimeList[index.value] !== -1) {
        time = savePreTimeList[index.value]
    } else {
        time = newTimeOptions[index.value].time;
    }
    nowIndex.value = index.value;
    linkId = newTimeOptions[index.value].id
    flag = 'next'
}
const previous = () => {
    index.value--;
    // console.log(index.value);
    if(savePreTimeList[index.value] !== -1) {
        time = savePreTimeList[index.value]
    } else {
        time = newTimeOptions[index.value].time;
    }
    linkId = newTimeOptions[index.value].id
    // console.log(linkId);
    nowIndex.value = index.value;
    flag = 'pre'
}
const savePreTime = (timeVal: number) => {
    let target = index.value;
    if(flag === 'next') {
        target = target - 1;
    } else {
        target = target + 1;
    }
    savePreTimeList[target] = timeVal
}
const toReset = () => {
    const target = index.value;
    savePreTimeList[target] = newTimeOptions[target].time
    time = savePreTimeList[target]
    nowIndex.value = -1;
}

const freePositiveSideRef = ref<any>();
const freeNegativeSideRef = ref<any>();
let text = ref('开始');
let freeTarget: boolean = true;
const  startFree = () => {
    text.value = '切换'
    
    if(freeTarget) {
        freePositiveSideRef.value.start();
        freeNegativeSideRef.value.stop();
    } else {
        freePositiveSideRef.value.stop();
        freeNegativeSideRef.value.start();
    }
    freeTarget = !freeTarget;
    // freePositiveSideRef.value.start();
}
const submitNext = debounce(next)
const submitPrev = debounce(previous)
const submitStartFree = debounce(startFree)
</script>

<template>
    <div class="home">
        <h1>{{ newTimeOptions[index].title }}</h1>
        <CountDown v-if="linkId !== 'freeDebate'" @save-pre-time="savePreTime" @toReset="toReset" :time="time" :target="nowIndex" :format="'mm:ss:SSS'"></CountDown>
        <FreeDebate v-if="linkId === 'freeDebate'" ref="freePositiveSideRef" :time="100000"></FreeDebate>
        <FreeDebate v-if="linkId === 'freeDebate'" ref="freeNegativeSideRef" :time="100000"></FreeDebate>
        <button @click="submitPrev" :disabled="index === 0">&lt</button>
        <button @click="submitStartFree" v-if="linkId === 'freeDebate'">{{ text }}</button>
        <button @click="submitNext" :disabled="index === length">></button>
    </div>
</template>

<!-- 3 * 60 * 1000 -->