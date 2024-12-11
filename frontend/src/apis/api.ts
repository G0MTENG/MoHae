import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    console.log(response)
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')

      const refreshToken = localStorage.getItem(REFRESH_TOKEN)
      if (refreshToken) {
        try {
          const {
            data: { accessToken },
          } = await api.post('/refresh', { refreshToken })

          localStorage.setItem('accessToken', accessToken)

          error.config.headers['Authorization'] = `Bearer ${accessToken}`
          return api.request(error.config)
        } catch (refreshError) {
          localStorage.removeItem(REFRESH_TOKEN)
          window.location.href = '/sign-in'

          return Promise.reject(refreshError)
        }
      } else {
        localStorage.removeItem(REFRESH_TOKEN)
        window.location.href = '/sign-in'
      }
    }

    console.error('API 요청 실패:', error)
    return Promise.reject(error)
  },
)