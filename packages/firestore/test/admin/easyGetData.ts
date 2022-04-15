import { test, expect } from 'vitest'
import { easyGetData } from '../../src/admin'

test('情報の取得', async () => {
  const res = await easyGetData('Test')
  expect(res[0]).toBeTypeOf('object')
})
