import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema } from '@/schemas'

type SignInSchema = z.infer<typeof SignInSchema>

export const useSignIn = () => {
  const formProps = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit = (data: SignInSchema) => {
    console.log(data)
  }

  return {
    onSubmit,
    ...formProps,
  }
}
