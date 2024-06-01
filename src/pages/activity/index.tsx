import {
  TitleBar,
  VerticalSliding,
  WithBottomBar,
  useTitleBar,
} from '@/components'
import {useActivityListQuery} from '@/generated'
import {Stack} from '@mui/material'
import {ActivityList} from '../list/activity'

export function ActivityPage() {
  const {ref, barHidden} = useTitleBar()
  const {data, loading, refetch} = useActivityListQuery({
    variables: {offset: 0, limit: 18},
  })

  return (
    <WithBottomBar>
      <VerticalSliding
        scrollRef={ref}
        loading={loading}
        onScrollToTop={refetch}
      >
        <TitleBar barHidden={barHidden}>征文活动</TitleBar>
        <Stack flex={1} p={3} spacing={2}>
          <ActivityList data={data?.activityList ?? []} />
        </Stack>
      </VerticalSliding>
    </WithBottomBar>
  )
}
