import { useEffect, useState } from 'react'

export type Ripple = {
  id: number
  x: number
  y: number
}

export function usePointerParallax() {
  const [pointer, setPointer] = useState({ x: 0, y: 0, pageX: 0, pageY: 0 })
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)

    update()
    query.addEventListener('change', update)

    return () => query.removeEventListener('change', update)
  }, [])

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    setPointer({
      x: Math.max(-0.5, Math.min(0.5, x)) * 2,
      y: Math.max(-0.5, Math.min(0.5, y)) * 2,
      pageX: event.clientX - rect.left,
      pageY: event.clientY - rect.top,
    })
  }

  function handlePointerLeave() {
    setPointer((current) => ({ ...current, x: 0, y: 0 }))
  }

  function addRipple(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const ripple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    setRipples((current) => [...current.slice(-4), ripple])
    window.setTimeout(() => {
      setRipples((current) => current.filter((item) => item.id !== ripple.id))
    }, 900)
  }

  return {
    pointer,
    ripples,
    reducedMotion,
    handlePointerMove,
    handlePointerLeave,
    addRipple,
  }
}
