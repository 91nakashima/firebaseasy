import { test, expect } from 'vitest'
import { easySetDoc } from '../src/index'

test('情報の取得', async () => {
  const res = await easySetDoc('D_ShowUser', {
    id: 'aaa'
  })
  console.log(res)
  expect(res).toBeTypeOf('string')
})
