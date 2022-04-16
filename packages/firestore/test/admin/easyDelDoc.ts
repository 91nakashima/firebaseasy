import { test, expect } from 'vitest'
import { easyDelDoc } from '../../src/admin'

test('情報の取得', async () => {
  const res = await easyDelDoc('Test/bbb')
  console.log(res)
  expect(res).toBe('ok')
})
