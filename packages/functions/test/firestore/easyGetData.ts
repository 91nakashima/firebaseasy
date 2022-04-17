import { test, expect } from 'vitest'
import { easyGetData } from '../../src'

test('情報の取得(collection)', async () => {
  const res = await easyGetData('Test')
  console.log(res)
  expect(res[0]).toBeTypeOf('object')
})

test('情報の取得(document)', async () => {
  const res = await easyGetData('Test/aaa')
  console.log(res)
  expect(res).toBeTypeOf('object')
})
