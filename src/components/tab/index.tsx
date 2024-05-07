import {Stack, Typography, useTheme} from '@mui/material'
import {isFunction} from 'lodash-es'
import {ReactNode, useState} from 'react'

type TabsProps<T extends string> = {
  tabs: {key: T; label: string}[]
  children: Computable<ReactNode, {tab: T}>
}

export function MyTabs<T extends string>(props: TabsProps<T>) {
  const {tabs, children} = props
  const [tab, setTab] = useState<T>(tabs[0].key)
  const {palette} = useTheme()

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        {tabs.map(({key, label}) => (
          <Stack
            key={key}
            onClick={() => setTab(key)}
            bgcolor={tab === key ? palette.primary.main : 'transparent'}
            color={tab === key ? 'white' : 'black'}
            borderRadius={2}
            py={0.5}
            px={1.5}
          >
            <Typography variant="body2">{label}</Typography>
          </Stack>
        ))}
      </Stack>
      {isFunction(children) ? children({tab}) : children}
    </Stack>
  )
}
