import { test, expect } from 'vitest'
import { easyDelDoc } from '../../src'

test('情報の削除', async () => {
  const res = await easyDelDoc('Test/aaa')
  console.log(res)
  expect(res).toBe('ok')
})
