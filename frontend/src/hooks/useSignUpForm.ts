import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SignUpSchema } from '@/schemas'
import * as z from 'zod'
import { useSignUp } from './queries/useAuth'

type SignUpSchema = z.infer<typeof SignUpSchema>

export const useSignUpForm = () => {
  const { mutate } = useSignUp()
  const formProps = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit = (data: SignUpSchema) => {
    const { username, email, password } = data

    mutate({
      username,
      email,
      password,
    })
  }

  return {
    ...formProps,
    onSubmit,
  }
}
