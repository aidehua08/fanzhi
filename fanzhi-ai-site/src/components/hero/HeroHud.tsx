import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { heroContent, heroMetrics, navItems } from '../../data/siteContent'
import { FloatingMetricCard } from './FloatingMetricCard'

type HeroHudProps = {
  parallax: { x: number; y: number }
  onPrimaryClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export function HeroHud({ parallax, onPrimaryClick }: HeroHudProps) {
  return (
    <div className="hero-hud">
      <header className="hero-nav">
        <a className="hero-brand" href="#" aria-label="泛之 AI 首页">
          <span className="hero-brand-mark">FZ</span>
          <span>{heroContent.brand}</span>
        </a>
        <nav className="hero-nav-links" aria-label="主导航">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <motion.p
        className="hero-eyebrow"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {heroContent.eyebrow}
      </motion.p>

      <motion.h1
        className="hero-cockpit-title"
        style={{ x: parallax.x * -10, y: parallax.y * -6 }}
        initial={{ opacity: 0, filter: 'blur(8px)', y: 30 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {heroContent.title.map((line) => (
          <span data-text={line} key={line}>
            {line}
          </span>
        ))}
      </motion.h1>

      <motion.div
        className="hero-copy-panel"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
      >
        <p>{heroContent.subtitle}</p>
        <div className="hero-actions">
          <a href="#contact" className="hero-primary-btn" onClick={onPrimaryClick}>
            {heroContent.primaryCta}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#cases" className="hero-secondary-btn">
            {heroContent.secondaryCta}
          </a>
        </div>
      </motion.div>

      <div className="hero-metrics" aria-hidden="true">
        {heroMetrics.map((metric, index) => (
          <FloatingMetricCard
            key={metric.label}
            {...metric}
            offsetX={parallax.x * 18 * metric.strength}
            offsetY={parallax.y * 14 * metric.strength}
            delay={0.65 + index * 0.08}
          />
        ))}
      </div>

      <a className="hero-scroll-cue" href="#consulting" aria-label="继续浏览">
        <ArrowDown className="h-4 w-4" />
      </a>
    </div>
  )
}
