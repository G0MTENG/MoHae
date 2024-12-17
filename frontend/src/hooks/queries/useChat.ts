import { fetchChatList, fetchChatMessages } from '@/apis/chat'
import { FetchChatListResponse, FetchChatMessagesResponse } from '@/types'
import { QueryOptions, useQuery } from '@tanstack/react-query'

export const useFetchChatList = (queryOptions?: QueryOptions<FetchChatListResponse, undefined>) => {
  return useQuery({
    queryKey: ['chat', 'list'],
    queryFn: fetchChatList,
    ...queryOptions,
  })
}

export const useFetchChatRoomMessages = (
  connectionId: number,
  queryOptions?: QueryOptions<FetchChatMessagesResponse, undefined>,
) => {
  return useQuery({
    queryKey: ['chat', 'messages', connectionId],
    queryFn: () => fetchChatMessages(connectionId),
    ...queryOptions,
  })
}
