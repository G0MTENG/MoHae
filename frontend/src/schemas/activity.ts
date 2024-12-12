import * as z from 'zod'

export const CreateActivitySchema = z.object({
  activity: z
    .string({ message: '활동 이름을 입력해주세요.' })
    .min(1, { message: '활동 이름은 한 글자 이상 20글자 이하입니다.' })
    .max(20, { message: '활동 이름은 한 글자 이상 20글자 이하입니다.' }),
  content: z.string().max(100, { message: '내용은 100자 이하입니다.' }).optional(),
  emoji: z.string().min(1, { message: '이모지를 선택해주세요.' }),
  photos: z.array(z.instanceof(File)).max(3, { message: '사진은 3장 이하입니다.' }),
})
