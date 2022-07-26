import {createRouter, createWebHashHistory} from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        redirect: '/chat'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import(/* webpackChunkName: "about" */ '../views/chat/page/ChatPage')
    },
]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    routes
})

// 导航守卫，登录
router.beforeEach((to, from, next) => {
    let username = localStorage.getItem("username")
    if (to.path === "/login") {
        if (username) {
            // TODO
            next("/chat");
        } else {
            next();
        }
    } else {
        if (username) {
            next();
        } else {
            next("/login");
        }
    }
})

export default router
