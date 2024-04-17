import {Box} from '@mui/material'
import anime from 'animejs'
import {ReactNode, RefObject, useRef, useState} from 'react'
import {useEvent, useUpdateEffect} from 'react-use'

type SlidingContainerProps = {
  distancePerScratch: number
  offsetDomain: [number, number]
  children: (ref: RefObject<HTMLDivElement>) => ReactNode
}

type PressDistance = {
  offset: number
}

function usePressDistance(
  ref: RefObject<HTMLElement>,
  offsetDomain: [number, number]
) {
  const [value, setValue] = useState<PressDistance>({offset: 0})
  const [start, setStart] = useState(-1)
  const [end, setEnd] = useState(-1)

  useEvent('touchstart', (e) => {
    if (ref.current?.contains(e.target as Node)) {
      setStart(e.touches[0].pageX)
    }
  })
  useEvent('touchmove', (e: TouchEvent) => {
    if (ref.current?.contains(e.target as Node)) {
      setEnd(e.touches[0].pageX)
    }
  })
  useEvent('touchend', () => {
    if (end - start > 50) {
      return setValue((prev) => ({
        offset: Math.min(offsetDomain[1], prev.offset + 1),
      }))
    } else if (start - end > 50) {
      return setValue((prev) => ({
        offset: Math.max(offsetDomain[0], prev.offset - 1),
      }))
    }
  })

  return value
}

export function SlidingContainer(props: SlidingContainerProps) {
  const {distancePerScratch, offsetDomain, children} = props
  const ref = useRef<HTMLElement>(null)
  const childrenRef = useRef<HTMLDivElement>(null)
  const dist = usePressDistance(ref, offsetDomain)

  useUpdateEffect(() => {
    anime({
      targets: childrenRef.current,
      translateX: dist.offset * distancePerScratch,
      easing: 'easeOutCubic',
      duration: 500,
    })
  }, [dist])

  return (
    <Box ref={ref} overflow="hidden">
      {children(childrenRef)}
    </Box>
  )
}
