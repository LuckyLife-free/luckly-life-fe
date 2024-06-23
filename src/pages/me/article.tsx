import {AsyncStatus, VerticalSliding, WithTitleBar} from '@/components'
import {ArticleListItemFragment, useMyArticleListLazyQuery} from '@/generated'
import {ListQuery, useListData} from '@/helpers'
import {ArrowBackRounded} from '@mui/icons-material'
import {IconButton, Stack} from '@mui/material'
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useEffectOnce} from 'react-use'
import {ArticleList} from '../list/article'

export function MyArticlePage() {
  const navigate = useNavigate()
  const [query, {loading}] = useMyArticleListLazyQuery()
  const listQuery = useCallback<ListQuery<ArticleListItemFragment>>(
    async (pagination) => {
      const {data} = await query({variables: {...pagination}})
      return data?.myArticleList ?? []
    },
    [query]
  )
  const {reloadList, fetchMore, data} = useListData(listQuery)

  useEffectOnce(() => {
    reloadList()
  })

  return (
    <WithTitleBar
      title="我的作品"
      barLeft={
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackRounded />
        </IconButton>
      }
    >
      <VerticalSliding
        onScrollToTop={reloadList}
        onScrollToBottom={fetchMore}
        loading={loading}
      >
        <AsyncStatus empty={data.length === 0}>
          <Stack spacing={2} m={2}>
            <ArticleList data={data} />
          </Stack>
        </AsyncStatus>
      </VerticalSliding>
    </WithTitleBar>
  )
}
