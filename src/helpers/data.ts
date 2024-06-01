import {throttle} from 'lodash-es'
import {useCallback, useMemo, useRef, useState} from 'react'

export type ListQuery<T> = (pagination: {
  offset: number
  limit: number
}) => Promise<T[]>

export function useListData<T>(query: ListQuery<T>) {
  const limit = 18
  const offset = useRef(0)
  const [data, setData] = useState<T[]>([])
  const reloadList = useCallback(async () => {
    setData(await query({offset: 0, limit}))
    offset.current = limit
  }, [query])
  const fetchMore = useCallback(async () => {
    const data = await query({offset: offset.current, limit})
    setData((prev) => [...prev, ...data])
    offset.current += limit
  }, [query])
  const throttledReloadList = useMemo(
    () => throttle(reloadList, 1000),
    [reloadList]
  )
  const throttledFetchMore = useMemo(
    () => throttle(fetchMore, 1000),
    [fetchMore]
  )

  return {
    reloadList: throttledReloadList,
    fetchMore: throttledFetchMore,
    data,
  }
}
