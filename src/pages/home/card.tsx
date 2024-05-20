import {HorizontalSliding} from '@/components'
import {IdInput} from '@/generated'
import {Box, Grid, Skeleton, Stack, Typography} from '@mui/material'
import {isFunction} from 'lodash-es'
import {ReactNode} from 'react'

const widthDict = {
  1: 'calc(100vw - 32px)',
  2: 'calc(50vw - 16px)',
  3: 'calc(33.33vw - 10.66px)',
}

const heightDict = {
  1: 200,
  2: 400,
  3: 600,
}

export function HomePageCard<T extends IdInput>(props: {
  children: Computable<ReactNode, T>
  column: 1 | 2 | 3
  row: 1 | 2 | 3
  loading: boolean
  title: string
  data: T[]
}) {
  const {children, loading, row, column, data, title} = props
  const slideOffset = Math.floor(data.length / (row * column)) - 1

  return (
    <Box p={3} pr={0}>
      <Typography variant="h6">{title}</Typography>
      {loading ? (
        <Stack direction="row" flex={1}>
          <Stack flex={1} gap={1}>
            <Skeleton variant="rounded" width="90%" height={100} />
            <Skeleton variant="rounded" width="80%" height={20} />
            <Skeleton variant="rounded" width="60%" height={20} />
          </Stack>
          <Stack flex={1} gap={1}>
            <Skeleton variant="rounded" width="90%" height={100} />
            <Skeleton variant="rounded" width="80%" height={20} />
            <Skeleton variant="rounded" width="60%" height={20} />
          </Stack>
        </Stack>
      ) : (
        <HorizontalSliding
          distancePerScratch={window.innerWidth - 32}
          offsetDomain={[-slideOffset, 0]}
        >
          {(ref) => (
            <Grid
              ref={ref}
              container
              direction="column"
              maxHeight={heightDict[row]}
              spacing={2}
            >
              {data.map((item) => (
                <Grid item key={item.id} width={widthDict[column]}>
                  {isFunction(children) ? children(item) : children}
                </Grid>
              ))}
            </Grid>
          )}
        </HorizontalSliding>
      )}
    </Box>
  )
}
