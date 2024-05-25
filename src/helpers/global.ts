import {useEffect, useState} from 'react'
import {useKeyPressEvent} from 'react-use'

export function useShadowMode() {
  const [opacity, setOpacity] = useState(
    (import.meta as any).env.MODE === 'development' ? 1 : 1
  )

  useKeyPressEvent(
    (e) => e.ctrlKey && e.key === 's',
    () => setOpacity(opacity === 1 ? 0.2 : 1)
  )

  useEffect(() => {
    document.body.style.opacity = String(opacity)
  }, [opacity])
}
