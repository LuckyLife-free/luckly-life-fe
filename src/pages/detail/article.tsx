import {AsyncStatus, WithTitleBar} from '@/components'
import {useArticleQuery} from '@/generated'
import {ArrowBackRounded, StarRounded} from '@mui/icons-material'
import {Avatar, Button, IconButton, Stack, Typography} from '@mui/material'
import {useNavigate, useSearchParams} from 'react-router-dom'

export function ArticleDetail() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const {data, loading} = useArticleQuery({
    variables: {id: params.get('id')!},
  })

  return (
    <WithTitleBar
      title="文章详情"
      barLeft={
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackRounded />
        </IconButton>
      }
      barRight={
        <IconButton>
          <StarRounded />
        </IconButton>
      }
    >
      <AsyncStatus loading={loading}>
        <Stack spacing={2} p={2}>
          <Typography variant="h6">{data?.article?.title}</Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            bgcolor={(t) => t.palette.grey[50]}
            borderRadius={2}
            spacing={2}
            p={1.5}
          >
            <Avatar
              sx={{width: 32, height: 32}}
              src={data?.article?.author.avatar?.url}
              onClick={() =>
                navigate(`/detail/user?id=${data?.article?.author.id}`)
              }
            />
            <Typography variant="caption">
              {data?.article?.author.name}
            </Typography>
            <Button size="small" variant="outlined" sx={{ml: 10, p: 0}}>
              关注
            </Button>
          </Stack>
          <Typography variant="body2">{data?.article?.content}</Typography>
        </Stack>
      </AsyncStatus>
    </WithTitleBar>
  )
}
