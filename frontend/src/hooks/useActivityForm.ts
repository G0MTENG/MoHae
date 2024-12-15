import { CreateActivitySchema } from '@/schemas'
import type { CreateActivitySchemaType } from '@/types/activity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCreateActivity } from './queries/useActivity'

export const useActivityForm = () => {
  const { mutate } = useCreateActivity()
  const formProps = useForm<CreateActivitySchemaType>({
    resolver: zodResolver(CreateActivitySchema),
    defaultValues: {
      emoji: '😀',
      images: [],
    },
  })

  const onSubmit = (data: CreateActivitySchemaType) => {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('description', data.description ?? '')
    formData.append('emoji', data.emoji)

    data.images.forEach((image) => {
      formData.append('images', image)
    })

    mutate(formData)
  }

  return {
    onSubmit,
    ...formProps,
  }
}
