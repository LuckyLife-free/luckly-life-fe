import {ActivityListItemFragment} from '@/generated'
import {defaultCover} from '@/helpers'
import {Stack, Typography} from '@mui/material'
import {format} from 'date-fns'
import {Fragment} from 'react'

export function ActivityList(props: {data: ActivityListItemFragment[]}) {
  return (
    <Fragment>
      {props.data.map((d) => (
        <Stack
          key={d.id}
          justifyContent="end"
          sx={{
            overflow: 'hidden',
            background: `url(${d.cover?.url || defaultCover})`,
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
