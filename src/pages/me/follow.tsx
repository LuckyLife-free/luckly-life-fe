import {AsyncStatus, VerticalSliding, WithTitleBar} from '@/components'
import {BaseUserFragment, useMyFollowedUserListLazyQuery} from '@/generated'
import {ListQuery, useListData} from '@/helpers'
import {ArrowBackRounded} from '@mui/icons-material'
import {IconButton, Stack} from '@mui/material'
import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useEffectOnce} from 'react-use'
import {UserList} from '../list/user'

export function MyFollowPage() {
  const navigate = useNavigate()
  const [query, {loading}] = useMyFollowedUserListLazyQuery()
  const listQuery = useCallback<ListQuery<BaseUserFragment>>(
    async (pagination) => {
      const {data} = await query({variables: {...pagination}})
      return data?.myFollowedUserList ?? []
    },
    [query]
  )
  const {reloadList, fetchMore, data} = useListData(listQuery)

  useEffectOnce(() => {
    reloadList()
  })

  return (
    <WithTitleBar
      title="我的关注"
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
            <UserList data={data} />
          </Stack>
        </AsyncStatus>
      </VerticalSliding>
    </WithTitleBar>
  )
}
