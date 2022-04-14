import { test, expect } from 'vitest'
import { easyDelObject } from '../src'

test('ファイルの削除', async () => {
  const res = await easyDelObject(
    'https://firebasestorage.googleapis.com/v0/b/yapo-b3e1d.appspot.com/o/test%2Fcar.jpeg?alt=media&token=bcaf4519-50bf-4845-84e6-a4785a1a9a63'
  )
  console.log(res)
  expect(res).toBe('success')
})
