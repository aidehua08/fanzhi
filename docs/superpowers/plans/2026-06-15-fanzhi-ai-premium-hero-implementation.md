# Fanzhi AI Premium Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage hero into a premium “AI implementation command center” that feels like a real enterprise AI system running.

**Architecture:** Keep the existing React/Vite app and hero component boundary. Replace the old data-globe hero emphasis with a layered hero: WebGL ambience in `CockpitCanvas`, business copy and CTA in `HeroHud`, and a new `AIDemoConsole` showing diagnosis, delivery timeline, and agent queue. Use GSAP for orchestrated entrance/loop animation while keeping pointer state in refs for performance.

**Tech Stack:** React 19, TypeScript, Three.js, Framer Motion, GSAP, CSS.

---

### Task 1: Add Animation Runtime

**Files:**
- Modify: `fanzhi-ai-site/package.json`
- Modify: `fanzhi-ai-site/package-lock.json`

- [ ] **Step 1: Install GSAP**

Run:

```bash
cd fanzhi-ai-site && npm install gsap
```

Expected: `package.json` includes `gsap` in dependencies.

- [ ] **Step 2: Verify install**

Run:

```bash
cd fanzhi-ai-site && npm run build
```

Expected: TypeScript and Vite build complete.

### Task 2: Add AI Demo Console Data and Component

**Files:**
- Create: `fanzhi-ai-site/src/components/hero/AIDemoConsole.tsx`

- [ ] **Step 1: Create the console component**

Create `AIDemoConsole.tsx` with:

```tsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Bot, CheckCircle2, DatabaseZap, GraduationCap, Radio, Sparkles, Workflow } from 'lucide-react'
import gsap from 'gsap'

const diagnosisItems = [
  ['痛点输入', '销售线索跟进断层'],
  ['AI 归因', '流程缺口 / 话术不统一 / 数据未沉淀'],
  ['落地方案', '销售跟进 Agent + 话术知识库 + 培训工作坊'],
]

const deliverySteps = [
  { label: '咨询诊断', detail: '锁定高价值场景', icon: Radio },
  { label: '团队培训', detail: '管理层会判断，员工会使用', icon: GraduationCap },
  { label: 'Agent 原型', detail: '接入知识库与业务流程', icon: Bot },
  { label: '陪跑上线', detail: '持续调优，跑进现场', icon: Workflow },
]

const agentQueue = [
  ['销售助手', '生成跟进动作', 'RUNNING'],
  ['客服助手', '沉淀高频问答', 'READY'],
  ['SOP 助手', '制度检索与提醒', 'SYNC'],
]

export function AIDemoConsole() {
  const consoleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!consoleRef.current) return

    const context = gsap.context(() => {
      gsap.fromTo(
        '.ai-console-card',
        { opacity: 0, y: 22, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.08, ease: 'power3.out' },
      )

      gsap.to('.ai-console-scan', {
        xPercent: 118,
        duration: 2.8,
        repeat: -1,
        ease: 'power1.inOut',
      })

      gsap.to('.ai-console-node', {
        scale: 1.18,
        opacity: 1,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: 'sine.inOut',
      })
    }, consoleRef)

    return () => context.revert()
  }, [])

  return (
    <motion.div
      ref={consoleRef}
      className="ai-demo-console"
      initial={{ opacity: 0, y: 34, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="ai-console-shell">
        <div className="ai-console-scan" aria-hidden="true" />
        <div className="ai-console-header ai-console-card">
          <div>
            <span>AI IMPLEMENTATION COCKPIT</span>
            <strong>企业 AI 落地指挥舱</strong>
          </div>
          <div className="ai-console-live">
            <span />
            LIVE DIAGNOSIS
          </div>
        </div>

        <div className="ai-console-grid">
          <section className="ai-console-card ai-diagnosis-panel">
            <div className="ai-panel-title">
              <Sparkles className="h-4 w-4" />
              诊断流
            </div>
            <div className="diagnosis-stream">
              {diagnosisItems.map(([label, value], index) => (
                <div className="diagnosis-row" key={label}>
                  <span className="diagnosis-index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <small>{label}</small>
                    <p>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="ai-console-card ai-map-panel">
            <div className="ai-panel-title">
              <DatabaseZap className="h-4 w-4" />
              痛点地图
            </div>
            <div className="ai-map-orbit">
              {['咨询', '培训', '知识库', 'Agent', '自动化'].map((item, index) => (
                <span className={`ai-console-node node-${index + 1}`} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="ai-console-card ai-delivery-panel">
            <div className="ai-panel-title">
              <Workflow className="h-4 w-4" />
              落地路径
            </div>
            <div className="delivery-steps">
              {deliverySteps.map((step) => {
                const Icon = step.icon
                return (
                  <div className="delivery-step" key={step.label}>
                    <Icon className="h-4 w-4" />
                    <div>
                      <strong>{step.label}</strong>
                      <span>{step.detail}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="ai-console-card ai-agent-panel">
            <div className="ai-panel-title">
              <Bot className="h-4 w-4" />
              Agent 队列
            </div>
            <div className="agent-queue">
              {agentQueue.map(([name, task, status]) => (
                <div className="agent-row" key={name}>
                  <CheckCircle2 className="h-4 w-4" />
                  <div>
                    <strong>{name}</strong>
                    <span>{task}</span>
                  </div>
                  <em>{status}</em>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Run TypeScript build**

Run:

```bash
cd fanzhi-ai-site && npm run build
```

Expected: Build may fail only if CSS is not added yet? TypeScript should pass because class names do not affect build.

### Task 3: Rebuild Hero HUD

**Files:**
- Modify: `fanzhi-ai-site/src/components/hero/HeroHud.tsx`
- Modify: `fanzhi-ai-site/src/data/siteContent.ts`

- [ ] **Step 1: Update hero content**

Set `heroContent` in `siteContent.ts` to:

```ts
export const heroContent = {
  brand: '泛知科技',
  eyebrow: 'AI IMPLEMENTATION COCKPIT',
  title: ['把 AI 变成', '企业里的第二套执行系统'],
  subtitle: '从咨询诊断、团队培训，到 Agent 开发、知识库建设和落地陪跑，帮中小企业把 AI 真正跑进业务现场。',
  primaryCta: '预约 AI 诊断',
  secondaryCta: '查看落地路径',
}
```

- [ ] **Step 2: Integrate `AIDemoConsole`**

In `HeroHud.tsx`, import and render `AIDemoConsole` inside a new `.hero-command-layout` grid. Keep navigation and CTAs. Remove floating metrics from the main visual path.

- [ ] **Step 3: Run lint**

Run:

```bash
cd fanzhi-ai-site && npm run lint
```

Expected: ESLint passes.

### Task 4: Convert WebGL From Globe to Premium Ambience

**Files:**
- Modify: `fanzhi-ai-site/src/components/hero/CockpitCanvas.tsx`

- [ ] **Step 1: Replace data-globe scene**

Remove `three-globe` usage from `CockpitCanvas.tsx`. Keep Three.js renderer, camera, stars, light planes, scan beam, and pointer parallax. The visual should support the console rather than be the hero object.

- [ ] **Step 2: Verify build**

Run:

```bash
cd fanzhi-ai-site && npm run build
```

Expected: Build passes and bundle no longer imports `three-globe` from this component.

### Task 5: Premium Hero CSS

**Files:**
- Modify: `fanzhi-ai-site/src/styles/hero.css`

- [ ] **Step 1: Replace hero layout CSS**

Update `hero.css` to support:

- split desktop layout with text left and console right/center,
- glass console panels,
- system scan line,
- animated diagnosis rows,
- responsive mobile layout,
- pointer scan aura rather than large glow blob.

- [ ] **Step 2: Screenshot desktop and mobile**

Run Playwright against `http://127.0.0.1:5173/` and save:

```text
fanzhi-ai-site/qa-premium-hero-desktop.png
fanzhi-ai-site/qa-premium-hero-mobile.png
```

Expected: Desktop looks like a real AI command center. Mobile has no overlap and keeps CTA visible.

### Task 6: Final Verification and Commit

**Files:**
- All changed implementation files.

- [ ] **Step 1: Run full verification**

Run:

```bash
cd fanzhi-ai-site && npm run build && npm run lint
```

Expected: Both commands pass.

- [ ] **Step 2: Commit**

Run:

```bash
git add fanzhi-ai-site docs/superpowers/plans/2026-06-15-fanzhi-ai-premium-hero-implementation.md
git commit -m "feat: rebuild premium ai hero"
```

Expected: Commit created locally. Push if GitHub network is available.
