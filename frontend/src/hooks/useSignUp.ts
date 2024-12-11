import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SignUpSchema } from '@/schemas'
import * as z from 'zod'

type SignUpSchema = z.infer<typeof SignUpSchema>

export const useSignUp = () => {
  const formProps = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  })

  const onSubmit = (data: SignUpSchema) => {
    console.log(data)
  }

  return {
    ...formProps,
    onSubmit,
  }
}
