import { getStorage, ref } from 'firebase/storage'
import { deleteObject } from 'firebase/storage'

import { StorageReference } from 'firebase/storage'

/**
 * Delete File from URL or Bath
 */
export function easyDelObject (path: string): Promise<'success'> {
  if (path.includes('https://')) {
    const urlArr = path.split('/')
    const getPath = urlArr[urlArr.length - 1].split('?')[0]
    path = decodeURIComponent(getPath)
  }

  const storage = getStorage()
  const desertRef: StorageReference = ref(storage, path)

  return new Promise((resolve, rejects) => {
    deleteObject(desertRef)
      .then(() => {
        resolve('success')
      })
      .catch(error => {
        rejects(error)
      })
  })
}
