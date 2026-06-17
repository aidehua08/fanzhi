import { useEffect, useRef, useState } from 'react'
import { HeroHud } from './HeroHud'
import { PointerAura } from './PointerAura'
import type { PointerState, Ripple } from '../../hooks/usePointerParallax'

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string
    saveData?: boolean
    addEventListener?: (type: 'change', listener: () => void) => void
    removeEventListener?: (type: 'change', listener: () => void) => void
  }
}

type HeroCockpitProps = {
  onRequestContact: () => void
}

export function HeroCockpit({ onRequestContact }: HeroCockpitProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, pageX: 0, pageY: 0 })
  const rafRef = useRef(0)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (window.navigator as NavigatorWithConnection).connection

    const update = () => {
      const prefersReducedMotion = query.matches
      const saveData = Boolean(connection?.saveData)
      const effectiveType = connection?.effectiveType ?? ''
      const slowConnection = effectiveType === 'slow-2g' || effectiveType === '2g'
      const canPlayHeroVideo = !prefersReducedMotion && !saveData && !slowConnection

      setReducedMotion(prefersReducedMotion)
      setShouldPlayVideo(canPlayHeroVideo)
      if (!canPlayHeroVideo) setIsVideoReady(false)
    }

    update()
    query.addEventListener('change', update)
    connection?.addEventListener?.('change', update)

    return () => {
      query.removeEventListener('change', update)
      connection?.removeEventListener?.('change', update)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
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

  function handlePrimaryClick(event: React.MouseEvent<HTMLAnchorElement>) {
    addRipple(event)
  }

  return (
    <section
      ref={rootRef}
      className="hero-cockpit"
      aria-label="泛知科技企业 AI 落地服务首页"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={addRipple}
    >
      <div className="hero-media-backdrop" aria-hidden="true">
        {shouldPlayVideo ? (
          <video
            className={`hero-media-video${isVideoReady ? ' is-ready' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="metadata"
            poster="/hero/human-ai-handshake.jpg"
            onCanPlay={() => setIsVideoReady(true)}
          >
            <source src="/hero/company-home-hero.mp4" type="video/mp4" />
          </video>
        ) : null}
        <img
          className="hero-media-poster"
          src="/hero/human-ai-handshake.jpg"
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero-energy-field" aria-hidden="true" />
      <PointerAura ripples={ripples} disabled={reducedMotion} />
      <HeroHud onPrimaryClick={handlePrimaryClick} onRequestContact={onRequestContact} />
    </section>
  )
}
