import { useForm } from 'react-hook-form'
import { useEditUserProfile, useFetchUserInfo } from './queries/useUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserInfoSchema } from '@/schemas'
import type { EditUserInfoSchemaType } from '@/types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useEditProfile = () => {
  const { data: userInfo } = useFetchUserInfo()
  const navigator = useNavigate()
  const { mutate: editProfile } = useEditUserProfile({
    onSuccess: () => {
      navigator(-1)
    },
  })
  const formProps = useForm<EditUserInfoSchemaType>({
    resolver: zodResolver(EditUserInfoSchema),
    defaultValues: {
      username: userInfo?.username,
    },
  })
  const { reset } = formProps

  useEffect(() => {
    reset({
      username: userInfo?.username,
    })
  }, [reset, userInfo])

  const onSubmit = (data: EditUserInfoSchemaType) => {
    const formData = new FormData()
    formData.append('username', data.username)

    if (data.avatar) {
      formData.append('avatar', data.avatar)
    }

    editProfile(formData)
  }

  return {
    onSubmit,
    user: userInfo,
    ...formProps,
  }
}
