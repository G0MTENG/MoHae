import * as z from 'zod'

export const EditUserInfoSchema = z.object({
  username: z
    .string({ message: '이름을 입력해주세요.' })
    .min(1, { message: '이름은 한 글자 이상 4글자 이하입니다.' })
    .max(4, { message: '이름은 한 글자 이상 4글자 이하입니다.' }),
})
