import { Storage } from 'firebase-admin/storage'

/**
 * Delete File from URL or Bath
 * @returns Promise<'success'>
 */
export const easyDelObject = async (
  storage: Storage,
  path: string
): Promise<'success'> => {
  /** urlの場合にbucketを取得 */
  let buketURL = ''

  if (path.includes('https://')) {
    const urlArr = path.split('/')
    const getPath = urlArr[urlArr.length - 1].split('?')[0]
    path = decodeURIComponent(getPath)
    buketURL = urlArr.find(u => u.includes('appspot.com')) ?? ''
  }

  const bucket = storage.bucket(buketURL)

  const resExists = await bucket.file(path).exists()
  const isExist = resExists && resExists[0]

  if (!isExist) return 'success'

  return new Promise((resolve, rejects) => {
    bucket
      .file(path)
      .delete()
      .then(() => {
        resolve('success')
      })
      .catch(error => {
        rejects(error)
      })
  })
}
