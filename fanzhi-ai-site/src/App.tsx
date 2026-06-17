import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Handshake, Sparkles, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { HeroCockpit } from './components/hero/HeroCockpit'
import {
  architecture,
  capabilities,
  scenarios,
  services,
  serviceTracks,
} from './data/siteContent'
import './index.css'

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function CapabilityMarquee() {
  return (
    <section id="consulting" className="overflow-hidden bg-ink py-16 text-cloud sm:py-24">
      <div className="mb-8 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.32em] text-signal">
            企业级 AI 解决方案
          </p>
        </div>
      </div>
      {[0, 1].map((row) => (
        <div key={row} className={`marquee ${row === 1 ? 'marquee-reverse mt-4' : ''}`}>
          <div className="marquee-track">
            {[...capabilities, ...capabilities].map((item, index) => (
              <div className="marquee-tile" key={`${row}-${item}-${index}`}>
                <Sparkles className="h-5 w-5 text-signal" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

function Method() {
  return (
    <section id="training" className="relative overflow-hidden bg-ink px-5 py-24 text-cloud sm:px-8 sm:py-32">
      <div className="absolute left-1/2 top-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-signal/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="section-title max-w-5xl font-display text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-[0.9] tracking-normal">
            推动变革
            <span className="block">真正发生</span>
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeIn delay={0.1}>
            <p className="max-w-xl text-xl font-medium leading-relaxed text-cloud/76 sm:text-2xl">
              我们的使命是让 AI 技术真正服务于商业价值创造。泛知科技以业务增长为目标，把前沿 AI 能力转化为企业可使用、可沉淀、可持续迭代的解决方案。
            </p>
          </FadeIn>
          <div className="grid gap-4">
            {serviceTracks.map((track, index) => {
              const Icon = track.icon
              return (
                <FadeIn delay={index * 0.1} key={track.title}>
                  <div className="process-card">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-signal/15 text-signal">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span className="text-sm font-black text-lime">0{index + 1}</span>
                        <h3 className="text-2xl font-black text-white">{track.title}</h3>
                      </div>
                      <p className="font-bold text-signal">{track.subtitle}</p>
                      <p className="mt-3 max-w-2xl leading-relaxed text-cloud/68">{track.body}</p>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section id="delivery" className="bg-paper px-5 py-20 text-ink sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <h2 className="font-display text-[clamp(3.2rem,10vw,8.8rem)] font-black uppercase leading-none tracking-normal">
              知识飞轮
              <span className="block text-teal">驱动增长</span>
            </h2>
            <p className="max-w-xl text-xl font-medium leading-relaxed text-ink/66">
              我们懂业务，也重视长期知识积累。通过知识生产力系统，把企业经验、流程、数据和行业理解沉淀为持续进化的智能化能力。
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {architecture.map(([title, body], index) => (
            <FadeIn delay={index * 0.08} key={title}>
              <article className="architecture-card">
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-xs font-black tracking-[0.28em] text-teal">{title}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-black text-lime">
                    {index + 1}
                  </span>
                </div>
                <p className="text-lg font-black leading-snug">{body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="rounded-t-[2.5rem] bg-paper px-5 py-20 text-ink sm:px-8 sm:py-28 lg:rounded-t-[4rem]">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <h2 className="font-display text-[clamp(3.5rem,12vw,10rem)] font-black uppercase leading-none tracking-normal">
            解决方案
          </h2>
        </FadeIn>
        <div className="mt-12 divide-y divide-ink/12 border-y border-ink/12">
          {services.map(([num, title, body], index) => (
            <FadeIn delay={index * 0.05} key={title}>
              <article className="grid gap-5 py-8 sm:grid-cols-[9rem_1fr] sm:gap-8 sm:py-10 lg:grid-cols-[13rem_0.85fr_1.15fr] lg:items-center">
                <span className="font-display text-6xl font-black leading-none text-ink sm:text-7xl lg:text-8xl">
                  {num}
                </span>
                <h3 className="text-2xl font-black sm:text-3xl">{title}</h3>
                <p className="max-w-2xl text-lg leading-relaxed text-ink/62">{body}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScenarioVisual({ type, title }: { type: string; title: string }) {
  return (
    <div className={`scenario-visual scenario-visual-${type}`} aria-label={title}>
      <div className="scenario-visual-grid" />
      <div className="scenario-visual-core" />
      <div className="scenario-visual-node scenario-visual-node-a" />
      <div className="scenario-visual-node scenario-visual-node-b" />
      <div className="scenario-visual-node scenario-visual-node-c" />
      <div className="scenario-visual-line scenario-visual-line-one" />
      <div className="scenario-visual-line scenario-visual-line-two" />
    </div>
  )
}

function ScenarioCard({
  scenario,
  index,
}: {
  scenario: (typeof scenarios)[number]
  index: number
}) {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0.35 + index * 0.08, 0.7], [1, 0.94 + index * 0.015])
  const Icon = scenario.icon

  return (
    <motion.article
      style={{ scale, top: `${6 + index * 1.5}rem` }}
      className="sticky mb-10 overflow-hidden rounded-[2rem] border border-signal/20 bg-deep p-4 shadow-2xl shadow-black/30 sm:rounded-[3rem] sm:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <div className="flex min-h-[22rem] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 sm:rounded-[2.25rem] sm:p-8">
          <div>
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-6xl font-black text-lime">0{index + 1}</span>
              <div className="flex items-center gap-2 rounded-full border border-signal/20 px-4 py-2 text-sm font-bold text-signal">
                <Icon className="h-4 w-4" />
                {scenario.label}
              </div>
            </div>
            <h3 className="text-4xl font-black text-white sm:text-5xl">{scenario.title}</h3>
          </div>
          <ul className="mt-10 grid gap-3">
            {scenario.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-lg font-medium text-cloud/72">
                <ChevronRight className="h-5 w-5 text-signal" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <ScenarioVisual type={scenario.visual} title={scenario.title} />
      </div>
    </motion.article>
  )
}

function Scenarios() {
  return (
    <section id="cases" className="-mt-10 rounded-t-[2.5rem] bg-ink px-5 py-20 text-cloud sm:px-8 sm:py-28 lg:rounded-t-[4rem]">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="section-title font-display text-[clamp(3.3rem,11vw,9.5rem)] font-black uppercase leading-none tracking-normal">
              行业实践
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-cloud/68">
              我们拥有超过 100 家项目经验，覆盖多个行业与业务场景。这里先展示典型场景，后续可以替换成你的真实案例、截图和项目数据。
            </p>
          </div>
        </FadeIn>
        {scenarios.map((scenario, index) => (
          <ScenarioCard scenario={scenario} index={index} key={scenario.title} />
        ))}
      </div>
    </section>
  )
}

function Contact({ onRequestContact }: { onRequestContact: () => void }) {
  return (
    <section id="contact" className="bg-paper px-5 py-16 text-ink sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-ink/10 bg-white p-6 shadow-xl shadow-ink/5 sm:p-10 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-teal">next step</p>
          <h2 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
            准备开始你的 AI 之旅？
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/62">
            立即联系我们，获得专业的产品演示和定制化解决方案。我们会从企业现状出发，帮助你规划可执行、可落地、可持续优化的 AI 转型路径。
          </p>
        </div>
        <div className="contact-qr-card">
          <img className="contact-qr-image" src="/contact/wechat-qr.jpg" alt="泛知科技微信二维码" />
          <button
            type="button"
            onClick={onRequestContact}
            className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-deep focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2"
          >
            获得一次 AI 诊断
            <Handshake className="h-5 w-5 text-signal" />
          </button>
        </div>
      </div>
    </section>
  )
}

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <motion.div
      className="contact-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="contact-modal-backdrop" type="button" aria-label="关闭联系弹窗" onClick={onClose} />
      <motion.div
        className="contact-modal-panel"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="contact-modal-close" type="button" aria-label="关闭" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
        <div className="contact-modal-copy">
          <p>微信预约</p>
          <h2 id="contact-modal-title">获得一次 AI 诊断</h2>
          <span>
            扫码添加微信，告诉我们你的行业、团队规模和当前最想解决的业务问题。我们会帮你判断最值得优先落地的 AI 场景。
          </span>
        </div>
        <div className="contact-modal-qr-wrap">
          <img className="contact-modal-qr" src="/contact/wechat-qr.jpg" alt="泛知科技微信二维码" />
        </div>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-x-clip bg-ink font-body">
      <HeroCockpit onRequestContact={() => setIsContactOpen(true)} />
      <CapabilityMarquee />
      <Method />
      <Architecture />
      <Services />
      <Scenarios />
      <Contact onRequestContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <footer className="bg-ink px-5 py-8 text-center text-sm font-semibold text-cloud/42 sm:px-8">
        泛知科技 / 共创下一代智能商业
      </footer>
    </main>
  )
}

export default App
