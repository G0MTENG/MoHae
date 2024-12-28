import { getItem, setItem } from '@/utils/storage'
import { api } from './api'

interface SignInResponse {
  accessToken: string
  refreshToken: string
}

export const signIn = async () => {
  const email = getItem('EMAIL')
  const password = getItem('PASSWORD')

  if (!email || !password) {
    return
  }

  const response = await api.post<SignInResponse>('/sign-in', {
    email,
    password,
  })

  const { accessToken, refreshToken } = response.data

  setItem('ACCESS_TOKEN', accessToken)
  setItem('REFRESH_TOKEN', refreshToken)

  return response.data
}
