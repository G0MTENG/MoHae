import { FetchUserInfoResponse } from '@/types/user'
import { api } from './api'

export const fetchUserInfo = async () => {
  const response = await api.get<FetchUserInfoResponse>('/user')

  return response.data
}
