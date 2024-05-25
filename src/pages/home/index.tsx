import cover from '@/assets/cover.jpg'
import {TitleBar, WithBottomBar, useTitleBar} from '@/components'
import {
  useActivityListQuery,
  useArticleListQuery,
  useTagQuery,
  useUserListQuery,
} from '@/generated'
import {ArrowBackRounded} from '@mui/icons-material'
import {Avatar, IconButton, Stack, Typography} from '@mui/material'
import {format} from 'date-fns'
import {useNavigate} from 'react-router-dom'
import {useSearchParam} from 'react-use'
import {HomePageCard} from './card'

export function HomePage() {
  const navigate = useNavigate()
  const tagId = useSearchParam('tagId')
  const {ref, barHidden} = useTitleBar()
  const {data: tagData} = useTagQuery({
    variables: {filter: {id: tagId!}},
    skip: !tagId,
  })
  const {data: articleData, loading: articleLoading} = useArticleListQuery({
    variables: {limit: 18, filter: {tags: tagId ? [{id: tagId}] : null}},
  })
  const {data: activityData, loading: activityLoading} = useActivityListQuery({
    variables: {limit: 6, filter: {tag: tagId ? {id: tagId} : null}},
  })
  const {data: latestData, loading: latestLoading} = useArticleListQuery({
    variables: {
      filter: {latest: true, tags: tagId ? [{id: tagId}] : null},
      limit: 18,
    },
  })
  const {data: userData, loading: userLoading} = useUserListQuery({
    variables: {limit: 9},
  })

  return (
    <WithBottomBar contentRef={ref}>
      {tagId ? (
        <TitleBar titleHidden>
          <Stack direction="row" alignItems="center" width="100vw">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackRounded />
            </IconButton>
            {tagData?.tag?.name}
          </Stack>
        </TitleBar>
      ) : (
        <TitleBar barHidden={barHidden}>首页</TitleBar>
      )}
      <HomePageCard
        title="为你推荐"
        data={articleData?.articleList ?? []}
        loading={articleLoading}
        column={2}
        row={3}
      >
        {(d) => (
          <Stack onClick={() => navigate(`/detail/article?id=${d.id}`)}>
            <Avatar
              variant="rounded"
              src={d.cover?.url || cover}
              sx={{width: '100%', height: 90}}
            >
              {d.cover?.name}
            </Avatar>
            <Typography noWrap variant="subtitle1" minHeight="1em">
              &nbsp;{d.title}
            </Typography>
            <Typography
              variant="caption"
              color={(t) => t.palette.text.secondary}
            >
              {format(d.createTime, 'yyyy/MM/dd')}
            </Typography>
          </Stack>
        )}
      </HomePageCard>
      <HomePageCard
        title="热门创作者"
        data={userData?.userList ?? []}
        loading={userLoading}
        column={3}
        row={1}
      >
        {(d) => (
          <Stack
            alignItems="center"
            onClick={() => navigate(`/detail/user?id=${d.id}`)}
          >
            <Avatar
              variant="rounded"
              src={d.avatar?.url || cover}
              sx={{width: '100%', height: '27vw'}}
            >
              {d.avatar?.name}
            </Avatar>
            <Typography noWrap maxWidth={90} variant="subtitle1">
              {d.name}
            </Typography>
            <Typography
              noWrap
              maxWidth={100}
              color={(t) => t.palette.text.secondary}
              variant="caption"
            >
              {d.signature}
            </Typography>
          </Stack>
        )}
      </HomePageCard>
      <HomePageCard
        title="最新发布"
        data={latestData?.articleList ?? []}
        loading={latestLoading}
        column={2}
        row={3}
      >
        {(d) => (
          <Stack onClick={() => navigate(`/detail/article?id=${d.id}`)}>
            <Avatar
              variant="rounded"
              src={d.cover?.url || cover}
              sx={{width: '100%', height: 90}}
            >
              {d.cover?.name}
            </Avatar>
            <Typography noWrap variant="subtitle1">
              &nbsp;{d.title}
            </Typography>
            <Typography
              variant="caption"
              color={(t) => t.palette.text.secondary}
            >
              {format(d.createTime, 'yyyy/MM/dd')}
            </Typography>
          </Stack>
        )}
      </HomePageCard>
      <HomePageCard
        title="征文活动"
        data={activityData?.activityList ?? []}
        loading={activityLoading}
        column={2}
        row={1}
      >
        {(d) => (
          <Stack>
            <Avatar
              variant="rounded"
              src={d.cover?.url || cover}
              sx={{width: '100%', height: 90}}
            >
              {d.cover?.name}
            </Avatar>
            <Typography noWrap variant="subtitle1">
              &nbsp;{d.title}
            </Typography>
            <Typography
              variant="caption"
              color={(t) => t.palette.text.secondary}
            >
              {`${format(d.startTime, 'MM/dd')}-${format(d.endTime, 'MM/dd')}`}
            </Typography>
          </Stack>
        )}
      </HomePageCard>
    </WithBottomBar>
  )
}
