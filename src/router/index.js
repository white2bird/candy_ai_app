import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/page/Home.vue'
import Login from '@/page/Login.vue'
import RolePlatform from '@/views/RolePlatform.vue'
import RoleSetting from '@/views/RoleSetting.vue'
import RoleModelChat from '@/views/RoleModelChat.vue'
import NormalChat from '@/views/NormalChat.vue'
const routes = [
    {
      path: '/home', component: Home,
      children: [
        { path: '', component: RolePlatform},
        { path: 'roles', component: RolePlatform },
        { path: 'roleInit/:roleId', component: RoleSetting, props: true },
        { path: 'chat', component: RoleModelChat, props: true, name: 'chat' },
        { path: 'normalChat', component: NormalChat, props: true, name: 'normalChat' },
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