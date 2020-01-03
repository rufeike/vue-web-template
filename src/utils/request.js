import axios from 'axios'

const request = axios.create({
  baseURL: process.env.APP_HTTP_HOST,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'applicattion/json'
  }
})

// 请求拦截器
request.intercreptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error.message)
  }
)

// 相应拦截器

export default request
