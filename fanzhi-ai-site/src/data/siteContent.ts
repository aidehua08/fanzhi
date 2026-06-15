import {
  BrainCircuit,
  ChartNoAxesCombined,
  DatabaseZap,
  GraduationCap,
  MessagesSquare,
  Workflow,
} from 'lucide-react'

export const navItems = [
  { label: '方案', href: '#consulting' },
  { label: '使命', href: '#training' },
  { label: '路径', href: '#delivery' },
  { label: '案例', href: '#cases' },
  { label: '联系', href: '#contact' },
]

export const heroContent = {
  brand: '泛知科技',
  eyebrow: 'HUMAN × AI COLLABORATION',
  title: ['携手进入', 'AI 时代'],
  subtitle: '泛知科技，为企业构建下一代智能商业能力。',
  primaryCta: '开启 AI 之旅',
  secondaryCta: '了解解决方案',
}

export const heroMetrics = [
  { value: '12+', label: '可落地业务场景', x: 73, y: 27, strength: 1.1 },
  { value: '3', label: '阶段落地路径', x: 78, y: 55, strength: 0.85 },
  { value: 'AI', label: '咨询 / 培训 / Agent', x: 12, y: 58, strength: 0.65 },
  { value: 'KB', label: '知识库 / SOP / 自动化', x: 16, y: 34, strength: 0.9 },
]

export const serviceTracks = [
  {
    title: '商业智能化咨询',
    subtitle: '从顶层思维设计企业 AI 转型路径',
    body: '围绕战略目标、业务模型、组织能力和增长瓶颈，识别最值得优先智能化的关键场景，形成清晰可执行的转型路线。',
    icon: BrainCircuit,
  },
  {
    title: 'AI 能力建设',
    subtitle: '让团队理解 AI，并能把 AI 用在业务中',
    body: '面向管理层和关键岗位建立 AI 认知、工具能力和应用方法，让企业内部形成持续使用、持续沉淀、持续迭代的智能化能力。',
    icon: GraduationCap,
  },
  {
    title: '端到端落地交付',
    subtitle: '从方案设计到系统上线，解决真实问题',
    body: '建设企业知识库、业务 Agent 和自动化工作流，把咨询、培训、开发、上线和陪跑连成完整闭环，形成客户最佳 AI 转型路径。',
    icon: Workflow,
  },
]

export const capabilities = [
  '企业级 AI 解决方案',
  '商业智能化转型',
  'AI 战略咨询',
  '知识生产力系统',
  '企业知识飞轮',
  'Agent 应用开发',
  '业务流程自动化',
  '团队 AI 赋能',
  '销售增长智能体',
  '客服运营智能化',
  '数据分析与决策',
  '端到端落地陪跑',
]

export const architecture = [
  ['STRATEGY', '从业务目标出发，定义企业 AI 转型路径'],
  ['KNOWLEDGE', '沉淀经验、流程、文档与数据，形成知识飞轮'],
  ['SOLUTION', '构建 Agent、知识库与自动化工作流'],
  ['VALUE', '持续优化使用效果，推动增长、效率与决策升级'],
]

export const services = [
  ['01', 'AI 转型战略设计', '从顶层思维出发，结合企业业务目标和组织现状，规划最适合的 AI 转型路径。'],
  ['02', '知识生产力建设', '把长期积累的业务经验、制度流程和行业知识转化为可复用、可调用的企业智能资产。'],
  ['03', '企业级 Agent 开发', '围绕销售、客服、运营、管理等关键场景，开发真正服务业务结果的 AI 应用。'],
  ['04', '团队 AI 赋能培训', '帮助管理层和业务团队建立 AI 认知、使用能力和落地方法，让变革在组织内部发生。'],
  ['05', '端到端落地陪跑', '从咨询、方案、开发到上线运营持续跟进，形成客户最佳 AI 转型路径。'],
]

export const scenarios = [
  {
    title: '销售增长智能体',
    label: '业务增长',
    icon: ChartNoAxesCombined,
    visual: 'sales-agent',
    points: ['识别客户意向', '生成跟进策略', '提升销售转化效率'],
  },
  {
    title: '知识生产力平台',
    label: '知识飞轮',
    icon: DatabaseZap,
    visual: 'knowledge-base',
    points: ['沉淀业务知识', '复用组织经验', '形成智能化工作方式'],
  },
  {
    title: '客服与运营智能化',
    label: '服务升级',
    icon: MessagesSquare,
    visual: 'service-agent',
    points: ['提升响应效率', '优化客户体验', '辅助运营决策'],
  },
]
