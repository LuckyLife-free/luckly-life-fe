import cover from '@/assets/cover.jpg'
import {VerticalSliding} from '@/components'
import {
  ArticleListInput,
  ArticleListQueryResult,
  useArticleListLazyQuery,
} from '@/generated'
import {ListQuery, useListData} from '@/helpers'
import {ChevronRightOutlined} from '@mui/icons-material'
import {Avatar, IconButton, Stack, Typography} from '@mui/material'
import {format} from 'date-fns'
import {Fragment, useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useEffectOnce} from 'react-use'

type ArticleListProps = ArticleListInput

type Datum = NonNullable<ArticleListQueryResult['data']>['articleList'][number]

export function ScrollableArticleList(props: ArticleListProps) {
  const [query, {loading}] = useArticleListLazyQuery({
    variables: {filter: props, limit: 18},
  })
  const listQuery = useCallback<ListQuery<Datum>>(
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
      <Stack spacing={2} mb={2}>
        <ArticleList data={data} />
      </Stack>
    </VerticalSliding>
  )
}

export function ArticleList(props: {data: Datum[]}) {
  const navigate = useNavigate()

  return (
    <Fragment>
      {props.data.map((d) => (
        <Stack
          key={d.id}
          direction="row"
          onClick={() => navigate(`/detail/article?id=${d.id}`)}
          bgcolor={(t) => t.palette.grey[50]}
          borderRadius={1}
          overflow="hidden"
        >
          <Avatar
            variant="rounded"
            src={d.cover?.url || cover}
            sx={{width: '30vw', height: '20vw'}}
          >
            {d.cover?.name}
          </Avatar>
          <Stack p={1} flex={1} direction="row" justifyContent="space-between">
            <Stack spacing={1}>
              <Typography
                variant="caption"
                color={(t) => t.palette.text.secondary}
              >
                {format(d.createTime, 'yyyy/MM/dd')}
              </Typography>
              <Typography variant="subtitle2">{d.title}</Typography>
            </Stack>
            <IconButton size="small">
              <ChevronRightOutlined />
            </IconButton>
          </Stack>
        </Stack>
      ))}
    </Fragment>
  )
}
