import {MyTabs} from '@/components/tab'
import {useRecentSearch, useSearch} from '@/helpers'
import {ArrowBackRounded} from '@mui/icons-material'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ActivityList} from '../list/activity'
import {ArticleList} from '../list/article'
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
    <Stack p={2}>
      <Stack position="relative">
        <Stack direction="row" alignItems="center">
          <IconButton size="small" onClick={() => navigate(-1)}>
            <ArrowBackRounded />
          </IconButton>
          <SearchInput onFocusedChange={setFocused} />
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
      <Box hidden={focused} pt={1}>
        <MyTabs tabs={TabData}>
          {({tab}) => (
            <Stack mt={2}>
              <ArticleList hidden={tab !== '1'} search={search} latest />
              <ArticleList hidden={tab !== '2'} search={search} />
              <ActivityList hidden={tab !== '3'} search={search} />
            </Stack>
          )}
        </MyTabs>
      </Box>
    </Stack>
  )
}
