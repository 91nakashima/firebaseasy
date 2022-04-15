import { getStorage, ref } from 'firebase/storage'
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { TaskState } from 'firebase/storage'

/**
 * create random name
 */
export function randomName (len = 20, file?: File) {
  let pass = ''
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const string = letters + letters.toUpperCase() + numbers
  for (var i = 0; i < len; i++) {
    pass += string.charAt(Math.floor(Math.random() * string.length))
  }

  if (file) {
    const getExtension = file.name
    const extensionArr = getExtension.split('.')
    const extension = extensionArr[extensionArr.length - 1]
    pass = `${pass}.${extension}`
  }

  return pass
}

/**
 * upload file
 */
export async function easyUpload (
  path: string,
  data:
    | File
    | Blob
    | Uint8Array
    | [Uint8Array | Blob | File, { contentType: string }],
  fun?: (progress: number, status: TaskState) => string
): Promise<string> {
  const storage = getStorage()
  const storageRef = ref(storage, path)

  const uploadTask = Array.isArray(data)
    ? uploadBytesResumable(storageRef, data[0], data[1])
    : uploadBytesResumable(storageRef, data)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress: number =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        if (fun) {
          fun(progress, snapshot.state)
        }
      },
      error => {
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          resolve(downloadURL)
        })
      }
    )
  })
}
