import { test, expect } from 'vitest'
import { easySetDoc } from '../../src/client'

test('情報の追加(admin)', async () => {
  const res = await easySetDoc('Test/aaa', {
    id: 'aaa'
  })
  console.log(res)
  expect(res).toBeTypeOf('string')
})
