import {
  useIsStaredArticleQuery,
  useStarArticleMutation,
  useUnStarArticleMutation,
} from '@/generated'
import {StarBorderRounded, StarRounded} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import {useCallback} from 'react'

export function StarButton({id}: {id: string}) {
  const {data, refetch} = useIsStaredArticleQuery({variables: {filter: {id}}})
  const [confirm] = useStarArticleMutation({variables: {input: {id}}})
  const [cancel] = useUnStarArticleMutation({variables: {input: {id}}})
  const onClick = useCallback(async () => {
    await (data?.isStaredArticle ? cancel() : confirm())
    refetch()
  }, [data?.isStaredArticle, confirm, refetch, cancel])

  return (
    <IconButton onClick={onClick}>
      {data?.isStaredArticle ? <StarRounded /> : <StarBorderRounded />}
    </IconButton>
  )
}
