import {useState} from 'react'
import {useLocalStorage} from 'react-use'
import {createSharedData} from './common'

export const useToken = createSharedData(function () {
  return useLocalStorage<Maybe<string>>('AUTH_TOKEN')
})

export const useBottomTab = createSharedData<'home' | 'publish' | 'search'>(
  function (initialValue) {
    return useState(initialValue ?? 'home')
  }
)
