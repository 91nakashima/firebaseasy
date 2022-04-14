import { test, expect } from 'vitest'
import { easyGetData } from '../src/index'

test('情報の取得', async () => {
  const res = await easyGetData('D_ShowUser')
  expect(res[0]).toBeTypeOf('object')
})
