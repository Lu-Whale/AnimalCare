import axios from 'axios'
import router from '../router'

const BASE_URL = '/api'

//create axios instance
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

//router interceptors
instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response && err.response.status === 401) {
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push({
        name: 'login',
        query: {
          redirectUrl: fullPath,
        },
      })
      return Promise.reject(err)
    }
  }
)
//export instance
export default (
  url: string,
  method: string,
  submitData: object
): Promise<any> => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  })
}
