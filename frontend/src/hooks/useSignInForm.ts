import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema } from '@/schemas'
import { useSignIn } from './queries/useAuth'

type SignInSchema = z.infer<typeof SignInSchema>

export const useSignInForm = () => {
  const { mutate } = useSignIn()
  const formProps = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit = (data: SignInSchema) => {
    mutate(data)
  }

  return {
    onSubmit: formProps.handleSubmit(onSubmit),
    ...formProps,
  }
}
