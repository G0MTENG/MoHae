export interface FriendChatListItem {
  userId: number
  username: string
  avatar?: string
  emoji?: string
  connectionId: number
  lastestMessage?: string
  updatedAt?: string
}

export type FetchChatListResponse = FriendChatListItem[]

interface Chat {
  id: number
  userId: number
  content: string
  createdAt: string
}

export type FetchChatMessagesResponse = Chat[]
