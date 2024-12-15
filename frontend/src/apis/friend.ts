import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendResponse,
  FetchFriendActivitiesResponse,
  FetchFriendsResponse,
} from '@/types'
import { api } from './api'

export const fetchFriends = async () => {
  const response = await api.get<FetchFriendsResponse>('/friend')
  return response.data
}

export const createFriend = async (data: CreateFriendRequest) => {
  const response = await api.post<CreateFriendResponse>('/friend', data)
  return response.data
}

export const deleteFriend = async (friendId: number) => {
  const response = await api.delete<DeleteFriendResponse>(`/friend/${friendId}`)
  return response.data
}

export const fetchFriendActivities = async () => {
  const response = await api.get<FetchFriendActivitiesResponse>('/friend/activity')
  return response.data
}
