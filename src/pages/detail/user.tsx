import {WithTitleBar} from '@/components'
import {useUserQuery} from '@/generated'
import {defaultUser} from '@/helpers'
import {ArrowBackRounded} from '@mui/icons-material'
import {Avatar, Divider, IconButton, Stack, Typography} from '@mui/material'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {FollowButton} from '../common/follow'
import {ScrollableArticleList} from '../search/article'

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
      <Stack height={250} p={3} spacing={1} alignItems="center">
        <Avatar
          sx={{width: 100, height: 100}}
          src={userData?.user?.avatar?.url ?? defaultUser}
          variant="rounded"
        />
        <Typography>{userData?.user?.name}</Typography>
        <Typography>{userData?.user?.signature}</Typography>
        <FollowButton id={params.get('id')!} />
      </Stack>
      <Divider />
      <Stack p={2} pb={0}>
        <ScrollableArticleList latest authors={[{id: params.get('id')!}]} />
      </Stack>
    </WithTitleBar>
  )
}
