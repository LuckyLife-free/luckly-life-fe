import cover from '@/assets/cover.jpg'
import {TitleBar, useTitleBar} from '@/components'
import {useTagListQuery} from '@/generated'
import {useRecentSearch} from '@/helpers'
import {Avatar, Box, Grid, Stack, Typography} from '@mui/material'
import {useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {SearchInput} from './input'

export function SearchPage() {
  const {data: tagData} = useTagListQuery()
  const {ref: contentRef, barHidden} = useTitleBar()
  const titleRef = useRef<HTMLElement>(null)
  const [focused, setFocused] = useState(false)
  const [searches] = useRecentSearch()
  const navigate = useNavigate()

  return (
    <Stack ref={contentRef}>
      <TitleBar barHidden={barHidden}>
        <Stack position="relative">
          <SearchInput onFocusedChange={setFocused}></SearchInput>
          {focused && (
            <Stack
              sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                position: 'absolute',
                borderRadius: 1,
                zIndex: 1,
                top: 44,
              }}
            >
              {(searches ?? []).map((search, index) => (
                <Typography key={index} variant="body2" padding={1}>
                  {search}
                </Typography>
              ))}
            </Stack>
          )}
        </Stack>
      </TitleBar>
      <Box padding={3} ref={titleRef} sx={{display: focused ? 'none' : 'flex'}}>
        <Grid container overflow="auto" spacing={2}>
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
      </Box>
    </Stack>
  )
}
