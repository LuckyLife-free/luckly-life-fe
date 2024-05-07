import cover from '@/assets/cover.jpg'
import {AsyncStatus} from '@/components/status'
import {ActivityListInput, useActivityListQuery} from '@/generated'
import {Stack, SxProps, Typography} from '@mui/material'
import {format} from 'date-fns'
import {useEffect, useState} from 'react'

type ActivityListProps = ActivityListInput & {
  hidden?: boolean
  sx?: SxProps
}

export function ActivityList(props: ActivityListProps) {
  const {hidden, sx, ...input} = props
  const [skip, setSkip] = useState(true)
  const {data: activityData, loading} = useActivityListQuery({
    variables: {filter: input, limit: 18},
    skip,
  })

  useEffect(() => {
    !hidden && setSkip(false)
  }, [input.search, hidden])

  return (
    <AsyncStatus
      hidden={hidden}
      loading={loading}
      empty={activityData?.activityList.length === 0}
    >
      <Stack spacing={2} sx={sx}>
        {activityData?.activityList.map((d) => (
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
    </AsyncStatus>
  )
}
