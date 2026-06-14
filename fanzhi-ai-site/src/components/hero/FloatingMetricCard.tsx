import { motion } from 'framer-motion'

type FloatingMetricCardProps = {
  value: string
  label: string
  x: number
  y: number
  offsetX: number
  offsetY: number
  delay: number
}

export function FloatingMetricCard({
  value,
  label,
  x,
  y,
  offsetX,
  offsetY,
  delay,
}: FloatingMetricCardProps) {
  return (
    <motion.div
      className="hero-metric-card"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
      }}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span>{value}</span>
      <p>{label}</p>
    </motion.div>
  )
}
