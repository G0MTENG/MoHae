import { FetchUserInfoResponse } from '@/types/user'
import { api } from './api'

export const fetchUserInfo = async () => {
  const response = await api.get<FetchUserInfoResponse>('/user')

  return response.data
}

export const editUserProfile = async (data: FormData) => {
  const response = await api.put('/profile', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
