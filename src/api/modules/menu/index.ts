/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 09:42:34
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-13 11:10:08
 * @FilePath: \vue3-vite\src\api\menu\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import { get } from '../../utils/request'

// async function getMenu() {
//     let result = await get('caidan', null);
//     return result;
// }

// export const menuApi  = {
//     getMenu,
// }

import request from "../../../utils/request";

const getMenu = () => {
    return request.get('caidan')
}

export default {
    getMenu
}