import cover from '@/assets/cover.jpg'
import {AsyncStatus} from '@/components/status'
import {ArticleListInput, useArticleListQuery} from '@/generated'
import {ChevronRightOutlined} from '@mui/icons-material'
import {Avatar, IconButton, Stack, SxProps, Typography} from '@mui/material'
import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

type ArticleListProps = ArticleListInput & {
  hidden?: boolean
  sx?: SxProps
}

export function ArticleList(props: ArticleListProps) {
  const {hidden, sx, ...input} = props
  const navigate = useNavigate()
  const [skip, setSkip] = useState(true)
  const {data: articleData, loading} = useArticleListQuery({
    variables: {filter: input, limit: 18},
    skip,
  })

  useEffect(() => {
    !hidden && setSkip(false)
  }, [input.search, hidden])

  return (
    <AsyncStatus
      hidden={hidden}
      loading={loading}
      empty={articleData?.articleList.length === 0}
    >
      <Stack spacing={2} sx={sx}>
        {articleData?.articleList.map((d) => (
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
    </AsyncStatus>
  )
}
