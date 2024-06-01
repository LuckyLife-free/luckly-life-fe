import cover from '@/assets/cover.jpg'
import {TitleBar, WithBottomBar} from '@/components'
import {useTagListQuery} from '@/generated'
import {Avatar, Grid, Stack, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {SearchInput} from './input'

export function SearchPage() {
  const {data: tagData} = useTagListQuery()
  const navigate = useNavigate()

  return (
    <WithBottomBar>
      <TitleBar barHidden>
        <Stack position="relative" onClick={() => navigate('/search/result')}>
          <SearchInput />
        </Stack>
      </TitleBar>
      <Grid container overflow="auto" padding={3} spacing={2}>
        {tagData?.tagList.map((d) => (
          <Grid item xs={6} key={d.id}>
            <Stack
              direction="row"
              position="relative"
              onClick={() => navigate(`/search/home?tagId=${d.id}`)}
            >
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
    </WithBottomBar>
  )
}
