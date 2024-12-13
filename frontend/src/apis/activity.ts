import {
  CreateActivityResponse,
  DeleteActivityResponse,
  FetchDetailActivityResponse,
  FetchListActivityResponse,
  FetchRecentActivityResponse,
  UpdateActivityResponse,
} from '@/types'
import { api } from './api'

export const createActivity = async (data: FormData) => {
  const response = await api.post<CreateActivityResponse>('/activity', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const fetchRecentActivity = async () => {
  const response = await api.get<FetchRecentActivityResponse>('/activity/recent')

  return response.data
}

export const fetchListActivity = async (date: string) => {
  const response = await api.get<FetchListActivityResponse>('/activity', {
    params: {
      date,
    },
  })

  return response.data
}

export const fetchDetailActivity = async (id: number) => {
  const response = await api.get<FetchDetailActivityResponse>(`/activity/${id}`)

  return response.data
}

export const deleteActivity = async (id: number) => {
  const response = await api.delete<DeleteActivityResponse>(`/activity/${id}`)

  return response.data
}

export const updateActivity = async (id: number, data: FormData) => {
  const response = await api.put<UpdateActivityResponse>(`/activity/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
