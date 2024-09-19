import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/page/Home.vue'
import Login from '@/page/Login.vue'
import RolePlatform from '@/views/RolePlatform.vue'
const routes = [
    {
      path: '/Home', component: Home,
      children: [
        { path: 'roles', component: RolePlatform },
      ]
    },
    { path: '/login', component: Login },
    { path: '/:catchAll(.*)', redirect: '/Home' },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router