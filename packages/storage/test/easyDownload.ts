import { test, expect } from 'vitest'
import { easyDownload, randomName } from '../src'

test('ダウンロードのテスト', async () => {
  const res = await easyDownload(
    'https://cdn.quasar.dev/img/parallax2.jpg',
    randomName(),
    progres => {
      console.log(progres)
    }
  )
  console.log(res)
})
