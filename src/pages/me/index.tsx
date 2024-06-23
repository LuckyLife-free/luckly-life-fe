import {WithBottomBar} from '@/components'
import {useMeQuery} from '@/generated'
import {defaultUser} from '@/helpers'
import {ChevronRightRounded} from '@mui/icons-material'
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  Stack,
  Typography,
} from '@mui/material'
import {useRef} from 'react'
import {useNavigate} from 'react-router-dom'

export function MePage() {
  const {data} = useMeQuery()
  const navigate = useNavigate()
  const menu = useRef([
    {name: '我的作品', onClick: () => navigate('/me/article')},
    {name: '我的关注', onClick: () => navigate('/me/follow')},
    {name: '我的收藏', onClick: () => navigate('/me/star')},
  ])

  return (
    <WithBottomBar>
      <Stack alignItems="center" spacing={2} mt={5}>
        <Avatar
          variant="rounded"
          src={data?.me?.avatar?.url ?? defaultUser}
          sx={{width: 80, height: 80}}
        />
        <Stack alignItems="center" spacing={1}>
          <Typography variant="h6">{data?.me?.name}</Typography>
          <Typography color="text.secondary" variant="caption">
            {data?.me?.signature}
          </Typography>
        </Stack>
      </Stack>
      <Stack flex={1}>
        {menu.current.map(({name, onClick}, i) => (
          <ListItem key={i} onClick={onClick} sx={{pr: 0}}>
            <ListItemButton>
              {name}
              <ListItemSecondaryAction>
                <IconButton>
                  <ChevronRightRounded />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </Stack>
    </WithBottomBar>
  )
}
