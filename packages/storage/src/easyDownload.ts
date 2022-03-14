import { randomName } from './index'

/**
 *
 */
export function easyDownload (
  url: string,
  name?: string | undefined,
  fun?: (rogress: number) => void
): Promise<string> {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url, true)

  // プログレス
  xhr.onprogress = (evt: ProgressEvent) => {
    const load = (100 * evt.loaded) / evt.total || 0

    if (fun) {
      fun(load)
    }
  }

  xhr.responseType = 'blob' // Blobオブジェクトとしてダウンロードする

  // ダウンロード完了
  return new Promise((resolve, reject) => {
    xhr.addEventListener('error', () => {
      reject('Cannot download from this URL')
    })

    xhr.onload = (oEvent: ProgressEvent) => {
      const blob = xhr.response
      const objectURL = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      document.body.appendChild(link)
      link.href = objectURL

      if (name) {
        link.setAttribute('download', name)
      } else {
        link.setAttribute('download', randomName(10))
      }

      link.click()
      link.remove()

      resolve('success')
    }

    xhr.send()
  })
}
