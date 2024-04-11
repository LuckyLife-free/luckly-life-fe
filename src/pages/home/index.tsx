import cover from '@/assets/cover.jpg'
import {TitleBar, WithBottomBar, useTitleBar} from '@/components'
import {useHomeArticleListQuery, useHomeUserListQuery} from '@/generated'
import {Avatar, Box, Grid, Stack, Typography} from '@mui/material'
import {format} from 'date-fns'

export function HomePage() {
  const {data: articleData} = useHomeArticleListQuery({
    variables: {limit: 18},
  })
  const {data: userData} = useHomeUserListQuery({
    variables: {limit: 9},
  })
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
            maxHeight={600}
            overflow="auto"
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
        </Box>
      </Stack>
    </WithBottomBar>
  )
}
