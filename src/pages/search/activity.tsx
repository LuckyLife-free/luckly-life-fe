import {AsyncStatus, VerticalSliding} from '@/components'
import {
  ActivityListInput,
  ActivityListItemFragment,
  useActivityListLazyQuery,
} from '@/generated'
import {ListQuery, useListData} from '@/helpers'
import {Stack} from '@mui/material'
import {useCallback} from 'react'
import {useEffectOnce} from 'react-use'
import {ActivityList} from '../list/activity'

export function ScrollableActivityList(props: ActivityListInput) {
  const [query, {loading}] = useActivityListLazyQuery({
    variables: {filter: props, offset: 0, limit: 18},
  })
  const listQuery = useCallback<ListQuery<ActivityListItemFragment>>(
    async (pagination) => {
      const {data} = await query({variables: {...pagination}})
      return data?.activityList ?? []
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
          <ActivityList data={data} />
        </Stack>
      </AsyncStatus>
    </VerticalSliding>
  )
}
