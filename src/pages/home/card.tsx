import {SlidingContainer} from '@/components/scroll/sliding'
import {IdInput} from '@/generated'
import {Box, Grid, Typography} from '@mui/material'
import {isFunction} from 'lodash-es'
import {ReactNode} from 'react'

const widthDict = {
  1: 'calc(100vw - 32px)',
  2: 'calc(50vw - 16px)',
  3: 'calc(33.33vw - 16px)',
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
  title: string
  data: T[]
}) {
  const {children, row, column, data, title} = props
  const slideOffset = Math.floor(data.length / (row * column)) - 1

  return (
    <Box p={3} pr={0}>
      <Typography variant="h6">{title}</Typography>
      <SlidingContainer
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
      </SlidingContainer>
    </Box>
  )
}
