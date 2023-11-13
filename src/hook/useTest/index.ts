/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 11:14:10
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-13 11:16:16
 * @FilePath: \vue3-vite\src\hook\useTest\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import api from '@/api';

const getMenu = async() => {
    const res = await api.menu.getMenu();
    return res;
}

export default function useTest() {
    return {
        getMenu
    }
}