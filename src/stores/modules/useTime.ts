/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-15 14:55:37
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 15:21:11
 * @FilePath: \vue3-vite\src\stores\modules\useTime.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";
import { CountDown } from '@/interface/countDown'

const useTime = defineStore('useTime', {
    state: () => ({
        timeData: new Array<CountDown.CountDownType>(),
    }),
    actions: {
        setTimeData(value: Array<CountDown.CountDownType>) {
            this.timeData = value;
        }
    }
})

export default useTime