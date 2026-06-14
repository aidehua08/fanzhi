import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  CheckCircle2,
  DatabaseZap,
  GraduationCap,
  Radio,
  Sparkles,
  Workflow,
} from 'lucide-react'
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
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        },
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
