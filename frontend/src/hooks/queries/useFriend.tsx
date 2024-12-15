import { createFriend, deleteFriend, fetchFriendActivities, fetchFriends } from '@/apis'
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendResponse,
  FetchFriendActivitiesResponse,
  FetchFriendsResponse,
  MutationOptions,
} from '@/types'
import { QueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useFetchFriends = (queryOptions?: QueryOptions<FetchFriendsResponse>) => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: fetchFriends,
    ...queryOptions,
  })
}

export const useCreateFriend = (
  mutationOptions?: MutationOptions<CreateFriendResponse, CreateFriendRequest>,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFriend,
    onSuccess: () => {
      console.log('성공')
      queryClient.resetQueries({
        queryKey: ['friends'],
      })
    },
    ...mutationOptions,
  })
}

export const useDeleteFriend = (
  mutationOptions?: MutationOptions<DeleteFriendResponse, number>,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ['friends'],
      })
    },
    ...mutationOptions,
  })
}

export const useFetchFriendsRecentActivity = (
  queryOptions?: QueryOptions<FetchFriendActivitiesResponse, { message: string }>,
) => {
  return useQuery({
    queryKey: ['friends', 'recent'],
    queryFn: fetchFriendActivities,
    ...queryOptions,
  })
}
