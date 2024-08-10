import { useUserStore } from '@/stores'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    config.headers.icode = 'helloqianduanxunlianying'
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    const userStore = useUserStore()
    console.log(error)
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === 401
    ) {
      userStore.logout()
    }
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response: AxiosResponse<RequestType, any>) => {
    const { data, success, message } = response.data
    if (success) {
      return data
    }
    return Promise.reject(new Error(message))
  }
)

const request = async <T = any>(config: AxiosRequestConfig) => {
  return (await instance.request(config)) as T
}
export default request
