<script setup lang="ts">
import useCountDown from '../../hook/useCountDown'

const props = defineProps({
    time: {
        type: Number,
        default: 0,
    },
    format: {
        type: String,
        default: 'DD:HH:mm:ss:SSS',
    },
    immediate: {
        type: Boolean,
        default: true,
    },
})

const emits = defineEmits(['finish'])

const { start, currentTime, stop, reset } = useCountDown({
    ...props,
    onFinish: () => emits('finish'),
})

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
        <button @click="reset">重置</button>
    </div>
</template>
   