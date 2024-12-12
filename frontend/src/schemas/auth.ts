import * as z from 'zod'

export const SignInSchema = z.object({
  email: z
    .string({ message: '이메일을 입력해주세요.' })
    .email({ message: '이메일 형식이 아닙니다.' }),
  password: z
    .string({ message: '비밀번호를 입력해주세요.' })
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
})

export const SignUpSchema = z
  .object({
    username: z
      .string({ message: '이름을 입력해주세요.' })
      .min(1, { message: '이름은 한 글자 이상 4글자 이하입니다.' })
      .max(4, { message: '이름은 한 글자 이상 4글자 이하입니다.' }),
    email: z
      .string({ message: '이메일을 입력해주세요.' })
      .email({ message: '이메일 형식이 아닙니다.' }),
    password: z
      .string({ message: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
    passwordConfirm: z
      .string({ message: '비밀번호를 입력해주세요.' })
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  })
