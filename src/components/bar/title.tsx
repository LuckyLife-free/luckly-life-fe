import {Box, Divider, Stack, Typography} from '@mui/material'
import {ReactElement, ReactNode, RefObject, useRef} from 'react'
import {useScroll} from 'react-use'

type TitleBarProps = {
  ref?: RefObject<HTMLElement>
  titleHidden?: boolean
  barHidden?: boolean
  children: ReactNode
}

export function useTitleBar() {
  const ref = useRef<HTMLElement>(null)
  const {y} = useScroll(ref)

  return {barHidden: y < 68, ref}
}

export function TitleBar(props: TitleBarProps) {
  const {ref, barHidden, titleHidden, children} = props

  return (
    <Stack ref={ref}>
      <Stack paddingX={3} pt={3}>
        <Typography
          display={titleHidden ? 'none' : 'block'}
          variant="h4"
          fontWeight="bold"
          lineHeight={2}
        >
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
          opacity: barHidden ? 0 : 1,
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

type WithTitleBarProps = {
  title?: string
  bgcolor?: string
  barLeft?: ReactElement
  barRight?: ReactElement
  children: ReactNode
}

export function WithTitleBar(props: WithTitleBarProps) {
  const {barLeft, barRight, title, bgcolor, children} = props

  return (
    <Stack height={window.innerHeight}>
      <Stack
        sx={(t) => ({
          top: 0,
          zIndex: 1,
          position: 'absolute',
          transition: 'all .5s',
          bgcolor: bgcolor ?? t.palette.grey[50],
          justifyItems: 'center',
          alignItems: 'center',
        })}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100vw"
        >
          {barLeft || <Box />}
          <Typography flex={1} variant="subtitle2" fontWeight="bold">
            {title}
          </Typography>
          {barRight || <Box />}
        </Stack>
        <Divider flexItem />
      </Stack>
      <Stack pt={5} flex={1} overflow="auto">
        {children}
      </Stack>
    </Stack>
  )
}
