import { test, expect } from 'vitest'
import { easyDelObject } from '../../src'

test('ストレージの削除', async () => {
  const res = await easyDelObject(
    'https://firebasestorage.googleapis.com/v0/b/yapo-b3e1d.appspot.com/o/test%2F23efb70a0f67deea136ae91f8603003adc916199_xlarge.jpeg?alt=media&token=f5a13fd8-962e-4821-b3be-44fe095cfb1e'
  )
  console.log(res)
  expect(res).toBe('success')
})
