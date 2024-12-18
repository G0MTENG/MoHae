import { fetchChatList, fetchChatMessages, fetchChatWith } from '@/apis/chat'
import {
  QueryOptions,
  FetchChatListResponse,
  FetchChatMessagesResponse,
  FetchChatWithResponse,
} from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchChatList = (queryOptions?: QueryOptions<FetchChatListResponse>) => {
  return useQuery({
    queryKey: ['chat', 'list'],
    queryFn: fetchChatList,
    ...queryOptions,
  })
}

export const useFetchChatRoomMessages = (
  connectionId: number,
  queryOptions?: QueryOptions<FetchChatMessagesResponse>,
) => {
  return useQuery({
    queryKey: ['chat', 'messages', connectionId],
    queryFn: () => fetchChatMessages(connectionId),
    ...queryOptions,
  })
}

export const useFetchChatWith = (
  connectionId: number,
  queryOptions?: QueryOptions<FetchChatWithResponse>,
) => {
  return useQuery({
    queryKey: ['chat', 'with', connectionId],
    queryFn: () => fetchChatWith(connectionId),
    ...queryOptions,
  })
}
