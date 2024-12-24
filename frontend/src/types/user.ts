import * as z from 'zod'
import { EditUserInfoSchema } from '@/schemas'

export type EditUserInfoSchemaType = z.infer<typeof EditUserInfoSchema> & {
  avatar?: File
}

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
