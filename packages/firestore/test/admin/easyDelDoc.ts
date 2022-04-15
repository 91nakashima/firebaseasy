import { test, expect } from 'vitest'
import { easyDelDoc } from '../../src/admin'

test('情報の取得', async () => {
  const res = await easyDelDoc('Test/aaa')
  console.log(res)
  expect(res).toBe('ok')
})
