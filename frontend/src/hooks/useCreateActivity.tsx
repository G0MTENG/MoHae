import { CreateActivitySchema } from '@/schemas/activity'
import type { CreateActivitySchemaType } from '@/types/activity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const useCreateActivity = () => {
  const formProps = useForm<CreateActivitySchemaType>({
    resolver: zodResolver(CreateActivitySchema),
    defaultValues: {
      emoji: '😀',
      photos: [],
    },
  })

  const onSubmit = (data: CreateActivitySchemaType) => {
    console.log(data)
  }

  return {
    onSubmit,
    ...formProps,
  }
}
