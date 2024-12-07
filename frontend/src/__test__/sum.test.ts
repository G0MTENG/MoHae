import { sum } from './sum'
import { expect, test } from 'vitest'

test('1 + 2 = 3', () => {
  expect(sum(1, 2)).toBe(3)
})
