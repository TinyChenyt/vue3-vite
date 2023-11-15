/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-15 14:16:07
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 14:19:37
 * @FilePath: \vue3-vite\src\utils\DebounceThrottle.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 防抖：防抖指的是在事件触发n秒后再执行回调，如果在n秒内再次被触发，则重新计算时间。
export function debounce(fn: Function, delay = 200) {
    let timer:NodeJS.Timeout | null = null;
    return function() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(fn, arguments);
            timer = null;
        }, delay);
    }
}


// 节流：节流是指如果持续触发某个事件，则每隔n秒执行一次
export function throttle(fn: Function, delay = 100) {
    let timer: NodeJS.Timeout | null = null;
    return function() {
        if(timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(fn, arguments);
            timer = null;
        }, delay);
    }
}