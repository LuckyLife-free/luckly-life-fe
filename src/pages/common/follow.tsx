import {
  useFollowUserMutation,
  useIsFollowedUserQuery,
  useUnFollowUserMutation,
} from '@/generated'
import {Button} from '@mui/material'
import {useCallback} from 'react'

export function FollowButton({id}: {id: string}) {
  const {data, refetch} = useIsFollowedUserQuery({variables: {filter: {id}}})
  const [confirm] = useFollowUserMutation({variables: {input: {id}}})
  const [cancel] = useUnFollowUserMutation({variables: {input: {id}}})
  const onClick = useCallback(async () => {
    await (data?.isFollowedUser ? cancel() : confirm())
    refetch()
  }, [cancel, confirm, data?.isFollowedUser, refetch])

  return (
    <Button
      size="small"
      variant="outlined"
      sx={{ml: 10, p: 0}}
      onClick={onClick}
    >
      {data?.isFollowedUser ? '已关注' : '关注'}
    </Button>
  )
}
