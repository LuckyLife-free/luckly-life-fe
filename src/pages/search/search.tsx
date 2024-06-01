import {MyTabs} from '@/components/tab'
import {useRecentSearch, useSearch} from '@/helpers'
import {ArrowBackRounded} from '@mui/icons-material'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ScrollableActivityList} from '../list/activity'
import {ScrollableArticleList} from '../list/article'
import {SearchInput} from './input'

const TabData = [
  {key: '1', label: '最近'},
  {key: '2', label: '热门'},
  {key: '3', label: '征文'},
]

export function SearchResult() {
  const [focused, setFocused] = useState(true)
  const [search, setSearch] = useSearch()
  const [searches] = useRecentSearch()
  const navigate = useNavigate()

  return (
    <Stack p={2} height={window.innerHeight}>
      <Stack position="relative">
        <Stack direction="row" alignItems="center">
          <IconButton size="small" onClick={() => navigate(-1)}>
            <ArrowBackRounded />
          </IconButton>
          <SearchInput onFocusedChange={setFocused} autoFocus />
        </Stack>
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
              <Typography
                key={index}
                padding={1}
                variant="body2"
                onClick={() => {
                  setSearch(search)
                  setFocused(false)
                }}
              >
                {search}
              </Typography>
            ))}
          </Stack>
        )}
      </Stack>
      {!focused && (
        <Box flex={1} hidden={focused}>
          <MyTabs tabs={TabData} sx={{mb: 2, mt: 1}}>
            {({tab}) =>
              tab === '1' ? (
                <ScrollableArticleList search={search} latest />
              ) : tab === '2' ? (
                <ScrollableArticleList search={search} />
              ) : tab === '3' ? (
                <ScrollableActivityList search={search} />
              ) : null
            }
          </MyTabs>
        </Box>
      )}
    </Stack>
  )
}
