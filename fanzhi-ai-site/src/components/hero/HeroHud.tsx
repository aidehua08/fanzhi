import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { heroContent, navItems } from '../../data/siteContent'

type HeroHudProps = {
  onPrimaryClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export function HeroHud({ onPrimaryClick }: HeroHudProps) {
  return (
    <div className="hero-hud">
      <header className="hero-nav">
        <a className="hero-brand" href="#" aria-label="泛知科技首页">
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

      <div className="hero-media-layout">
        <motion.div
          className="hero-copy-panel"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14 }}
        >
          <p className="hero-eyebrow">{heroContent.eyebrow}</p>
          <h1 className="hero-cockpit-title">
            {heroContent.title.map((line) => (
              <span data-text={line} key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">{heroContent.subtitle}</p>
          <div className="hero-trust-strip" aria-label="泛知科技交付范围">
            <span>AI 咨询诊断</span>
            <span>企业培训</span>
            <span>Agent 开发</span>
            <span>知识库陪跑</span>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="hero-primary-btn" onClick={onPrimaryClick}>
              {heroContent.primaryCta}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#delivery" className="hero-secondary-btn">
              {heroContent.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>

      <a className="hero-scroll-cue" href="#consulting" aria-label="继续浏览">
        <ArrowDown className="h-4 w-4" />
      </a>
    </div>
  )
}
