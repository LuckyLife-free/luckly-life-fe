import {createGlobalState, useLocalStorage} from 'react-use'

export const useToken = function () {
  return useLocalStorage<Maybe<string>>('AUTH_TOKEN')
}

export const useRecentSearch = function () {
  return useLocalStorage<Maybe<string[]>>('RECENT_SEARCH', [])
}

export const useBottomTab = createGlobalState<'home' | 'publish' | 'search'>(
  'home'
)

export const useSearch = createGlobalState<string>('')
