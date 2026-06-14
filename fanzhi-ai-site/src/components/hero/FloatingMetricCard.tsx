import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

type MetricStyle = CSSProperties & {
  '--metric-strength': number
}

type FloatingMetricCardProps = {
  value: string
  label: string
  x: number
  y: number
  strength: number
  delay: number
}

export function FloatingMetricCard({
  value,
  label,
  x,
  y,
  strength,
  delay,
}: FloatingMetricCardProps) {
  return (
    <motion.div
      className="hero-metric-card"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        '--metric-strength': strength,
      } as MetricStyle}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span>{value}</span>
      <p>{label}</p>
    </motion.div>
  )
}
