import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { BASE_URL } from '@/api/config'

const service = axios.create({
  timeout: 10000,
  baseURL: BASE_URL
})

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config
  }
)

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse): Promise<AxiosResponse> => {
    const { status, data } = response
    if (status === 200) {
      return data
    } else {
      return Promise.reject(new Error('服务器异常!'))
    }
  },
  (error: AxiosError): Promise<AxiosResponse> => {
    return Promise.reject(error.message)
  }
)

export default service
