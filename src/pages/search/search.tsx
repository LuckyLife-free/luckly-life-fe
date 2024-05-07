import {MyTabs} from '@/components/tab'
import {useRecentSearch, useSearch} from '@/helpers'
import {ChevronLeftRounded} from '@mui/icons-material'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {ActivityList} from './activity-list'
import {ArticleList} from './article-list'
import {SearchInput} from './input'

const TabData = [
  {key: '1', label: '最近'},
  {key: '2', label: '热门'},
  {key: '3', label: '征文'},
]

export function SearchResultPage() {
  const [focused, setFocused] = useState(true)
  const [search, setSearch] = useSearch()
  const [searches] = useRecentSearch()
  const navigate = useNavigate()

  return (
    <Stack p={2}>
      <Stack position="relative">
        <Stack direction="row" alignItems="center">
          <IconButton size="small" onClick={() => navigate(-1)}>
            <ChevronLeftRounded />
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
            <>
              <ArticleList visible={tab === '1'} search={search} latest />
              <ArticleList visible={tab === '2'} search={search} />
              <ActivityList visible={tab === '3'} search={search} />
            </>
          )}
        </MyTabs>
      </Box>
    </Stack>
  )
}
