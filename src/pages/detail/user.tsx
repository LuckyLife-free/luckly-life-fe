import {WithTitleBar} from '@/components'
import {useUserQuery} from '@/generated'
import {ArrowBackRounded} from '@mui/icons-material'
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {ArticleList} from '../list/article'

export function UserDetail() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const {data: userData} = useUserQuery({variables: {id: params.get('id')!}})

  return (
    <WithTitleBar
      title="用户详情"
      barLeft={
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackRounded />
        </IconButton>
      }
    >
      <Stack p={3} spacing={1} alignItems="center">
        <Avatar
          sx={{width: 100, height: 100}}
          src={userData?.user?.avatar?.url}
          variant="rounded"
        />
        <Typography>{userData?.user?.name}</Typography>
        <Typography>{userData?.user?.signature}</Typography>
        <Button size="small" variant="outlined" sx={{ml: 10, p: 0}}>
          关注
        </Button>
      </Stack>
      <Divider />
      <Stack p={2}>
        <ArticleList authors={[{id: params.get('id')!}]} />
      </Stack>
    </WithTitleBar>
  )
}
