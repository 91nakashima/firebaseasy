import { test, expect } from 'vitest'
import { easyDelDoc } from '../../src'
import { firestore } from '../index'

test('情報の削除', async () => {
  const res = await easyDelDoc(firestore, 'Test/aaa')
  console.log(res)
  expect(res).toBe('ok')
})
