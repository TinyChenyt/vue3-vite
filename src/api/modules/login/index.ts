/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 09:42:34
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-13 16:10:51
 * @FilePath: \vue3-vite\src\api\modules\login\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";

const getCodeImg = () => {
    return request.getImg('user/image');
}

export default {
    getCodeImg
}