import * as z from 'zod'

export const EditUserInfoSchema = z.object({
  avatar: z
    .custom<File | null | undefined>(
      (value) => {
        return value instanceof File || value === null || value === undefined
      },
      { message: '올바른 파일을 선택해주세요.' },
    )
    .optional(),
  username: z
    .string()
    .min(1, { message: '이름은 한 글자 이상이어야 합니다.' })
    .max(20, { message: '이름은 최대 20자 이하입니다.' }),
})
