import fetch from 'node-fetch'
// import request from 'request'

// import fs from 'fs'

export const easyDownload = async (path: string) => {
  const res = await fetch(path)

  const blob = await res.blob()

  console.log(blob)

  const file = new File([blob], 'bjsbdv', {
    type: `image/${path.split('.').pop()}`
  })

  console.log(file)
}
