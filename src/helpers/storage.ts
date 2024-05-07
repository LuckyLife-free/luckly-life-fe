import {useCallback} from 'react'
import {createGlobalState, useLocalStorage} from 'react-use'

export const useToken = function () {
  return useLocalStorage<Maybe<string>>('AUTH_TOKEN')
}

export const useRecentSearch = function () {
  const [searches, setValue] = useLocalStorage<string[]>('RECENT_SEARCH', [])
  const addSearch = useCallback(
    (search: string) => {
      if (!searches?.includes(search)) {
        setValue([search, ...(searches ?? [])])
      }
    },
    [setValue, searches]
  )
  return [searches, addSearch] as const
}

export const useBottomTab = createGlobalState<'home' | 'publish' | 'search'>(
  'home'
)

export const useSearch = createGlobalState<string>('')
