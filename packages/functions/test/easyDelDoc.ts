import { test, expect } from 'vitest'
import { easyDelDoc } from '../src/index'

test('情報の取得', async () => {
  const res = await easyDelDoc('D_ShowUser/aaa')
  console.log(res)
  expect(res).toBe('ok')
})
