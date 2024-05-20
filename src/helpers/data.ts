import {useCallback, useState} from 'react'

export type ListQuery<T> = (pagination: {
  offset: number
  limit: number
}) => Promise<T[]>

export function useListData<T>(query: ListQuery<T>) {
  const limit = 18
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState<T[]>([])
  const reloadList = useCallback(async () => {
    setData(await query({offset: 0, limit}))
    setOffset(limit)
  }, [query])
  const fetchMore = useCallback(async () => {
    const data = await query({offset, limit})
    setData((prev) => [...prev, ...data])
    setOffset((prev) => prev + limit)
  }, [offset, query])

  return {data, reloadList, fetchMore}
}