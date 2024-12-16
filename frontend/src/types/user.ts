import * as z from 'zod'
import { EditUserInfoSchema } from '@/schemas'

export type EditUserInfoSchemaType = z.infer<typeof EditUserInfoSchema>

interface User {
  id: number
  username: string
  randomCode: string
  avatar?: string
}

export type FetchUserInfoResponse = User

export type EditUserProfileResponse = {
  message: string
}
