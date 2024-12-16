import { FriendAddSchema } from '@/schemas'
import * as z from 'zod'

export type FriendAddSchemaType = z.infer<typeof FriendAddSchema>

interface Friend {
  id: number
  username: string
  avatar?: string
}

interface FriendWithActivity {
  activity: {
    id: number
    title: string
    emoji: string
  }
  user: {
    avatar?: string
    id: number
    username: string
  }
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
