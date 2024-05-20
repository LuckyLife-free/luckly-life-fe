import cover from '@/assets/cover.jpg'
import {VerticalSliding} from '@/components'
import {
  ActivityListInput,
  ActivityListQueryResult,
  useActivityListLazyQuery,
} from '@/generated'
import {ListQuery, useListData} from '@/helpers'
import {Stack, SxProps, Typography} from '@mui/material'
import {format} from 'date-fns'
import {useCallback, useEffect} from 'react'

type ActivityListProps = ActivityListInput & {
  hidden?: boolean
  sx?: SxProps
}

type Datum = NonNullable<
  ActivityListQueryResult['data']
>['activityList'][number]

export function ActivityList(props: ActivityListProps) {
  const {hidden, sx, ...rest} = props
  const [query, {loading}] = useActivityListLazyQuery({
    variables: {filter: rest, offset: 0, limit: 18},
  })
  const listQuery = useCallback<ListQuery<Datum>>(
    async (pagination) => {
      const {data} = await query({variables: {...pagination}})
      return data?.activityList ?? []
    },
    [query]
  )
  const {reloadList, fetchMore, data} = useListData(listQuery)

  useEffect(() => {
    !hidden && reloadList()
  }, [hidden, reloadList])

  return (
    <VerticalSliding
      onScrollToTop={reloadList}
      onScrollToBottom={fetchMore}
      loading={loading}
      height={500}
    >
      <Stack spacing={2} sx={sx}>
        {data.map((d) => (
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
      </Stack>
    </VerticalSliding>
  )
}
