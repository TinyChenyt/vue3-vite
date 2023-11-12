import { createRouter, createMemoryHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("../view/Home.vue")
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router