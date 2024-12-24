import * as z from 'zod'
import { friendCode } from './fields'

export const FriendAddSchema = z.object({
  friendCode,
})
