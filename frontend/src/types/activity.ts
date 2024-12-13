import { CreateActivitySchema } from '@/schemas/activity'
import * as z from 'zod'

export type CreateActivitySchemaType = z.infer<typeof CreateActivitySchema>

export interface Image {
  id: number
  createdAt: string
  imageUrl: string
  order: number
  activityId: number
}

export interface Activity {
  id: number
  title: string
  description: string
  emoji: string
  images: Image[]
  createdAt: string
  endAt: string
  userId: number
}

export type CreateActivityResponse = Activity

export type FetchRecentActivityResponse = Activity

export type FetchListActivityResponse = Activity[]

export type FetchDetailActivityResponse = Activity

export type DeleteActivityResponse = Activity

export type UpdateActivityResponse = Activity
