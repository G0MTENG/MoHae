import { ActivitySchema } from '@/schemas'
import type { ActivitySchemaType } from '@/types/activity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCreateActivity, useFetchDetailActivity, useUpdateActivity } from './queries/useActivity'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export const useActivityForm = (type: 'create' | 'update', detailId?: number) => {
  const { data: detailData } = useFetchDetailActivity(detailId)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const onSuccess = () => {
    alert('정상적으로 활동이 등록되었습니다.')
    queryClient.invalidateQueries({
      queryKey: ['activity', 'detail'],
    })
    navigate(-1)
  }

  const { mutate: createMutate } = useCreateActivity({ onSuccess })
  const { mutate: updateMutate } = useUpdateActivity({ onSuccess })
  const formProps = useForm<ActivitySchemaType>({
    resolver: zodResolver(ActivitySchema),
    defaultValues: {
      emoji: '😀',
      images: [],
    },
  })
  const { reset } = formProps

  useEffect(() => {
    if (type === 'update' && detailData) {
      reset({
        title: detailData.activity.title,
        description: detailData.activity.description,
        emoji: detailData.activity.emoji,
        images: detailData.activity.images.map((image) => image.imageUrl),
      })
    }
  }, [reset, detailData, type])

  const { handleSubmit } = formProps

  const onSubmit = (data: ActivitySchemaType) => {
    const formData = new FormData()

    formData.append('title', data.title)
    if (data?.description) {
      formData.append('description', data.description)
    }
    formData.append('emoji', data.emoji)

    const urls: string[] = []
    data.images.forEach((image) => {
      if (typeof image === 'string') {
        urls.push(image)
      } else {
        formData.append('images', image)
      }
    })
    formData.append('images', JSON.stringify(urls))

    if (type === 'create') {
      createMutate(formData)
    } else if (type === 'update' && detailId) {
      updateMutate({ id: detailId, data: formData })
    }
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    ...formProps,
  }
}
