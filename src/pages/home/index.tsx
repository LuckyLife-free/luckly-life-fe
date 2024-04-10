import {TitleBar, WithBottomBar, useTitleBar} from '@/components'
import {useHomeArticleListQuery, useHomeUserListQuery} from '@/generated'
import {Avatar, Box, Grid, Stack, Typography} from '@mui/material'
import {format} from 'date-fns'

export function HomePage() {
  const {data: articleData} = useHomeArticleListQuery()
  const {data: userData} = useHomeUserListQuery()
  const {variant, onScroll} = useTitleBar()

  return (
    <WithBottomBar>
      <Stack flex={1} overflow="auto" onScroll={onScroll}>
        <TitleBar variant={variant}>首页</TitleBar>
        <Box padding={3}>
          <Typography variant="h6">为你推荐</Typography>
          <Grid
            container
            direction="column"
            maxHeight={300}
            overflow="auto"
            spacing={2}
          >
            {articleData?.homeArticleList.map((d) => (
              <Grid item xs={4} key={d.id}>
                <Stack direction="row">
                  <Avatar
                    variant="rounded"
                    src={d.cover?.url}
                    sx={{width: 160, height: 90}}
                  >
                    {d.cover?.name}
                  </Avatar>
                  <Stack p={1} justifyContent="space-between">
                    <Typography variant="subtitle1">{d.title}</Typography>
                    <Typography color={(t) => t.palette.text.secondary}>
                      {format(d.createTime, 'yyyy/MM/dd HH:mm')}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box padding={3}>
          <Typography variant="h6">热门创作者</Typography>
          <Grid
            container
            direction="column"
            maxHeight={200}
            overflow="auto"
            spacing={2}
          >
            {userData?.homeUserList.map((d) => (
              <Grid item xs={6} key={d.id}>
                <Avatar
                  variant="rounded"
                  src={d.avatar?.url}
                  sx={{width: 100, height: 100}}
                >
                  {d.avatar?.name}
                </Avatar>
                <Stack p={1} alignItems="center">
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
        </Box>
      </Stack>
    </WithBottomBar>
  )
}
