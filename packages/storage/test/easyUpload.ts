import { test, expect } from 'vitest'
import * as fs from 'fs'
import { easyUpload } from '../src'

test('Fileデータの登録', async () => {
  const buffer = fs.readFileSync('./test/car.jpeg')
  const metadata = {
    contentType: 'image/jpeg'
  }
  const res = await easyUpload('test/car.jpeg', [buffer, metadata])
  console.log(res)
  expect(res).toBeTypeOf('string')
})
