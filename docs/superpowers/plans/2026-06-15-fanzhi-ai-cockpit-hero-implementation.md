# Fanzhi AI Cockpit Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current logo/photo-based hero with a Remix/Sazabi-inspired “Enterprise AI Cockpit” homepage that feels futuristic, interactive, and clearly tied to Fanzhi’s AI consulting, training, Agent, knowledge base, and delivery services.

**Architecture:** Build the hero as a layered React system: a Canvas atmosphere layer for particles, light trails, grid, and scan core; a DOM/HUD layer for navigation, headline, CTA, metric cards, pointer aura, and click ripples; and small hooks/data files so motion state and content stay maintainable. Keep the existing downstream sections, but remove old logo/door/sign imagery from the hero and replace scenario placeholders with neutral generated-style panels until real cases arrive.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 3, Framer Motion, Lucide React, HTML Canvas 2D first. Optional later upgrade: Three.js / React Three Fiber if the Canvas version does not meet the desired depth.

---

## Scope

This plan implements the confirmed C direction: “泛知混合版企业 AI 经营舱”.

In scope:

- New interactive homepage hero.
- Remove old logo/door/sign assets from the first impression.
- Mouse-following cockpit parallax.
- Canvas particles, light trails, scan core, and subtle grid.
- Click radar ripple feedback.
- HUD metric cards.
- Mobile and reduced-motion fallbacks.
- Basic visual regression screenshots.

Out of scope for this phase:

- Real customer case content.
- Full 3D city model.
- Audio system.
- Deployment.
- Brand identity redesign beyond the homepage direction.

## Required Inputs From User

These are useful but not blocking:

- GitHub repository URL, if you want version control, review history, and future deployment workflow.
- Final contact method for CTA: phone, WeChat QR, Feishu form, email, or external booking link.
- Preferred brand display name: `泛知科技`, `FANZHI AI`, or both.
- Any phrase you want as the final hero slogan.
- Real case images/screenshots later for the scenario cards.

## File Structure

Create:

- `fanzhi-ai-site/src/components/hero/HeroCockpit.tsx`  
  Owns the hero layout, pointer state, click ripple events, and section composition.

- `fanzhi-ai-site/src/components/hero/CockpitCanvas.tsx`  
  Draws the animated background on a `<canvas>`: particles, grid, scan core, light trails, pointer-reactive parallax.

- `fanzhi-ai-site/src/components/hero/HeroHud.tsx`  
  Renders nav, title, subtitle, CTAs, metric cards, and scroll cue.

- `fanzhi-ai-site/src/components/hero/FloatingMetricCard.tsx`  
  Reusable HUD card component.

- `fanzhi-ai-site/src/components/hero/PointerAura.tsx`  
  Renders pointer glow and click ripple overlays.

- `fanzhi-ai-site/src/hooks/usePointerParallax.ts`  
  Tracks normalized pointer coordinates, reduced-motion, mobile capability, and click ripple state.

- `fanzhi-ai-site/src/data/siteContent.ts`  
  Centralizes nav labels, hero copy, metrics, service tracks, capability labels, and scenario placeholders.

- `fanzhi-ai-site/src/styles/hero.css`  
  Hero-specific styles: glitch title, HUD frames, scanlines, cockpit masks, responsive behavior.

Modify:

- `fanzhi-ai-site/src/App.tsx`  
  Import the new hero and site content; remove inline hero implementation and old image references from scenario placeholders.

- `fanzhi-ai-site/src/index.css`  
  Import hero CSS and keep global reset/theme.

- `fanzhi-ai-site/package.json`  
  Add test/visual tooling only if needed.

Potentially delete later:

- `fanzhi-ai-site/src/App.css` if unused.

## Implementation Phases

### Phase 1: Content And Structure Refactor

**Purpose:** Make the current page easier to evolve before adding heavy visuals.

**Files:**

- Create: `fanzhi-ai-site/src/data/siteContent.ts`
- Create: `fanzhi-ai-site/src/components/hero/HeroCockpit.tsx`
- Create: `fanzhi-ai-site/src/components/hero/HeroHud.tsx`
- Create: `fanzhi-ai-site/src/components/hero/FloatingMetricCard.tsx`
- Modify: `fanzhi-ai-site/src/App.tsx`

- [ ] **Step 1: Create centralized content**

Create `fanzhi-ai-site/src/data/siteContent.ts`:

```ts
import {
  BrainCircuit,
  ChartNoAxesCombined,
  DatabaseZap,
  GraduationCap,
  MessagesSquare,
  Workflow,
} from 'lucide-react'

export const navItems = [
  { label: '咨询', href: '#consulting' },
  { label: '培训', href: '#training' },
  { label: '落地', href: '#delivery' },
  { label: '案例', href: '#cases' },
  { label: '联系', href: '#contact' },
]

export const heroContent = {
  eyebrow: 'AI CONSULTING / TRAINING / AGENT DELIVERY',
  title: ['ENTERPRISE', 'AI COCKPIT'],
  subtitle: '帮助中小企业把 AI 从概念变成可运行的业务系统。',
  primaryCta: '预约 AI 诊断',
  secondaryCta: '查看落地场景',
}

export const heroMetrics = [
  { value: '12+', label: '可落地业务场景', x: 74, y: 28, strength: 1.1 },
  { value: '3', label: '阶段落地路径', x: 78, y: 55, strength: 0.85 },
  { value: 'AI', label: '咨询 / 培训 / Agent', x: 12, y: 58, strength: 0.65 },
  { value: 'KB', label: '知识库 / SOP / 自动化', x: 18, y: 34, strength: 0.9 },
]

export const serviceTracks = [
  {
    title: 'AI 诊断咨询',
    subtitle: '先找到值得做的地方',
    body: '进入企业真实业务场景，梳理重复劳动、知识断层、客户响应和管理协作中的高价值 AI 机会。',
    icon: BrainCircuit,
  },
  {
    title: '企业 AI 培训',
    subtitle: '让老板和团队听得懂、用得上',
    body: '围绕管理、销售、客服、运营、行政等岗位设计训练内容，帮助团队形成共同的 AI 工作语言。',
    icon: GraduationCap,
  },
  {
    title: 'Agent 开发与陪跑',
    subtitle: '把方案做成可运行系统',
    body: '搭建企业知识库、业务 Agent 和自动化工作流，从试点上线到持续调优，陪团队真正跑起来。',
    icon: Workflow,
  },
]

export const capabilities = [
  'AI 咨询诊断',
  '老板 AI 战略课',
  '员工实战训练',
  '销售跟进 Agent',
  '客服问答 Agent',
  '企业知识库',
  'SOP 自动化',
  '私域运营助手',
  '数据分析助理',
  '内容生产流程',
  '管理制度问答',
  '落地陪跑优化',
]

export const scenarios = [
  {
    title: '销售跟进 Agent',
    label: '增长场景',
    icon: ChartNoAxesCombined,
    visual: 'sales-agent',
    points: ['自动整理客户资料', '生成跟进话术', '提醒下一步动作'],
  },
  {
    title: '企业知识库问答',
    label: '组织效率',
    icon: DatabaseZap,
    visual: 'knowledge-base',
    points: ['沉淀制度与 SOP', '新人快速查询', '减少重复沟通'],
  },
  {
    title: 'AI 客服与运营助手',
    label: '服务提效',
    icon: MessagesSquare,
    visual: 'service-agent',
    points: ['回答高频问题', '识别客户意向', '辅助私域运营'],
  },
]
```

- [ ] **Step 2: Create the metric card**

Create `fanzhi-ai-site/src/components/hero/FloatingMetricCard.tsx`:

```tsx
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
```

- [ ] **Step 3: Create the HUD layer**

Create `fanzhi-ai-site/src/components/hero/HeroHud.tsx`:

```tsx
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
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
        <a className="hero-brand" href="#" aria-label="泛知科技首页">
          <span className="hero-brand-mark">FZ</span>
          <span>FANZHI AI</span>
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
```

- [ ] **Step 4: Create the hero container shell**

Create `fanzhi-ai-site/src/components/hero/HeroCockpit.tsx`:

```tsx
import { HeroHud } from './HeroHud'

export function HeroCockpit() {
  const neutralParallax = { x: 0, y: 0 }

  function handlePrimaryClick() {
    // Click ripple will be wired in Phase 3.
  }

  return (
    <section className="hero-cockpit" aria-label="泛知科技企业 AI 经营舱">
      <div className="hero-cockpit-fallback" aria-hidden="true" />
      <HeroHud parallax={neutralParallax} onPrimaryClick={handlePrimaryClick} />
    </section>
  )
}
```

- [ ] **Step 5: Replace the old hero entry**

Modify `fanzhi-ai-site/src/App.tsx`:

```tsx
import { HeroCockpit } from './components/hero/HeroCockpit'
import './index.css'

function App() {
  return (
    <main className="min-h-screen overflow-x-clip bg-ink font-body">
      <HeroCockpit />
      {/* Keep the existing sections below the hero for now. Reconnect them in later tasks. */}
    </main>
  )
}

export default App
```

When applying this step for real, preserve the existing `CapabilityMarquee`, `Method`, `Services`, `Scenarios`, `Contact`, and `footer` components below `<HeroCockpit />`.

- [ ] **Step 6: Run verification**

Run:

```bash
cd /Users/edward/Downloads/企业AI服务/企业案例/泛知科技/fanzhi-ai-site
npm run build
npm run lint
```

Expected:

```text
npm run build exits 0
npm run lint exits 0
```

### Phase 2: Hero Visual Styling

**Purpose:** Make the DOM/HUD shell visually match the confirmed “Enterprise AI Cockpit” direction before adding Canvas animation.

**Files:**

- Create: `fanzhi-ai-site/src/styles/hero.css`
- Modify: `fanzhi-ai-site/src/index.css`

- [ ] **Step 1: Add hero CSS import**

Modify `fanzhi-ai-site/src/index.css` after Tailwind imports:

```css
@import './styles/hero.css';
```

- [ ] **Step 2: Create hero styling**

Create `fanzhi-ai-site/src/styles/hero.css`:

```css
.hero-cockpit {
  position: relative;
  min-height: 100svh;
  overflow: hidden;
  background:
    radial-gradient(circle at 52% 36%, rgba(94, 234, 212, 0.18), transparent 28%),
    radial-gradient(circle at 80% 78%, rgba(255, 59, 87, 0.12), transparent 30%),
    linear-gradient(180deg, #020617 0%, #07111f 100%);
  color: #e5faff;
}

.hero-cockpit::before {
  position: absolute;
  inset: 0;
  content: '';
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.055) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: radial-gradient(circle at 50% 46%, black, transparent 78%);
}

.hero-cockpit::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background: repeating-linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.035) 0 1px,
    transparent 1px 5px
  );
  opacity: 0.22;
  mix-blend-mode: screen;
}

.hero-cockpit-fallback {
  position: absolute;
  left: 50%;
  top: 47%;
  width: min(42vw, 34rem);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(94, 234, 212, 0.38);
  border-radius: 999px;
  box-shadow:
    0 0 90px rgba(94, 234, 212, 0.18),
    inset 0 0 56px rgba(94, 234, 212, 0.08);
}

.hero-cockpit-fallback::before,
.hero-cockpit-fallback::after {
  position: absolute;
  content: '';
  border-radius: 999px;
}

.hero-cockpit-fallback::before {
  inset: 13%;
  border: 1px dashed rgba(56, 189, 248, 0.34);
  animation: cockpit-spin 28s linear infinite;
}

.hero-cockpit-fallback::after {
  inset: 38%;
  background: rgba(94, 234, 212, 0.22);
  box-shadow: 0 0 42px rgba(94, 234, 212, 0.56);
}

.hero-hud {
  position: relative;
  z-index: 5;
  min-height: 100svh;
  padding: 1.25rem clamp(1.25rem, 4vw, 4rem) 2rem;
}

.hero-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto;
  max-width: 88rem;
  border: 1px solid rgba(226, 232, 240, 0.12);
  border-radius: 999px;
  background: rgba(2, 6, 23, 0.58);
  padding: 0.75rem 1rem;
  backdrop-filter: blur(20px);
}

.hero-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #e5faff;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.24em;
  text-decoration: none;
}

.hero-brand-mark {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  place-items: center;
  border: 1px solid rgba(94, 234, 212, 0.36);
  border-radius: 999px;
  background: rgba(94, 234, 212, 0.12);
  color: #5eead4;
  letter-spacing: 0;
}

.hero-nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 999px;
  background: rgba(226, 232, 240, 0.055);
  padding: 0.25rem;
}

.hero-nav-links a {
  border-radius: 999px;
  color: rgba(226, 232, 240, 0.7);
  font-size: 0.78rem;
  font-weight: 800;
  padding: 0.65rem 1rem;
  text-decoration: none;
  transition: background 160ms ease, color 160ms ease;
}

.hero-nav-links a:hover {
  background: rgba(226, 232, 240, 0.1);
  color: #ffffff;
}

.hero-eyebrow {
  position: absolute;
  left: clamp(1.25rem, 4vw, 4rem);
  top: 8.5rem;
  max-width: 18rem;
  color: rgba(226, 232, 240, 0.62);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.24em;
  line-height: 1.6;
}

.hero-cockpit-title {
  position: absolute;
  left: 50%;
  top: 45%;
  width: min(92vw, 76rem);
  transform: translate(-50%, -50%);
  margin: 0;
  text-align: center;
  font-size: clamp(4rem, 12vw, 12rem);
  font-weight: 950;
  letter-spacing: 0;
  line-height: 0.84;
  text-transform: uppercase;
}

.hero-cockpit-title span {
  position: relative;
  display: block;
  background: linear-gradient(180deg, #ffffff 0%, #bdeeff 42%, #5eead4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 44px rgba(94, 234, 212, 0.18);
}

.hero-cockpit-title span::before,
.hero-cockpit-title span::after {
  position: absolute;
  inset: 0;
  content: attr(data-text);
  opacity: 0.18;
  mix-blend-mode: screen;
  pointer-events: none;
}

.hero-cockpit-title span::before {
  color: #ff3b57;
  transform: translate(-0.035em, 0.016em);
}

.hero-cockpit-title span::after {
  color: #38bdf8;
  transform: translate(0.035em, -0.012em);
}

.hero-copy-panel {
  position: absolute;
  left: clamp(1.25rem, 4vw, 4rem);
  bottom: clamp(2rem, 7vw, 5rem);
  max-width: 28rem;
}

.hero-copy-panel p {
  margin: 0;
  color: rgba(226, 232, 240, 0.78);
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 650;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.hero-primary-btn,
.hero-secondary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border-radius: 999px;
  min-height: 3rem;
  padding: 0 1.25rem;
  font-size: 0.86rem;
  font-weight: 950;
  text-decoration: none;
}

.hero-primary-btn {
  background: #5eead4;
  color: #03131c;
  box-shadow: 0 0 42px rgba(94, 234, 212, 0.28);
}

.hero-secondary-btn {
  border: 1px solid rgba(226, 232, 240, 0.16);
  color: rgba(226, 232, 240, 0.8);
  background: rgba(226, 232, 240, 0.055);
}

.hero-metrics {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-metric-card {
  position: absolute;
  min-width: 9.8rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 1.1rem;
  background: rgba(2, 6, 23, 0.68);
  padding: 0.85rem 1rem;
  backdrop-filter: blur(18px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.hero-metric-card span {
  display: block;
  color: #5eead4;
  font-size: 1.35rem;
  font-weight: 950;
  line-height: 1;
}

.hero-metric-card p {
  margin: 0.4rem 0 0;
  color: rgba(226, 232, 240, 0.68);
  font-size: 0.72rem;
  font-weight: 850;
}

.hero-scroll-cue {
  position: absolute;
  right: clamp(1.25rem, 4vw, 4rem);
  bottom: clamp(2rem, 7vw, 5rem);
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 1px solid rgba(94, 234, 212, 0.28);
  border-radius: 999px;
  color: #5eead4;
  background: rgba(2, 6, 23, 0.58);
  text-decoration: none;
}

@keyframes cockpit-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 760px) {
  .hero-hud {
    padding: 0.75rem 1rem 1.5rem;
  }

  .hero-nav {
    padding: 0.55rem 0.65rem;
  }

  .hero-brand span:last-child {
    display: none;
  }

  .hero-nav-links a {
    padding: 0.55rem 0.65rem;
    font-size: 0.72rem;
  }

  .hero-eyebrow {
    top: 6.2rem;
    left: 1.1rem;
    right: 1.1rem;
    max-width: 16rem;
  }

  .hero-cockpit-fallback {
    top: 38%;
    width: min(74vw, 18rem);
  }

  .hero-cockpit-title {
    top: 39%;
    font-size: clamp(3.2rem, 18vw, 5rem);
  }

  .hero-copy-panel {
    left: 1rem;
    right: 1rem;
    bottom: 4.75rem;
    max-width: none;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-primary-btn,
  .hero-secondary-btn {
    width: 100%;
  }

  .hero-metric-card {
    display: none;
  }

  .hero-scroll-cue {
    right: 1rem;
    bottom: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-cockpit-fallback::before {
    animation: none;
  }
}
```

- [ ] **Step 3: Run visual check**

Run:

```bash
cd /Users/edward/Downloads/企业AI服务/企业案例/泛知科技/fanzhi-ai-site
npm run build
npm run lint
```

Expected:

```text
Both commands exit 0.
Hero shows no old logo/photo assets.
```

### Phase 3: Pointer Parallax And Click Feedback

**Purpose:** Add the “tracking user metrics / mouse-following / clickable system” feel.

**Files:**

- Create: `fanzhi-ai-site/src/hooks/usePointerParallax.ts`
- Create: `fanzhi-ai-site/src/components/hero/PointerAura.tsx`
- Modify: `fanzhi-ai-site/src/components/hero/HeroCockpit.tsx`

- [ ] **Step 1: Create pointer hook**

Create `fanzhi-ai-site/src/hooks/usePointerParallax.ts`:

```ts
import { useEffect, useMemo, useState } from 'react'

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

  return useMemo(
    () => ({
      pointer,
      ripples,
      reducedMotion,
      handlePointerMove,
      handlePointerLeave,
      addRipple,
    }),
    [pointer, ripples, reducedMotion],
  )
}
```

- [ ] **Step 2: Create pointer aura**

Create `fanzhi-ai-site/src/components/hero/PointerAura.tsx`:

```tsx
import { motion } from 'framer-motion'
import type { Ripple } from '../../hooks/usePointerParallax'

type PointerAuraProps = {
  x: number
  y: number
  ripples: Ripple[]
  disabled: boolean
}

export function PointerAura({ x, y, ripples, disabled }: PointerAuraProps) {
  if (disabled) return null

  return (
    <div className="pointer-layer" aria-hidden="true">
      <motion.div
        className="pointer-aura"
        style={{ x, y }}
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
```

- [ ] **Step 3: Add CSS for pointer effects**

Append to `fanzhi-ai-site/src/styles/hero.css`:

```css
.pointer-layer {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}

.pointer-aura {
  position: absolute;
  left: 0;
  top: 0;
  width: 18rem;
  height: 18rem;
  margin-left: -9rem;
  margin-top: -9rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(94, 234, 212, 0.2), rgba(94, 234, 212, 0.05) 38%, transparent 68%);
  mix-blend-mode: screen;
  filter: blur(2px);
}

.pointer-ripple {
  position: absolute;
  width: 28rem;
  height: 28rem;
  margin-left: -14rem;
  margin-top: -14rem;
  border: 1px solid rgba(94, 234, 212, 0.5);
  border-radius: 999px;
  box-shadow: 0 0 34px rgba(94, 234, 212, 0.22);
}

@media (max-width: 760px) {
  .pointer-layer {
    display: none;
  }
}
```

- [ ] **Step 4: Wire pointer into hero**

Modify `fanzhi-ai-site/src/components/hero/HeroCockpit.tsx`:

```tsx
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
      aria-label="泛知科技企业 AI 经营舱"
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
```

Note: `CockpitCanvas` is created in Phase 4. Until then, temporarily remove its import and JSX if implementing phases strictly one at a time.

### Phase 4: Canvas Cockpit Atmosphere

**Purpose:** Create the cool “future system” atmosphere without requiring a full Three.js build yet.

**Files:**

- Create: `fanzhi-ai-site/src/components/hero/CockpitCanvas.tsx`
- Modify: `fanzhi-ai-site/src/components/hero/HeroCockpit.tsx`

- [ ] **Step 1: Create Canvas component**

Create `fanzhi-ai-site/src/components/hero/CockpitCanvas.tsx`:

```tsx
import { useEffect, useRef } from 'react'

type CockpitCanvasProps = {
  parallax: { x: number; y: number }
  reducedMotion: boolean
}

type Particle = {
  x: number
  y: number
  z: number
  speed: number
}

function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random(),
    speed: 0.18 + Math.random() * 0.42,
  }))
}

export function CockpitCanvas({ parallax, reducedMotion }: CockpitCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const parallaxRef = useRef(parallax)

  useEffect(() => {
    parallaxRef.current = parallax
  }, [parallax])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    let particles: Particle[] = []
    let width = 0
    let height = 0
    let time = 0

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const mobile = width < 760
      particles = createParticles(mobile ? 90 : 180, width, height)
    }

    function drawGrid(offsetX: number, offsetY: number) {
      context.save()
      context.globalAlpha = 0.22
      context.strokeStyle = 'rgba(94, 234, 212, 0.18)'
      context.lineWidth = 1
      const gap = 38
      for (let x = -gap; x < width + gap; x += gap) {
        context.beginPath()
        context.moveTo(x + offsetX * 18, height * 0.36)
        context.lineTo(width / 2 + (x - width / 2) * 0.62 + offsetX * 8, height + 120)
        context.stroke()
      }
      for (let y = height * 0.42; y < height + gap; y += gap) {
        context.beginPath()
        context.moveTo(-40, y + offsetY * 14)
        context.lineTo(width + 40, y + offsetY * 14)
        context.stroke()
      }
      context.restore()
    }

    function drawParticles(offsetX: number, offsetY: number) {
      context.save()
      for (const particle of particles) {
        if (!reducedMotion) {
          particle.y += particle.speed
          if (particle.y > height + 10) particle.y = height * 0.35
        }
        const size = 0.8 + particle.z * 1.7
        context.globalAlpha = 0.18 + particle.z * 0.52
        context.fillStyle = particle.z > 0.72 ? '#5eead4' : '#dffcff'
        context.beginPath()
        context.arc(
          particle.x + offsetX * 24 * particle.z,
          particle.y + offsetY * 18 * particle.z,
          size,
          0,
          Math.PI * 2,
        )
        context.fill()
      }
      context.restore()
    }

    function drawLightTrail(offsetX: number, offsetY: number) {
      context.save()
      context.lineWidth = 3
      context.shadowBlur = 24
      context.shadowColor = 'rgba(94, 234, 212, 0.7)'
      const gradient = context.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, 'rgba(255, 59, 87, 0)')
      gradient.addColorStop(0.22, 'rgba(255, 59, 87, 0.85)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)')
      gradient.addColorStop(0.78, 'rgba(94, 234, 212, 0.85)')
      gradient.addColorStop(1, 'rgba(94, 234, 212, 0)')
      context.strokeStyle = gradient
      context.beginPath()
      const baseY = height * 0.68 + offsetY * 18
      context.moveTo(-80, baseY + Math.sin(time * 0.015) * 16)
      context.bezierCurveTo(
        width * 0.28,
        baseY - 90 + offsetX * 20,
        width * 0.56,
        baseY + 80 - offsetX * 16,
        width + 80,
        baseY - 28,
      )
      context.stroke()
      context.restore()
    }

    function drawCore(offsetX: number, offsetY: number) {
      const cx = width * 0.5 + offsetX * 16
      const cy = height * 0.47 + offsetY * 12
      const radius = Math.min(width, height) * 0.15

      context.save()
      context.translate(cx, cy)
      context.strokeStyle = 'rgba(94, 234, 212, 0.55)'
      context.lineWidth = 1.2
      context.shadowBlur = 34
      context.shadowColor = 'rgba(94, 234, 212, 0.36)'
      for (let i = 0; i < 4; i += 1) {
        context.beginPath()
        context.arc(0, 0, radius * (0.45 + i * 0.22), 0, Math.PI * 2)
        context.stroke()
      }
      context.rotate(time * 0.004)
      context.beginPath()
      context.arc(0, 0, radius * 0.88, -0.45, Math.PI * 0.85)
      context.strokeStyle = 'rgba(56, 189, 248, 0.82)'
      context.lineWidth = 2
      context.stroke()
      context.fillStyle = 'rgba(94, 234, 212, 0.24)'
      context.beginPath()
      context.arc(0, 0, radius * 0.22, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    function frame() {
      const { x, y } = parallaxRef.current
      time += reducedMotion ? 0 : 1
      context.clearRect(0, 0, width, height)
      drawGrid(x, y)
      drawParticles(x, y)
      drawLightTrail(x, y)
      drawCore(x, y)
      animationFrame = window.requestAnimationFrame(frame)
    }

    resize()
    frame()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className="cockpit-canvas" aria-hidden="true" />
}
```

- [ ] **Step 2: Add canvas CSS**

Append to `fanzhi-ai-site/src/styles/hero.css`:

```css
.cockpit-canvas {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
}
```

- [ ] **Step 3: Wire Canvas into `HeroCockpit`**

Ensure `fanzhi-ai-site/src/components/hero/HeroCockpit.tsx` contains:

```tsx
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
      aria-label="泛知科技企业 AI 经营舱"
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
```

- [ ] **Step 4: Verify Canvas performance**

Run the dev server:

```bash
cd /Users/edward/Downloads/企业AI服务/企业案例/泛知科技/fanzhi-ai-site
npm run dev -- --host 127.0.0.1
```

Open:

```text
http://127.0.0.1:5173/
```

Expected:

- Canvas fills the hero.
- Particles and light trail animate on desktop.
- Pointer movement causes visible but restrained parallax.
- Mobile does not show metric cards and remains readable.

### Phase 5: Remove Old Asset Dependence And Rework Scenario Placeholders

**Purpose:** Make the page no longer visually depend on the mismatched old logo/door/sign materials.

**Files:**

- Modify: `fanzhi-ai-site/src/App.tsx`
- Optionally create: `fanzhi-ai-site/src/components/ScenarioVisual.tsx`

- [ ] **Step 1: Replace scenario image fields**

Use `visual` from `siteContent.ts` instead of image paths. Create a CSS/DOM visual for each placeholder:

```tsx
function ScenarioVisual({ type, title }: { type: string; title: string }) {
  return (
    <div className={`scenario-visual scenario-visual-${type}`} aria-label={title}>
      <div className="scenario-visual-grid" />
      <div className="scenario-visual-core" />
      <div className="scenario-visual-line scenario-visual-line-one" />
      <div className="scenario-visual-line scenario-visual-line-two" />
    </div>
  )
}
```

- [ ] **Step 2: Add scenario visual CSS**

Append to `fanzhi-ai-site/src/index.css` or a new component CSS file:

```css
.scenario-visual {
  position: relative;
  min-height: 22rem;
  overflow: hidden;
  border-radius: 1.5rem;
  background:
    radial-gradient(circle at 52% 45%, rgba(94, 234, 212, 0.24), transparent 28%),
    linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 0.98));
}

.scenario-visual-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(226, 232, 240, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(226, 232, 240, 0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(circle at 50% 50%, black, transparent 78%);
}

.scenario-visual-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 9rem;
  height: 9rem;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(94, 234, 212, 0.45);
  border-radius: 999px;
  box-shadow: 0 0 60px rgba(94, 234, 212, 0.2);
}

.scenario-visual-line {
  position: absolute;
  left: 12%;
  right: 12%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(94, 234, 212, 0.8), transparent);
  box-shadow: 0 0 22px rgba(94, 234, 212, 0.42);
}

.scenario-visual-line-one {
  top: 38%;
  transform: rotate(-8deg);
}

.scenario-visual-line-two {
  top: 62%;
  transform: rotate(7deg);
}
```

- [ ] **Step 3: Verify old assets are not used in rendered components**

Run:

```bash
cd /Users/edward/Downloads/企业AI服务/企业案例/泛知科技/fanzhi-ai-site
rg -n "/brand|office-|sign.png|logo.png" src
```

Expected:

```text
No output, or only references in deliberately unused legacy files.
```

### Phase 6: QA, Browser Screenshots, And Polish

**Purpose:** Make sure the new hero is usable, readable, performant, and aligned with the design spec.

**Files:**

- Create screenshots in project root or `fanzhi-ai-site/qa/`.
- Modify CSS/components based on findings.

- [ ] **Step 1: Build and lint**

Run:

```bash
cd /Users/edward/Downloads/企业AI服务/企业案例/泛知科技/fanzhi-ai-site
npm run build
npm run lint
```

Expected:

```text
Both commands exit 0.
```

- [ ] **Step 2: Capture desktop screenshot**

Use Chrome/Playwright or the in-app browser. With Playwright:

```js
const { chromium } = await import('playwright')
const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
})
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.screenshot({ path: 'fanzhi-ai-site/qa/desktop-hero.png', fullPage: false })
await browser.close()
```

Expected:

- Hero reads as a futuristic AI cockpit.
- Title and CTA are legible.
- No old company photos appear in first viewport.

- [ ] **Step 3: Capture mobile screenshot**

Use viewport `390x900`.

Expected:

- Title does not overflow.
- CTA buttons fit.
- No metric cards overlap the headline.
- Canvas atmosphere is present but not noisy.

- [ ] **Step 4: Manual interaction test**

In browser:

1. Move mouse across hero.
2. Click around the center.
3. Click primary CTA.
4. Scroll into next section.

Expected:

- Pointer aura follows smoothly.
- Click ripple appears and disappears.
- CTA navigates to contact.
- Scroll transition feels natural.

- [ ] **Step 5: Reduced motion test**

Temporarily enable reduced motion in browser/OS, or emulate via devtools.

Expected:

- Canvas still renders a stable atmosphere.
- Continuous spin/parallax is reduced or disabled.
- Page remains readable.

## Recommended Development Strategy

Use two implementation passes:

1. **Pass A: Canvas/DOM MVP**
   Implement this plan exactly. It should already feel much closer to Remix/Sazabi without the complexity of full 3D.

2. **Pass B: Optional Three.js Upgrade**
   If MVP still lacks depth, add `three` and `@react-three/fiber` for a true particle terrain. Do this only after the MVP is reviewed, because the main creative risk is direction, not technology.

## GitHub Recommendation

GitHub is strongly recommended before implementation if this project will continue beyond a prototype.

Benefits:

- Safe checkpoints before visual experiments.
- Easier to compare versions.
- Easier deployment later through Vercel/Netlify.
- Cleaner review when swapping real cases and brand assets.

If no GitHub repository is available yet, initialize local git before implementation:

```bash
cd /Users/edward/Downloads/企业AI服务/企业案例/泛知科技
git init
printf ".superpowers/\\nfanzhi-ai-site/node_modules/\\nfanzhi-ai-site/dist/\\n" >> .gitignore
git add docs fanzhi-ai-site/package.json fanzhi-ai-site/package-lock.json fanzhi-ai-site/src fanzhi-ai-site/index.html fanzhi-ai-site/tailwind.config.js fanzhi-ai-site/postcss.config.js fanzhi-ai-site/vite.config.ts fanzhi-ai-site/tsconfig*.json
git commit -m "chore: initialize fanzhi ai site"
```

If you provide a GitHub repository, add it:

```bash
git remote add origin <GITHUB_REPOSITORY_URL>
git branch -M main
git push -u origin main
```

## Risks And Mitigations

- **Risk: The page becomes too abstract.**  
  Mitigation: Keep subtitle, metrics, and CTA explicitly about AI consulting/training/Agent/knowledge base.

- **Risk: Performance drops on mobile.**  
  Mitigation: Hide metric cards on mobile, reduce particle count, disable pointer aura, respect reduced motion.

- **Risk: It looks like a game instead of a company.**  
  Mitigation: Avoid full Sazabi city/game HUD. Use cockpit as metaphor for business operation, not entertainment.

- **Risk: Visual polish takes longer than expected.**  
  Mitigation: Build the Canvas/DOM MVP first, review screenshots, then decide whether Three.js is worth it.

## Definition Of Done

- Confirmed C direction implemented in the homepage hero.
- Old logo/door/sign assets removed from the first impression.
- Mouse movement visibly drives parallax and aura.
- Click ripple feedback works.
- Canvas atmosphere renders on desktop and has mobile fallback.
- Existing service and scenario content still works.
- `npm run build` passes.
- `npm run lint` passes.
- Desktop/mobile screenshots reviewed.
