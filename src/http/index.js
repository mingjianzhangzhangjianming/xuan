import axios from 'axios'
import { message } from 'antd'

const errorText = {
    400: '参数信息有误',
    401: '请重新登陆',
    404: '404 nofind!',
    500: '服务器内部错误',
    560: '数据库异常'
}

let pending = [] //声明一个数组用于存储每个请求的取消函数和axios标识
let CancelToken = axios.CancelToken
let removePending = config => {
    if (!pending.length) return
    for (let i in pending) {
        if (pending[i].url === config.url + '&' + config.method) {
            pending[i].fn() //执行取消操作
            pending.splice(i, 1)
        }
    }
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // node环境的不同，对应不同的baseURL  process.env.BASE_API
    timeout: 10000, // 请求的超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8' //设置默认请求头，
    },
    withCredentials: true, // 允许跨域请求时使用凭证
    validateStatus: status => {
        return status >= 200 && status < 300 // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    }
})

instance.interceptors.request.use(
    config => {
        removePending(config) //在一个axios发送前执行一下取消操作
        config.cancelToken = new CancelToken(c => {
            // 这里的axios标识我是用请求地址&请求方式拼接的字符串
            pending.push({ url: config.url + '&' + config.method, fn: c })
        })
        const token = sessionStorage.getItem('token') //携带token
        token && (config.headers['Authorization'] = token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log(error) // for debug
        // 错误信息提示，具体配置自己修改
        if (error?.response) {
            message.info({
                content: errorText[error.response?.status],
                duration: 5
            })
        } else if (!window.navigator.onLine) {
            message.error({
                content: '无网络连接!',
                duration: 5
            })
        }
        return Promise.reject(error)
    }
)

export default instance
