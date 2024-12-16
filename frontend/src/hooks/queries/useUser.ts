import { editUserProfile, fetchUserInfo } from '@/apis/user'
import { MutationOptions } from '@/types'
import { EditUserProfileResponse, FetchUserInfoResponse } from '@/types/user'
import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'

export const useFetchUserInfo = (queryOptions?: QueryOptions<FetchUserInfoResponse>) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserInfo,
    ...queryOptions,
  })
}

export const useEditUserProfile = (
  mutationOptions?: MutationOptions<EditUserProfileResponse, FormData>,
) => {
  return useMutation({
    mutationFn: editUserProfile,
    ...mutationOptions,
  })
}
