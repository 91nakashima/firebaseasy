import { test, expect } from 'vitest'
import { createShowPath } from '../src/easySetDoc'

test('テスト', () => {
  expect(createShowPath('a/b/', 'b')).toBe('a/b')
})
