import { test, expect } from 'vitest'
import { easyGetData } from '../../src'
import { firestore } from '../index'

type aaaa = {
  id: 'a'
}

test('情報の取得(collection)', async () => {
  const res = await easyGetData<aaaa[]>(firestore, 'Test')
  console.log(res)
  expect(res[0]).toBeTypeOf('object')
})

test('情報の取得(document)', async () => {
  const res = await easyGetData<aaaa>(firestore, 'Test/aaaa')
  console.log(res)
  expect(res).toBeTypeOf('object')
})
