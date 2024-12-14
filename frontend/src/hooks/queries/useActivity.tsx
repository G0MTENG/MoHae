import { createActivity, fetchActivityList, fetchRecentActivity } from '@/apis'
import {
  CreateActivityResponse,
  FetchListActivityResponse,
  FetchRecentActivityResponse,
  MutationOptions,
} from '@/types'
import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useCreateActivity = (
  mutationOptions?: MutationOptions<CreateActivityResponse, FormData>,
) => {
  const navigator = useNavigate()
  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      alert('정상적으로 활동이 등록되었습니다.')
      navigator('/main/home')
    },
    ...mutationOptions,
  })
}

export const useFetchRecentActivity = (
  queryOptions?: QueryOptions<FetchRecentActivityResponse>,
) => {
  return useQuery({
    queryKey: ['main', 'recent'],
    queryFn: fetchRecentActivity,
    ...queryOptions,
  })
}

export const useFetchActivityList = (
  date: string,
  queryOptions?: QueryOptions<FetchListActivityResponse>,
) => {
  return useQuery({
    queryKey: ['main', 'list', date],
    queryFn: () => fetchActivityList(date),
    ...queryOptions,
  })
}
