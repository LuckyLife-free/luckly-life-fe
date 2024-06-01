import cover from '@/assets/cover.jpg'
import {VerticalSliding} from '@/components'
import {
  ActivityListInput,
  ActivityListQueryResult,
  useActivityListLazyQuery,
} from '@/generated'
import {ListQuery, useListData} from '@/helpers'
import {Stack, Typography} from '@mui/material'
import {format} from 'date-fns'
import {Fragment, useCallback} from 'react'
import {useEffectOnce} from 'react-use'

type ActivityListProps = ActivityListInput

type Datum = NonNullable<
  ActivityListQueryResult['data']
>['activityList'][number]

export function ScrollableActivityList(props: ActivityListProps) {
  const [query, {loading}] = useActivityListLazyQuery({
    variables: {filter: props, offset: 0, limit: 18},
  })
  const listQuery = useCallback<ListQuery<Datum>>(
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
      <Stack spacing={2} mb={2}>
        <ActivityList data={data} />
      </Stack>
    </VerticalSliding>
  )
}

export function ActivityList(props: {data: Datum[]}) {
  return (
    <Fragment>
      {props.data.map((d) => (
        <Stack
          key={d.id}
          justifyContent="end"
          sx={{
            overflow: 'hidden',
            background: `url(${d.cover?.url || cover})`,
            backgroundSize: '100% 100%',
            borderRadius: 3,
            height: 200,
          }}
        >
          <Stack
            spacing={2}
            sx={{
              p: 2,
              background:
                'linear-gradient(to top, rgba(0,0,0,.5), transparent);',
            }}
          >
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Stack spacing={1}>
                <Typography lineHeight={1} variant="h6" color="white">
                  {d.title}
                </Typography>
                <Typography lineHeight={1} variant="caption" color="white">
                  {`${format(d.startTime, 'MM/dd')}-${format(
                    d.endTime,
                    'MM/dd'
                  )}`}
                </Typography>
              </Stack>
              <Typography
                flexShrink={0}
                lineHeight={1}
                color="orange"
                variant="h6"
              >
                {d.tag?.name}
              </Typography>
            </Stack>
            <Stack alignItems="end">
              <Typography lineHeight={1} variant="caption" color="white">
                {d.description}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Fragment>
  )
}
