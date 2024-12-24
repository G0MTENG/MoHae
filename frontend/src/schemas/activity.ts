import * as z from 'zod'
import { description, emoji, images, title } from './fields'

export const ActivitySchema = z.object({
  title,
  description,
  emoji,
  images,
})
