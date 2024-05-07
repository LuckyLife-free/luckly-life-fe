import cover from '@/assets/cover.jpg'
import {AsyncStatus} from '@/components/status'
import {ArticleListInput, useArticleListQuery} from '@/generated'
import {ChevronRightRounded} from '@mui/icons-material'
import {Avatar, IconButton, Stack, Typography} from '@mui/material'
import {format} from 'date-fns'
import {useEffect, useState} from 'react'

type ArticleListProps = ArticleListInput & {
  visible: boolean
}

export function ArticleList(props: ArticleListProps) {
  const {visible, ...input} = props
  const [skip, setSkip] = useState(true)
  const {data: articleData, loading} = useArticleListQuery({
    variables: {filter: input, limit: 18},
    skip,
  })

  useEffect(() => {
    visible && input.search && setSkip(false)
  }, [input.search, visible])

  return (
    <AsyncStatus
      loading={loading}
      hidden={!visible}
      empty={articleData?.articleList.length === 0}
    >
      <Stack mt={2} spacing={2}>
        {articleData?.articleList.map((d) => (
          <Stack key={d.id} direction="row" spacing={2}>
            <Avatar
              variant="rounded"
              src={d.cover?.url || cover}
              sx={{width: '30vw', height: '20vw'}}
            >
              {d.cover?.name}
            </Avatar>
            <Stack flex={1} direction="row" justifyContent="space-between">
              <Stack spacing={1}>
                <Typography
                  variant="caption"
                  color={(t) => t.palette.text.secondary}
                >
                  {format(d.createTime, 'yyyy/MM/dd')}
                </Typography>
                <Typography variant="subtitle2">{d.title}</Typography>
              </Stack>
              <IconButton>
                <ChevronRightRounded />
              </IconButton>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </AsyncStatus>
  )
}
