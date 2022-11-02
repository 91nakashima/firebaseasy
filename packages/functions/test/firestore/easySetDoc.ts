import { test, expect } from 'vitest'
import { easySetDoc } from '../../lib/src'
import { firestore } from '../index'

test('情報の取得', async () => {
  const res = await easySetDoc(firestore, 'Test', {
    id: 'aaa'
  })
  console.log(res)
  expect(res).toBeTypeOf('string')
})
