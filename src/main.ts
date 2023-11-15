/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 09:42:34
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 15:25:48
 * @FilePath: \vue3-vite\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
// element-puls 库
import 'element-plus/dist/index.css';
// 全局状态管理
import { createPinia } from 'pinia';

const pinia = createPinia();
// createApp(App).mount('#app')
const app = createApp(App);

app.use(ElementPlus)
app.use(pinia);

app.use(router);
app.mount('#app');
