import { fetchUserInfo } from '@/apis/user'
import { FetchUserInfoResponse } from '@/types/user'
import { QueryOptions, useQuery } from '@tanstack/react-query'

export const useFetchUserInfo = (queryOptions?: QueryOptions<FetchUserInfoResponse>) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserInfo,
    ...queryOptions,
  })
}
