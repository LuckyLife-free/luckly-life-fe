import {Box, Stack} from '@mui/material'
import anime from 'animejs'
import {ReactNode, RefObject, useLayoutEffect, useRef, useState} from 'react'
import {useEvent, useScroll, useToggle, useUpdateEffect} from 'react-use'
import {AsyncStatus} from '../status'

const loadingHeight = 100
const triggerDistance = 50

type SlidingContainerProps = {
  onScrollToTop?: AnyFunction
  onScrollToBottom?: AnyFunction
  children: ReactNode
  loading: boolean
}

function usePressDistance(props: {
  ref: RefObject<HTMLElement>
  onScrollToTop?: AnyFunction
  onScrollToBottom?: AnyFunction
}) {
  const {ref, onScrollToTop, onScrollToBottom} = props
  const [distance, setDistance] = useState(-loadingHeight)
  const [touchend, setTouched] = useToggle(false)
  const [start, setStart] = useState(-1)
  const {y} = useScroll(ref)

  useEvent('touchstart', (e) => {
    if (ref.current?.contains(e.target as Node)) {
      setStart(e.touches[0].pageY)
      setTouched(true)
    }
  })
  useEvent('touchmove', (e: TouchEvent) => {
    if (ref.current?.contains(e.target as Node)) {
      const {scrollHeight, clientHeight} = ref.current
      if (scrollHeight === clientHeight || y === 0) {
        setDistance(e.touches[0].pageY - start)
      }
    }
  })
  useEvent('touchend', () => {
    if (distance > triggerDistance) {
      onScrollToTop?.()
      setTouched(false)
      setDistance(-loadingHeight)
    }
  })
  useUpdateEffect(() => {
    if (ref.current) {
      const {scrollHeight, clientHeight} = ref.current
      if (y + clientHeight + triggerDistance >= scrollHeight) {
        onScrollToBottom?.()
      }
    }
  }, [y])

  return {touchend, distance}
}

export function VerticalSliding(props: SlidingContainerProps) {
  const {children, loading, ...rest} = props
  const ref = useRef<HTMLElement>(null)
  const loadingRef = useRef<HTMLElement>(null)
  const {distance, touchend} = usePressDistance({ref, ...rest})
  const [top, setTop] = useState(-loadingHeight)
  const [height, setHeight] = useState<Meta>('100%')
  const targets = useRef({value: top})

  useUpdateEffect(() => {
    if (touchend) {
      setTop((distance - loadingHeight) * (distance < loadingHeight ? 1 : 0.3))
    } else if (loading && top !== 0) {
      anime.remove(targets.current)
      anime({
        update: () => setTop(targets.current.value),
        targets: targets.current,
        value: [top, 0],
        easing: 'easeOutSine',
      })
    } else if (!loading && top !== -loadingHeight) {
      anime.remove(targets.current)
      anime({
        update: () => setTop(targets.current.value),
        targets: targets.current,
        value: [top, -loadingHeight],
        easing: 'easeOutSine',
      })
    }
  }, [loading, distance, touchend])

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(window.innerHeight - ref.current.offsetTop)
    }
  }, [])

  return (
    <Box ref={ref} height={height} position="relative" overflow="auto">
      <Stack width="100%" position="absolute" top={top} ref={loadingRef}>
        <AsyncStatus loading />
      </Stack>
      {children}
    </Box>
  )
}
