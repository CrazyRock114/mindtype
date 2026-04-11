import { Industry } from '@/types';

export const industries: Industry[] = [
  // ===== 热门行业 TOP 10 =====
  {
    id: 'tech',
    name: '科技互联网',
    nameEn: 'Tech & Internet',
    icon: '💻',
    description: '程序员、产品经理、设计师聚集地，技术创新与快速迭代的战场。',
    popularTypes: ['INTJ', 'INTP', 'ENTP', 'ENTJ'],
    features: [
      '技术氛围浓厚，鼓励创新',
      '扁平化管理，平等沟通',
      '成长空间大，学习机会多',
      '工作强度较高，竞争激烈'
    ],
    hotRank: 1
  },
  {
    id: 'finance',
    name: '金融投行',
    nameEn: 'Finance & Investment',
    icon: '📊',
    description: '银行、证券、基金、投行，高压与高回报并存的金钱游戏。',
    popularTypes: ['ENTJ', 'ESTJ', 'INTJ', 'ISTJ'],
    features: [
      '薪资待遇优厚',
      '晋升体系清晰',
      '专业门槛较高',
      '工作压力大，责任重大'
    ],
    hotRank: 2
  },
  {
    id: 'consulting',
    name: '咨询管理',
    nameEn: 'Consulting',
    icon: '💼',
    description: '麦肯锡、贝恩、波士顿，为企业解决复杂问题的智囊团。',
    popularTypes: ['ENTJ', 'ENFJ', 'INTJ', 'INFJ'],
    features: [
      '接触各行业，视野开阔',
      '培养解决问题的能力',
      '出差较多，节奏快',
      '职业发展路径清晰'
    ],
    hotRank: 3
  },
  {
    id: 'marketing',
    name: '市场营销',
    nameEn: 'Marketing',
    icon: '📢',
    description: '品牌、传播、广告，用创意驱动商业增长。',
    popularTypes: ['ENFP', 'ENTP', 'ESFP', 'ENFJ'],
    features: [
      '创意空间大',
      '需要敏锐的市场洞察',
      '结果导向，KPI明确',
      '跨界合作机会多'
    ],
    hotRank: 4
  },
  {
    id: 'education',
    name: '教育培训',
    nameEn: 'Education',
    icon: '📚',
    description: '教师、培训师、教育科技，用知识照亮他人的蜡烛精神。',
    popularTypes: ['ENFJ', 'INFP', 'ESFJ', 'ISFJ'],
    features: [
      '稳定的社会地位',
      '寒暑假等福利',
      '需要耐心和同理心',
      '使命感强，成就感高'
    ],
    hotRank: 5
  },
  {
    id: 'health',
    name: '医疗健康',
    nameEn: 'Healthcare',
    icon: '🏥',
    description: '医生、护士、医疗科技，守护生命健康的神圣职业。',
    popularTypes: ['ISFJ', 'ISTJ', 'ENFJ', 'INFJ'],
    features: [
      '救死扶伤，使命感强',
      '专业性强，不可替代',
      '工作强度大',
      '职业发展路径清晰'
    ],
    hotRank: 6
  },
  {
    id: 'law',
    name: '法律合规',
    nameEn: 'Law',
    icon: '⚖️',
    description: '律师、法务、合规专家，维护公平正义的守护者。',
    popularTypes: ['INTJ', 'ESTJ', 'ENTJ', 'ISTJ'],
    features: [
      '专业壁垒高',
      '收入可观',
      '需要持续学习',
      '逻辑思维要求高'
    ],
    hotRank: 7
  },
  {
    id: 'media',
    name: '媒体传播',
    nameEn: 'Media',
    icon: '🎬',
    description: '记者、编辑、导演，用内容影响世界的媒体人。',
    popularTypes: ['ENFP', 'ENTP', 'INFP', 'INFJ'],
    features: [
      '接触前沿资讯',
      '内容创作空间大',
      '节奏快，敏感度高',
      '行业变化迅速'
    ],
    hotRank: 8
  },
  {
    id: 'realestate',
    name: '房地产建筑',
    nameEn: 'Real Estate',
    icon: '🏗️',
    description: '开发商、建筑设计、房产中介，塑造城市天际线。',
    popularTypes: ['ESTJ', 'ESFJ', 'ENTJ', 'ISTJ'],
    features: [
      '行业规模大，机会多',
      '与人打交道多',
      '周期性强，政策敏感',
      '收入与业绩挂钩'
    ],
    hotRank: 9
  },
  {
    id: 'manufacturing',
    name: '制造业',
    nameEn: 'Manufacturing',
    icon: '🏭',
    description: '生产、供应链、质量管理，实体经济的基石。',
    popularTypes: ['ISTJ', 'ESTJ', 'INTJ', 'ISFJ'],
    features: [
      '稳定性高',
      '注重流程和规范',
      '技术积累深厚',
      '转型升级中，机遇多'
    ],
    hotRank: 10
  },

  // ===== 冷门/新兴行业 TOP 10 =====
  {
    id: 'design',
    name: '设计创意',
    nameEn: 'Design & Creative',
    icon: '🎨',
    description: '平面设计、UI设计、广告创意，用创意改变世界的造梦工厂。',
    popularTypes: ['INFP', 'ENFP', 'ISFP', 'ESFP'],
    features: [
      '作品导向，能力说话',
      '创意至上，思维活跃',
      '项目制工作，时间灵活',
      '需要持续学习和灵感积累'
    ],
    comingSoon: true,
    hotRank: 11
  },
  {
    id: 'gaming',
    name: '游戏电竞',
    nameEn: 'Gaming & Esports',
    icon: '🎮',
    description: '游戏开发、赛事运营、电竞选手，新时代的娱乐产业。',
    popularTypes: ['INTP', 'ENTP', 'INFP', 'ESFP'],
    features: [
      '热爱驱动，乐趣无限',
      '行业年轻，机会平等',
      '技术迭代快，学习曲线陡',
      '需要平衡热爱与现实'
    ],
    comingSoon: true,
    hotRank: 12
  },
  {
    id: 'newenergy',
    name: '新能源',
    nameEn: 'New Energy',
    icon: '⚡',
    description: '光伏、风电、储能、电动车，双碳目标下的黄金赛道。',
    popularTypes: ['INTJ', 'ENTJ', 'ISTP', 'ESTJ'],
    features: [
      '政策支持，前景广阔',
      '技术创新密集',
      '跨界融合机会多',
      '正处于高速发展期'
    ],
    comingSoon: true,
    hotRank: 13
  },
  {
    id: 'biotech',
    name: '生物医药',
    nameEn: 'Biotech & Pharma',
    icon: '🧬',
    description: '药物研发、生物技术、医疗器械，生命科学的探索者。',
    popularTypes: ['INTJ', 'ISTJ', 'INFJ', 'ISFJ'],
    features: [
      '高门槛，高回报',
      '研发周期长',
      '需要深厚的专业积累',
      '关乎人类健康，使命感强'
    ],
    comingSoon: true,
    hotRank: 14
  },
  {
    id: 'aicloud',
    name: 'AI人工智能',
    nameEn: 'AI & Cloud',
    icon: '🤖',
    description: '大模型、算法、云计算，第四次工业革命的核心力量。',
    popularTypes: ['INTP', 'INTJ', 'ENTP', 'ISTP'],
    features: [
      '技术前沿，创新无限',
      '薪资天花板高',
      '需要持续学习',
      '改变世界的使命感'
    ],
    comingSoon: true,
    hotRank: 15
  },
  {
    id: 'culture',
    name: '文化娱乐',
    nameEn: 'Culture & Entertainment',
    icon: '🎭',
    description: '影视、音乐、演出、艺人经纪，精神消费的新时代。',
    popularTypes: ['ENFP', 'ESFP', 'INFP', 'ENTP'],
    features: [
      '创意与商业结合',
      '行业敏感度高',
      '成功偶然性大',
      '需要坚守与变通'
    ],
    comingSoon: true,
    hotRank: 16
  },
  {
    id: 'ecommerce',
    name: '电商零售',
    nameEn: 'E-commerce',
    icon: '🛒',
    description: '平台电商、直播带货、品牌电商，消费升级的主战场。',
    popularTypes: ['ENTJ', 'ESTJ', 'ENFP', 'ESFJ'],
    features: [
      '玩法迭代快',
      '数据驱动决策',
      '用户体验为核心',
      '竞争激烈，创新为王'
    ],
    comingSoon: true,
    hotRank: 17
  },
  {
    id: 'agriculture',
    name: '现代农业',
    nameEn: 'Modern Agriculture',
    icon: '🌾',
    description: '智慧农业、农产品品牌、乡村振业，一二三产融合的新机遇。',
    popularTypes: ['ISTJ', 'ESTJ', 'INTJ', 'ENFJ'],
    features: [
      '政策扶持力度大',
      '与科技结合紧密',
      '需要脚踏实地',
      '长期主义，稳健发展'
    ],
    comingSoon: true,
    hotRank: 18
  },
  {
    id: 'tourism',
    name: '旅游出行',
    nameEn: 'Tourism & Travel',
    icon: '✈️',
    description: '在线旅游、酒店、航空、出行服务，说走就走的梦想产业。',
    popularTypes: ['ENFP', 'ESFP', 'ENTP', 'ESFJ'],
    features: [
      '疫情后复苏强劲',
      '体验经济时代',
      '全球化视野',
      '服务质量是关键'
    ],
    comingSoon: true,
    hotRank: 19
  },
  {
    id: 'sports',
    name: '体育运动',
    nameEn: 'Sports',
    icon: '🏆',
    description: '职业体育、健身休闲、体育科技，健康中国的新赛道。',
    popularTypes: ['ESTP', 'ESFP', 'ENTJ', 'ENFJ'],
    features: [
      '健康意识提升',
      '政策支持体育产业',
      '需要热情与专业',
      '商业化潜力大'
    ],
    comingSoon: true,
    hotRank: 20
  }
];

// 获取热门行业（前10）
export const hotIndustries = industries.filter(i => i.hotRank && i.hotRank <= 10);

// 获取新兴/冷门行业（后10）
export const emergingIndustries = industries.filter(i => i.hotRank && i.hotRank > 10);
