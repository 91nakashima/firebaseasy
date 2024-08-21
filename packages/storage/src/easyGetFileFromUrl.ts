import { randomName } from './index'
import { ref, getMetadata } from 'firebase/storage'
import type { FirebaseStorage } from 'firebase/storage'

const getPathFromUrl = (url: string) => {
  if (url.includes('https://')) {
    const urlArr = url.split('/')
    const getPath = urlArr[urlArr.length - 1].split('?')[0]
    url = decodeURIComponent(getPath)
    return url
  }

  return url
}

/**
 * Download from URL or Path
 */
export function easyGetFileFromUrl(
  url: string,
  storage?: FirebaseStorage,
  fun?: (rogress: number) => void
): Promise<File> {
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

    xhr.onload = async () => {
      const blob = xhr.response

      if (!storage) {
        resolve(new File([blob], randomName(10)))
        return
      }
      const path = getPathFromUrl(url)

      const storageRef = ref(storage, path)
      try {
        const metadata = await getMetadata(storageRef)
        resolve(new File([blob], metadata.name, { type: metadata.contentType }))
      } catch (error) {
        reject(error)
      }
    }

    xhr.send()
  })
}
