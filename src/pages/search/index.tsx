import cover from '@/assets/cover.jpg'
import {TitleBar, WithBottomBar, useTitleBar} from '@/components'
import {useTagListQuery} from '@/generated'
import {Avatar, Box, Grid, Stack, Typography} from '@mui/material'

export function SearchPage() {
  const {data: tagData} = useTagListQuery()
  const {variant, onScroll} = useTitleBar()

  return (
    <WithBottomBar>
      <Stack flex={1} overflow="auto" onScroll={onScroll}>
        <TitleBar variant={variant}>搜索</TitleBar>
        <Box padding={3}>
          <Grid container overflow="auto" spacing={2}>
            {tagData?.tagList.map((d) => (
              <Grid item xs={6} key={d.id}>
                <Stack direction="row" position="relative">
                  <Avatar
                    variant="rounded"
                    src={cover}
                    sx={{width: '100%', height: '100%'}}
                  >
                    {d.name}
                  </Avatar>
                  <Stack
                    bgcolor="#0000004f"
                    position="absolute"
                    width="100%"
                    height="100%"
                  >
                    <Typography
                      variant="body1"
                      color="white"
                      fontWeight="bold"
                      sx={{position: 'absolute', left: 16, bottom: 16}}
                    >
                      {d.name}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </WithBottomBar>
  )
}
