import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/page/Home.vue'
import Login from '@/page/Login.vue'
import RolePlatform from '@/views/RolePlatform.vue'
const routes = [
    {
      path: '/home', component: Home,
      children: [
        { path: '', component: RolePlatform},
        { path: 'roles', component: RolePlatform },
      ]
    },
    { path: '/login', component: Login },
    { path: '/:catchAll(.*)', redirect: '/home' },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router