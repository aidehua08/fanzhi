import { motion } from 'framer-motion'
import type { Ripple } from '../../hooks/usePointerParallax'

type PointerAuraProps = {
  ripples: Ripple[]
  disabled: boolean
}

export function PointerAura({ ripples, disabled }: PointerAuraProps) {
  if (disabled) return null

  return (
    <div className="pointer-layer" aria-hidden="true">
      <motion.div
        className="pointer-aura"
        transition={{ type: 'spring', stiffness: 120, damping: 28, mass: 0.5 }}
      />
      {ripples.map((ripple) => (
        <motion.span
          className="pointer-ripple"
          key={ripple.id}
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ opacity: 0.8, scale: 0.08 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
