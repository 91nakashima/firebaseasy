import { test, expect } from 'vitest'
import { easySetDoc } from '../../src/'

test('情報の取得', async () => {
  const res = await easySetDoc('Test', {
    id: 'aaa'
  })
  console.log(res)
  expect(res).toBeTypeOf('string')
})
