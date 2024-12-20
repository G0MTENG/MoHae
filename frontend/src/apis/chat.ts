import { FetchChatListResponse, FetchChatMessagesResponse, FetchChatWithResponse } from '@/types'
import { api } from './api'

export const fetchChatList = async () => {
  const response = await api.get<FetchChatListResponse>('/chat')
  return response.data
}

export const fetchChatMessages = async (connectionId: number) => {
  const response = await api.get<FetchChatMessagesResponse>(`/chat/${connectionId}`)
  return response.data
}

export const fetchChatWith = async (connectionId: number) => {
  const response = await api.get<FetchChatWithResponse>(`/chat/with/${connectionId}`)
  return response.data
}
