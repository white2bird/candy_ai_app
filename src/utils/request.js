import axios from 'axios'
import router from '../router/index'
const request = axios.create({
    baseURL: 'http://localhost:8000', // 设置基础 URL
    timeout: 5000, // 请间
    // 其他 Axios 配置项
})


request.interceptors.request.use(
    (config) => {
        // 发送之前带上token
        var token = localStorage.getItem("token")
        console.log('---before---request------', token)
        if(token != null && token != ""){
            config.headers.token = token
        }
        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
// 添加响应拦截器
request.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        // console.log('---response------', response)
        if(response.data.code == 401){
            router.push('/login')
        }
        return response.data
    },
    (error) => {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
export default request