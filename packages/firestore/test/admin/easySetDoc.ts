import { test, expect } from 'vitest'
import { easySetDoc } from '../../src/admin/'

test('情報の追加(admin)', async () => {
  const res = await easySetDoc('Test/bbb', {
    text: 'テスト'
  })
  console.log(res)
  expect(res).toBeTypeOf('string')
})
