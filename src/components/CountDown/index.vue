<!--
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-14 09:38:59
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 15:11:40
 * @FilePath: \vue3-vite\src\components\CountDown\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { watch } from "vue";
import useCountDown from '../../hook/useCountDown'
import { CountDown } from '@/interface/countDown'
const props = withDefaults(defineProps<CountDown.CountDownProps>(), {
    time: 0,
    format: "DD:HH:mm:ss:SSS",
    immediate: true,
    target: 0
})

const emits = defineEmits(['finish', 'savePreTime', 'toReset'])

let { start, currentTime, stop, reset, remainTime } = useCountDown({
    ...props,
    onFinish: () => emits('finish'),
})
// 监听time是否变化
watch(() => props.target, () => {
    // 切换时保存上一次的数据
    emits('savePreTime', remainTime.value);
    console.log(props.time,'watch');
    let {start: newStart, currentTime: newCurrentTime, stop: newStop, reset: newReset, remainTime: newRemainTime } = useCountDown({
        ...props,
        onFinish: () => emits('finish'),
    })
    start = newStart;
    currentTime = newCurrentTime;
    stop = newStop;
    reset = newReset;
    remainTime = newRemainTime;
})

const toReset = () => {
    emits('toReset')
    console.log(props.time);
    reset();
}

// 判断是否需要立即执行
// onMounted(() => {
//     console.log(props.time,"time");
//     if (props.immediate) start()
// })

// 向外部暴露的内容
// defineExpose({
//     start,
//     currentTime,
// })
</script>

<template>
    <div class="count-down">
        <slot v-bind="currentTime">
            <h1>{{ currentTime.format }}</h1>
        </slot>
        <button @click="start">开始</button>
        <button @click="stop">暂停</button>
        <button @click="toReset">重置</button>
    </div>
</template>
   