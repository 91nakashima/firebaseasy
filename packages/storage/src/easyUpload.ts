import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { uploadString } from 'firebase/storage'

import { UploadMetadata } from 'firebase/storage'

type Data = File | Blob | Uint8Array | string

export async function easyUpload (
  path: string,
  data: Data,
  netaData?: UploadMetadata
) {
  const storage = getStorage()

  const storageRef = ref(storage, path)
}
