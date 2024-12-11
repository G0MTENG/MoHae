import {
  RefreshRequest,
  RefreshResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@/types'
import { api } from './api'

export const signIn = async (data: SignInRequest) => {
  const response = await api.post<SignInResponse>('/sign-in', data)
  return response.data
}

export const signUp = async (data: SignUpRequest) => {
  const response = await api.post<SignUpResponse>('/sign-up', data)
  return response.data
}

export const refresh = async ({ refreshToken }: RefreshRequest) => {
  const response = await api.post<RefreshResponse>(
    '/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  )
  return response.data
}
