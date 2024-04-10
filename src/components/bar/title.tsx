import {Divider, Stack, Typography} from '@mui/material'
import {ReactNode, UIEvent, useCallback, useState} from 'react'

type TitleBarProps = {
  variant: 'bar' | 'title'
  children: ReactNode
}

export function useTitleBar() {
  const [variant, setVariant] = useState<TitleBarProps['variant']>('title')
  const onScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setVariant(target.scrollTop > 68 ? 'bar' : 'title')
  }, [])

  return {variant, onScroll}
}

export function TitleBar({variant, children}: TitleBarProps) {
  return (
    <Stack>
      <Stack paddingX={3} pt={3}>
        <Typography variant="h4" fontWeight="bold" lineHeight={2}>
          {children}
        </Typography>
      </Stack>
      <Stack
        sx={(t) => ({
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transition: 'all .5s',
          bgcolor: t.palette.grey[50],
          opacity: variant === 'title' ? 0 : 1,
          justifyItems: 'center',
          alignItems: 'center',
          width: '100%',
        })}
      >
        <Typography variant="subtitle2" fontWeight="bold" lineHeight={3}>
          {children}
        </Typography>
        <Divider flexItem />
      </Stack>
    </Stack>
  )
}
