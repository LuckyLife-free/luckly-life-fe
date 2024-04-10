import {useCallback, useMemo} from 'react'
import {useToken} from './storage'

export function useUploadFiles() {
  const url = 'http://localhost/upload'
  const [token] = useToken()
  const headers = useMemo(
    () => new Headers({Authorization: `Bearer ${token}`}),
    [token]
  )

  return useCallback(
    async (fileList: FileList | File[]) => {
      const formData = new FormData()

      Array.from(fileList).forEach((file) => {
        formData.append('files', file, file.name)
      })

      const response = await fetch(url, {
        method: 'PUT',
        body: formData,
        headers,
      })
      const data = (await response.json()) as string[]

      return data.map((id) => ({id}))
    },
    [headers]
  )
}
