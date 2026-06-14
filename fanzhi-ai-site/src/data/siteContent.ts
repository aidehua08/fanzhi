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
  brand: '泛知科技',
  eyebrow: 'AI IMPLEMENTATION COCKPIT',
  title: ['把 AI 变成', '企业里的第二套', '执行系统'],
  subtitle: '从咨询诊断、团队培训，到 Agent 开发、知识库建设和落地陪跑，帮中小企业把 AI 真正跑进业务现场。',
  primaryCta: '预约 AI 诊断',
  secondaryCta: '查看落地路径',
}

export const heroMetrics = [
  { value: '12+', label: '可落地业务场景', x: 73, y: 27, strength: 1.1 },
  { value: '3', label: '阶段落地路径', x: 78, y: 55, strength: 0.85 },
  { value: 'AI', label: '咨询 / 培训 / Agent', x: 12, y: 58, strength: 0.65 },
  { value: 'KB', label: '知识库 / SOP / 自动化', x: 16, y: 34, strength: 0.9 },
]

export const serviceTracks = [
  {
    title: 'AI 诊断咨询',
    subtitle: '先找到最值得被 AI 改造的业务入口',
    body: '从经营目标、利润结构和团队协作开始，筛出重复劳动、知识断层、客户响应和管理决策里的高价值场景。',
    icon: BrainCircuit,
  },
  {
    title: '企业 AI 培训',
    subtitle: '让管理层会判断，让团队会使用',
    body: '围绕老板、销售、客服、运营、行政等岗位设计实战训练，把 AI 变成团队共同语言，而不是少数人的新玩具。',
    icon: GraduationCap,
  },
  {
    title: 'Agent 开发与陪跑',
    subtitle: '把想法接进流程，做成可运行系统',
    body: '搭建企业知识库、业务 Agent 和自动化工作流，从试点上线到持续调优，陪团队真正跑起来。',
    icon: Workflow,
  },
]

export const capabilities = [
  '企业 AI 战略',
  '老板 AI 诊断',
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

export const architecture = [
  ['DATA', '文档 / 表格 / 客户记录 / SOP / 业务经验'],
  ['KNOWLEDGE', '清洗、切片、标注、权限、知识图谱'],
  ['AGENT', '问答、跟进、分析、生成、提醒、执行'],
  ['WORKFLOW', '销售、客服、运营、管理流程持续优化'],
]

export const services = [
  ['01', '诊断企业痛点', '从老板视角看利润、效率和交付瓶颈，筛选最先产生价值的 AI 场景。'],
  ['02', '培训关键岗位', '让管理层会判断，员工会使用，团队能把 AI 融入日常工作。'],
  ['03', '建设知识库', '把文档、经验、FAQ、制度和 SOP 变成可查询、可调用的企业知识资产。'],
  ['04', '开发业务 Agent', '围绕销售、客服、运营、行政等流程搭建可执行的 AI 助手。'],
  ['05', '陪跑上线优化', '跟进使用反馈，持续优化提示词、流程、数据和协作方式。'],
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
