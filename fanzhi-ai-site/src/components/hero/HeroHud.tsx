import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { heroContent, navItems } from '../../data/siteContent'

type HeroHudProps = {
  onPrimaryClick: (event: React.MouseEvent<HTMLAnchorElement>) => void
  onRequestContact: () => void
}

export function HeroHud({ onPrimaryClick, onRequestContact }: HeroHudProps) {
  function handlePrimaryClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    onPrimaryClick(event)
    onRequestContact()
  }

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
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
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
            <span>100+ 项目经验</span>
            <span>端到端解决方案</span>
            <span>企业知识飞轮</span>
            <span>商业智能化转型</span>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="hero-primary-btn" onClick={handlePrimaryClick}>
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
