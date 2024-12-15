import * as z from 'zod'

export const FriendAddSchema = z.object({
  friendCode: z.string({ message: '친구 코드를 입력해주세요.' }).length(6, {
    message: '친구 코드는 6자리입니다.',
  }),
})
