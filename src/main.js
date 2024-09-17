import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import store from './store'
import request from './utils/request'
import router from './router'


const app = createApp(App)
app.provide("$request", request)
app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
