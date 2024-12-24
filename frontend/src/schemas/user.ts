import * as z from 'zod'
import { username } from './fields'

export const EditUserInfoSchema = z.object({
  username,
})
