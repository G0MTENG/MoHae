import { FetchChatListResponse } from '@/types'
import { api } from './api'

export const fetchChatList = async () => {
  const response = await api.get<FetchChatListResponse>('/chat')
  return response.data
}

export const fetchChatMessages = async (connectionId: number) => {
  const response = await api.get(`/chat/${connectionId}`)
  return response.data
}
