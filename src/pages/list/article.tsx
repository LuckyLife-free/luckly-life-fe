import cover from '@/assets/cover.jpg'
import {VerticalSliding} from '@/components'
import {
  ArticleListInput,
  ArticleListQueryResult,
  useArticleListLazyQuery,
} from '@/generated'
import {ListQuery, useListData} from '@/helpers'
import {ChevronRightOutlined} from '@mui/icons-material'
import {Avatar, IconButton, Stack, SxProps, Typography} from '@mui/material'
import {format} from 'date-fns'
import {useCallback, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

type ArticleListProps = ArticleListInput & {
  hidden?: boolean
  sx?: SxProps
}

type Datum = NonNullable<ArticleListQueryResult['data']>['articleList'][number]

export function ArticleList(props: ArticleListProps) {
  const {hidden, sx, ...input} = props
  const navigate = useNavigate()
  const [query, {loading}] = useArticleListLazyQuery({
    variables: {filter: input, limit: 18},
  })
  const listQuery = useCallback<ListQuery<Datum>>(
    async (pagination) => {
      const {data} = await query({variables: {...pagination}})
      return data?.articleList ?? []
    },
    [query]
  )
  const {reloadList, fetchMore, data} = useListData(listQuery)

  useEffect(() => {
    !hidden && reloadList()
  }, [hidden, reloadList])

  return (
    <VerticalSliding
      onScrollToTop={reloadList}
      onScrollToBottom={fetchMore}
      loading={loading}
      height={400}
    >
      <Stack spacing={2} sx={sx}>
        {data.map((d) => (
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
            <Stack
              p={1}
              flex={1}
              direction="row"
              justifyContent="space-between"
            >
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
      </Stack>
    </VerticalSliding>
  )
}
