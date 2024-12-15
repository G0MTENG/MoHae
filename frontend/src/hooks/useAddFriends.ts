import { FriendAddSchema } from '@/schemas'
import { FriendAddSchemaType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCreateFriend } from './queries/useFriend'

export const useAddFriends = () => {
  const { mutate } = useCreateFriend()
  const formProps = useForm<FriendAddSchemaType>({
    resolver: zodResolver(FriendAddSchema),
  })

  const onSubmit = (data: FriendAddSchemaType) => {
    mutate(data)
  }

  return {
    onSubmit,
    ...formProps,
  }
}
