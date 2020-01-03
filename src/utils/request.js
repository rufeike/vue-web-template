import axios from 'axios'
import store from '@/store'
import NProgress from 'nprogress'
import { Message } from 'element-ui' // 信息提醒

NProgress.configure({
  showSpintion: false
})

const request = axios.create({
  baseURL: process.env.VUE_APP_HTTP_HOST,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'applicattion/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    config.headers['token'] = store.state.token
    NProgress.start()
    return config
  },
  error => {
    Message.error({
      message: error.message
    })
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    NProgress.done()
    Message.error({
      message: error.message
    })
    return Promise.rejectt(error)
  }
)

export default request
