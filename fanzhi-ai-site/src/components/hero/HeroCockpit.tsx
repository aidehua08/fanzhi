import { CockpitCanvas } from './CockpitCanvas'
import { HeroHud } from './HeroHud'
import { PointerAura } from './PointerAura'
import { usePointerParallax } from '../../hooks/usePointerParallax'

export function HeroCockpit() {
  const pointer = usePointerParallax()

  function handlePrimaryClick(event: React.MouseEvent<HTMLAnchorElement>) {
    pointer.addRipple(event)
  }

  return (
    <section
      className="hero-cockpit"
      aria-label="泛之 AI 企业 AI 经营舱"
      onPointerMove={pointer.handlePointerMove}
      onPointerLeave={pointer.handlePointerLeave}
      onClick={pointer.addRipple}
    >
      <CockpitCanvas parallax={pointer.pointer} reducedMotion={pointer.reducedMotion} />
      <div className="hero-cockpit-fallback" aria-hidden="true" />
      <PointerAura
        x={pointer.pointer.pageX}
        y={pointer.pointer.pageY}
        ripples={pointer.ripples}
        disabled={pointer.reducedMotion}
      />
      <HeroHud parallax={pointer.pointer} onPrimaryClick={handlePrimaryClick} />
    </section>
  )
}
