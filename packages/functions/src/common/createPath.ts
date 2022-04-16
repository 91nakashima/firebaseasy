/**
 * pathを作成
 */
export const createPath = (path: string, id: string) => {
  if (path.slice(-1) === '/') {
    path = `${path}${id}`
  } else {
    path = `${path}/${id}`
  }
  return path
}
