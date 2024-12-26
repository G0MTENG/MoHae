import { OBJECT } from './object'
import { ACTIVITY } from './activity'
import { ANIMAL } from './animal'
import { FOOD } from './food'
import { PEOPLE } from './people'
import { TRAVEL } from './travel'
import { SIGN } from './sign'
import { FLAG } from './flag'

export const EMOJI: readonly {
  readonly title: string
  readonly emojis: string[]
}[] = Object.freeze([
  {
    title: '얼굴과 사람',
    emojis: PEOPLE,
  },
  {
    title: '동물과 자연',
    emojis: ANIMAL,
  },
  {
    title: '음식',
    emojis: FOOD,
  },
  {
    title: '활동',
    emojis: ACTIVITY,
  },
  {
    title: '여행',
    emojis: TRAVEL,
  },
  {
    title: '물건',
    emojis: OBJECT,
  },
  {
    title: '기호',
    emojis: SIGN,
  },
  {
    title: '깃발',
    emojis: FLAG,
  },
])
