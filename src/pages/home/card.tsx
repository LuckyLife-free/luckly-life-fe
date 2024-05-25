import {IdInput} from '@/generated'
import {Box, Grid, Skeleton, Stack, Typography} from '@mui/material'
import {chunk, isFunction} from 'lodash-es'
import {ReactNode} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'

export function HomePageCard<T extends IdInput>(props: {
  children: Computable<ReactNode, T>
  column: 1 | 2 | 3
  row: 1 | 2 | 3
  loading: boolean
  title: string
  data: T[]
}) {
  const {children, loading, row, column, data, title} = props

  return (
    <Box m={3} boxSizing="border-box" overflow="visible">
      <Typography variant="h6" pb={1}>
        {title}
      </Typography>
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
        <Swiper
          slidesPerView={column * 1.1}
          slidesPerGroup={2}
          spaceBetween={16}
        >
          {chunk(data, row).map((group, i) => (
            <SwiperSlide key={i}>
              <Grid container direction="column">
                {group.map((item) => (
                  <Grid item key={item.id} width="100%">
                    {isFunction(children) ? children(item) : children}
                  </Grid>
                ))}
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  )
}
