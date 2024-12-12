import { CreateActivitySchema } from '@/schemas/activity'
import * as z from 'zod'

export type CreateActivitySchemaType = z.infer<typeof CreateActivitySchema>
