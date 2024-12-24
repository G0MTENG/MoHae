import * as z from 'zod'
import { email, password, username } from './fields'

export const SignInSchema = z.object({
  email,
  password,
})

export const SignUpSchema = z
  .object({
    username,
    email,
    password,
    passwordConfirm: password,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })
