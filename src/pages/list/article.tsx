import {ArticleListItemFragment} from '@/generated'
import {defaultCover} from '@/helpers'
import {ChevronRightOutlined} from '@mui/icons-material'
import {Avatar, IconButton, Stack, Typography} from '@mui/material'
import {format} from 'date-fns'
import {Fragment} from 'react'
import {useNavigate} from 'react-router-dom'

export function ArticleList(props: {data: ArticleListItemFragment[]}) {
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
            src={d.cover?.url || defaultCover}
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
