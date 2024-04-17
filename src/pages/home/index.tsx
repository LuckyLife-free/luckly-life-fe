import cover from '@/assets/cover.jpg'
import {TitleBar, WithBottomBar, useTitleBar} from '@/components'
import {SlidingContainer} from '@/components/scroll/sliding'
import {
  useHomeArticleListQuery,
  useHomeUserListQuery,
  useTagQuery,
} from '@/generated'
import {ArrowBack} from '@mui/icons-material'
import {Avatar, Box, Grid, IconButton, Stack, Typography} from '@mui/material'
import {format} from 'date-fns'
import {useNavigate} from 'react-router-dom'
import {useSearchParam} from 'react-use'

export function HomePage() {
  const navigate = useNavigate()
  const tagId = useSearchParam('tagId')
  const {data: articleData} = useHomeArticleListQuery({
    variables: {limit: 18},
  })
  const {data: userData} = useHomeUserListQuery({
    variables: {limit: 9},
  })
  const {ref, barHidden} = useTitleBar()
  const {data: tagData} = useTagQuery({
    variables: {filter: {id: tagId!}},
    skip: !tagId,
  })

  return (
    <WithBottomBar contentRef={ref}>
      {tagId ? (
        <TitleBar titleHidden>
          <Stack direction="row" alignItems="center" width="100vw">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            {tagData?.tag?.name}
          </Stack>
        </TitleBar>
      ) : (
        <TitleBar barHidden={barHidden}>首页</TitleBar>
      )}
      <Box padding={3}>
        <Typography variant="h6">为你推荐</Typography>
        <SlidingContainer
          distancePerScratch={window.innerWidth - 32}
          offsetDomain={[-2, 0]}
        >
          {(ref) => (
            <Grid
              ref={ref}
              container
              direction="column"
              maxHeight={600}
              spacing={2}
            >
              {articleData?.homeArticleList.map((d) => (
                <Grid item key={d.id} width="calc(50vw - 16px)">
                  <Avatar
                    variant="rounded"
                    src={d.cover?.url || cover}
                    sx={{width: '100%', height: 90}}
                  >
                    {d.cover?.name}
                  </Avatar>
                  <Typography noWrap variant="subtitle1">
                    {d.title}
                  </Typography>
                  <Typography color={(t) => t.palette.text.secondary}>
                    {format(d.createTime, 'yyyy/MM/dd')}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </SlidingContainer>
      </Box>
      <Box padding={3}>
        <Typography variant="h6">热门创作者</Typography>
        <SlidingContainer
          distancePerScratch={window.innerWidth - 32}
          offsetDomain={[-2, 0]}
        >
          {(ref) => (
            <Grid
              ref={ref}
              container
              direction="column"
              maxHeight={200}
              spacing={2}
            >
              {userData?.homeUserList.map((d) => (
                <Grid
                  item
                  key={d.id}
                  width="calc(33vw - 8px)"
                  alignItems="center"
                >
                  <Stack alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={d.avatar?.url || cover}
                      sx={{width: 100, height: 100}}
                    >
                      {d.avatar?.name}
                    </Avatar>
                    <Typography variant="subtitle1">{d.name}</Typography>
                    <Typography
                      noWrap
                      maxWidth={100}
                      color={(t) => t.palette.text.secondary}
                    >
                      {d.signature}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          )}
        </SlidingContainer>
      </Box>
    </WithBottomBar>
  )
}
