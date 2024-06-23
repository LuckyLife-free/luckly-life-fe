import {AsyncStatus, VerticalSliding} from '@/components'
import {
  ArticleListInput,
  ArticleListItemFragment,
  useArticleListLazyQuery,
} from '@/generated'
import {ListQuery, useListData} from '@/helpers'
import {Stack} from '@mui/material'
import {useCallback} from 'react'
import {useEffectOnce} from 'react-use'
import {ArticleList} from '../list/article'

export function ScrollableArticleList(props: ArticleListInput) {
  const [query, {loading}] = useArticleListLazyQuery({
    variables: {filter: props, limit: 18},
  })
  const listQuery = useCallback<ListQuery<ArticleListItemFragment>>(
    async (pagination) => {
      const {data} = await query({variables: {...pagination}})
      return data?.articleList ?? []
    },
    [query]
  )
  const {reloadList, fetchMore, data} = useListData(listQuery)

  useEffectOnce(() => {
    reloadList()
  })

  return (
    <VerticalSliding
      onScrollToTop={reloadList}
      onScrollToBottom={fetchMore}
      loading={loading}
    >
      <AsyncStatus empty={data.length === 0}>
        <Stack spacing={2} mb={2}>
          <ArticleList data={data} />
        </Stack>
      </AsyncStatus>
    </VerticalSliding>
  )
}
