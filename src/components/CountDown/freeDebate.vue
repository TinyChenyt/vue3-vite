<!--
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-15 11:35:19
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 15:11:15
 * @FilePath: \vue3-vite\src\components\CountDown\freeDebate.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import useCountDown from '../../hook/useCountDown'
import { CountDown } from '@/interface/countDown'
const props = withDefaults(defineProps<CountDown.CountDownProps>(), {
    time: 0,
    format: "DD:HH:mm:ss:SSS",
    immediate: true,
    target: 0
})
const emit = defineEmits(['finish']);
let { start, currentTime, stop, reset, remainTime } = useCountDown({
    ...props,
    onFinish: () => emit('finish'),
})
console.log(remainTime);

const roReset = () => {
    reset()
}
defineExpose({
    start,
    stop,
})
</script>

<template>
    <div>
        <slot v-bind="currentTime">
            <h1>{{ currentTime.format }}</h1>
            <button @click="start">开始</button>
            <button @click="stop">暂停</button>
            <button @click="roReset">重置</button>
        </slot>
    </div>
</template>