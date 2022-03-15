import { getStorage, ref } from 'firebase/storage'
import { deleteObject } from 'firebase/storage'

/**
 * Delete File from URL or Bath
 */
export function easyDelObject (path: string) {
  if (path.includes('https://')) {
    const urlArr = path.split('/')
    const getPath = urlArr[urlArr.length - 1].split('?')[0]
    path = decodeURIComponent(getPath)
  }

  const storage = getStorage()
  const desertRef = ref(storage, path)

  new Promise((resolve, rejects) => {
    deleteObject(desertRef)
      .then(() => {
        resolve('success')
      })
      .catch(error => {
        rejects(error)
      })
  })
}
