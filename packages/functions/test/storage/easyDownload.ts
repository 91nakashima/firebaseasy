import { test, expect } from 'vitest'
import { easyDownload } from '../../src'

test('ストレージの削除', async () => {
  const res = await easyDownload(
    'https://www.google.co.jp/images/nav_logo195.png'
  )
  console.log(res)
  expect(res).toBeTypeOf('string')
})
