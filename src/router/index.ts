/*
 * @Author: TinyChen 2454046178@qq.com
 * @Date: 2023-11-13 09:42:34
 * @LastEditors: TinyChen 2454046178@qq.com
 * @LastEditTime: 2023-11-15 14:45:59
 * @FilePath: \vue3-vite\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: "/login",
        name: 'Login',
        component: () => import("@/view/login/index.vue")
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/view/Home.vue"),
        redirect: '/chooseTime',
        children: [
            {
                path: "/chooseTime",
                name: "chooseTime",
                component: () => import("@/view/chooseTime/index.vue")
            },
            {
                path: '/countTime',
                name: 'CountTime',
                component: () => import("@/view/time/index.vue"),
            }
        ]
    },
    {
        path: "/:pathMatch(.*)",
        name: '404',
        component: () => import('@/view/404.vue')
    }
]

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHistory(),
    routes
})

// 导航守卫

export default router