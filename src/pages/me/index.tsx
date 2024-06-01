import {TitleBar, WithBottomBar, useTitleBar} from '@/components'
import {Stack} from '@mui/material'

export function MePage() {
  const {barHidden} = useTitleBar()

  return (
    <WithBottomBar>
      <TitleBar barHidden={barHidden}>个人中心</TitleBar>
      <Stack flex={1} />
    </WithBottomBar>
  )
}
