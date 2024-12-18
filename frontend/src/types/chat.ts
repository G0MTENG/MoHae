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

export interface Chat {
  id: number
  userId: number
  content: string
  createdAt: string
}

export type FetchChatMessagesResponse = Chat[]

export interface Friend {
  id: number
  username: string
  avatar?: string
  emoji?: string
}

export type FetchChatWithResponse = Friend
