import {CircularProgress, Stack, Typography} from '@mui/material'
import {PropsWithChildren} from 'react'

type AsyncStatusProps = PropsWithChildren<{
  empty?: boolean
  hidden?: boolean
  loading?: boolean
}>

export function AsyncStatus(props: AsyncStatusProps) {
  const {empty, loading, hidden, children} = props

  return hidden ? null : empty ? (
    <Stack minHeight={64} justifyContent="center" alignItems="center">
      <Typography variant="caption" color="text.secondary">
        暂无内容
      </Typography>
    </Stack>
  ) : loading ? (
    <Stack minHeight={64} justifyContent="center" alignItems="center">
      <CircularProgress size={30} thickness={6} />
    </Stack>
  ) : (
    <>{children}</>
  )
}
