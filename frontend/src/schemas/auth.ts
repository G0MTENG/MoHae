import zod from 'zod'

export const SignInSchema = zod.object({
  email: zod.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: zod.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
})

export const SignUpSchema = zod.object({
  username: zod
    .string()
    .min(1, { message: '이름은 한 글자 이상 4글자 이하입니다.' })
    .max(4, { message: '이름은 한 글자 이상 4글자 이하입니다.' }),
  email: zod.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: zod.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
  passwordConfirm: zod.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
})
