import { Industry } from '@/types';

export const industries: Industry[] = [
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
    ]
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
    ]
  },
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
    comingSoon: true
  },
  {
    id: 'education',
    name: '教育培训',
    nameEn: 'Education & Training',
    icon: '📚',
    description: '教师、培训师、教育科技，用知识照亮他人的蜡烛精神。',
    popularTypes: ['ENFJ', 'INFP', 'ESFJ', 'ISFJ'],
    features: [
      '稳定的社会地位',
      '寒暑假等福利',
      '需要耐心和同理心',
      '使命感强，成就感高'
    ],
    comingSoon: true
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
    comingSoon: true
  },
  {
    id: 'law',
    name: '法律合规',
    nameEn: 'Law & Compliance',
    icon: '⚖️',
    description: '律师、法务、合规专家，维护公平正义的守护者。',
    popularTypes: ['INTJ', 'ESTJ', 'ENTJ', 'ISTJ'],
    features: [
      '专业壁垒高',
      '收入可观',
      '需要持续学习',
      '逻辑思维要求高'
    ],
    comingSoon: true
  }
];
