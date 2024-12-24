import * as z from 'zod'

export const email = z
  .string({ message: '이메일을 입력해주세요.' })
  .email({ message: '이메일 형식이 아닙니다.' })

export const password = z
  .string({ message: '비밀번호를 입력해주세요.' })
  .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })

export const username = z
  .string({ message: '이름을 입력해주세요.' })
  .min(1, { message: '이름은 한 글자 이상 4글자 이하입니다.' })
  .max(4, { message: '이름은 한 글자 이상 4글자 이하입니다.' })

export const title = z
  .string({ message: '활동 이름을 입력해주세요.' })
  .min(1, { message: '활동 이름은 한 글자 이상 20글자 이하입니다.' })
  .max(20, { message: '활동 이름은 한 글자 이상 20글자 이하입니다.' })

export const description = z.string().max(100, { message: '내용은 100자 이하입니다.' }).optional()

export const emoji = z.string().min(1, { message: '이모지를 선택해주세요.' })

export const images = z
  .array(z.union([z.instanceof(File), z.string()]))
  .max(3, { message: '사진은 3장 이하입니다.' })

export const friendCode = z
  .string({ message: '친구 코드를 입력해주세요.' })
  .length(6, { message: '친구 코드는 6자리입니다.' })
