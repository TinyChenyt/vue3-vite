/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-15 15:06:35
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 15:09:33
 * @FilePath: \vue3-vite\src\interface\countDown.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export namespace CountDown {
    export interface CountDownType {
        id: string
        title: string
        time: number
    }

    export interface CountDownProps {
        time: number
        format: string
        immediate: boolean
        target: number
    }
}