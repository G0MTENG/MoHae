import {
  createActivity,
  deleteActivity,
  fetchActivityList,
  fetchDetailActivity,
  fetchRecentActivity,
  updateActivity,
} from '@/apis'
import {
  CreateActivityResponse,
  DeleteActivityResponse,
  FetchDetailActivityResponse,
  FetchListActivityResponse,
  FetchRecentActivityResponse,
  MutationOptions,
  UpdateActivityResponse,
} from '@/types'
import { QueryOptions, useMutation, useQuery } from '@tanstack/react-query'

export const useCreateActivity = (
  mutationOptions?: MutationOptions<CreateActivityResponse, FormData>,
) => {
  return useMutation({
    mutationFn: createActivity,
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

export const useFetchDetailActivity = (
  id?: number,
  queryOptions?: QueryOptions<FetchDetailActivityResponse | null>,
) => {
  return useQuery({
    queryKey: ['activity', 'detail', id],
    queryFn: () => fetchDetailActivity(id),
    ...queryOptions,
  })
}

export const useDeleteActivity = (
  mutateOptions?: MutationOptions<DeleteActivityResponse, number>,
) => {
  return useMutation({
    mutationFn: deleteActivity,
    ...mutateOptions,
  })
}

export const useUpdateActivity = (
  mutateOptions?: MutationOptions<UpdateActivityResponse, { id: number; data: FormData }>,
) => {
  return useMutation({
    mutationFn: ({ id, data }) => updateActivity(id, data),
    ...mutateOptions,
  })
}
