import { computed, ref } from 'vue'
import { parseTime, formatTime } from '../../utils/countDown'


export default (options: { time: number; format: string; onFinish: () => void }) => {
    // 是否正在倒计时
    let counting = false
    // 是否暂停
    let stoping = false

    // 剩余时间
    const remain = ref(options.time)
    // 当前计时的长度
    const totalTime = ref(options.time)

    // 结束时间
    const endTime = ref(0)

    // 格式化输出的日期时间
    const currentTime = computed(() => formatTime(options.format, parseTime(remain.value)))

    // 获取当前剩余时间
    const getCurrentRemain = () => Math.max(endTime.value - Date.now(), 0)

    // 设置剩余时间
    const setRemain = (value: number) => {

        // 更新剩余时间
        remain.value = value

        // 倒计时结束
        if (value === 0) {
            // 触发 Finish 事件
            options.onFinish?.()

            // 正在倒计时标志为 false
            counting = false
        }
    }

    // 倒计时
    const tickTime = () => {
        requestAnimationFrame(() => {
            // 更新剩余时间
            setRemain(getCurrentRemain())

            // 倒计时没结束，就继续
            if (remain.value > 0 && !stoping) {
                tickTime()
            }
        })
    }

    // 启动
    const start = () => {
        // 正在倒计时，忽略多次调用 start 
        if (counting) return

        // 正在倒计时标志为 true
        counting = true
        // 启动计时
        stoping = false;

        // 设置结束时间
        endTime.value = Date.now() + remain.value
        
        // 开启倒计时
        tickTime()
    }

    // 暂停
    const stop = () => {
        stoping = true;
        counting = false;      
    }

    // 重置 
    const reset = () => {
        stop();
        setTimeout(() => {
            remain.value = totalTime.value
            endTime.value = Date.now() + remain.value;
            setRemain(getCurrentRemain());
        }, 10);
    }

    return {
        currentTime,
        start,
        stop,
        reset
    }

}
