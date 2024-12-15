import { FriendAddSchema } from '@/schemas'
import * as z from 'zod'

export type FriendAddSchemaType = z.infer<typeof FriendAddSchema>

interface Friend {
  id: number
  username: string
  avatar?: string
}

interface FriendWithActivity {
  id: number
  userId: number
  title: string
  emoji: string
  username: string
  avatar?: string
}

export interface FetchFriendsResponse {
  friends: Friend[]
}

export interface DeleteFriendResponse {
  message: string
}

export type FetchFriendActivitiesResponse = FriendWithActivity[]

export interface CreateFriendResponse {
  message: string
}

export interface CreateFriendRequest {
  friendCode: string
}
