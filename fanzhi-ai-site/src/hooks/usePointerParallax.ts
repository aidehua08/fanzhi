import { useEffect, useRef, useState } from 'react'

export type PointerState = {
  x: number
  y: number
  pageX: number
  pageY: number
}

export type Ripple = {
  id: number
  x: number
  y: number
}

export function usePointerParallax() {
  const rootRef = useRef<HTMLElement | null>(null)
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, pageX: 0, pageY: 0 })
  const rafRef = useRef(0)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)

    update()
    query.addEventListener('change', update)

    return () => query.removeEventListener('change', update)
  }, [])

  function syncCssVariables() {
    rafRef.current = 0
    const root = rootRef.current
    if (!root) return

    const pointer = pointerRef.current
    root.style.setProperty('--pointer-x', `${pointer.x}`)
    root.style.setProperty('--pointer-y', `${pointer.y}`)
    root.style.setProperty('--pointer-page-x', `${pointer.pageX}px`)
    root.style.setProperty('--pointer-page-y', `${pointer.pageY}px`)
  }

  function scheduleCssSync() {
    if (rafRef.current) return
    rafRef.current = window.requestAnimationFrame(syncCssVariables)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    pointerRef.current = {
      x: Math.max(-0.5, Math.min(0.5, x)) * 2,
      y: Math.max(-0.5, Math.min(0.5, y)) * 2,
      pageX: event.clientX - rect.left,
      pageY: event.clientY - rect.top,
    }

    scheduleCssSync()
  }

  function handlePointerLeave() {
    pointerRef.current = { ...pointerRef.current, x: 0, y: 0 }
    scheduleCssSync()
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

  useEffect(() => {
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return {
    rootRef,
    pointerRef,
    ripples,
    reducedMotion,
    handlePointerMove,
    handlePointerLeave,
    addRipple,
  }
}
