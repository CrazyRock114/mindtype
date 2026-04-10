import { MBTIType, MBTIQuestion } from '@/types';

export const mbtiTypes: Record<string, MBTIType> = {
  INTJ: {
    type: 'INTJ',
    name: '建筑师',
    role: '深谋远虑的战略家',
    description: '富有想象力和战略性的思想家，一切都在他们的计划之中。',
    strengths: ['独立思考', '战略眼光', '追求完美', '高效执行'],
    weaknesses: ['过于挑剔', '情感表达困难', '不善于团队协作'],
    careers: ['战略顾问', '数据科学家', '律师', '软件架构师'],
    relationships: '在亲密关系中谨慎而忠诚，需要伴侣理解其对独处的需求。',
    color: '#8b5cf6'
  },
  INTP: {
    type: 'INTP',
    name: '逻辑学家',
    role: '抽象思维的思想家',
    description: '用创新精神解决棘手问题的发明家。',
    strengths: ['逻辑分析', '创造力', '客观理性', '求知欲强'],
    weaknesses: ['社交笨拙', '拖延症', '忽视细节'],
    careers: ['哲学家', '研究员', '大学教授', '金融分析师'],
    relationships: '渴望深度的智力连接，但在表达情感方面需要学习。',
    color: '#06b6d4'
  },
  ENTJ: {
    type: 'ENTJ',
    name: '指挥官',
    role: '大胆果断的领导力',
    description: '魅力四射、充满自信的领导力，拥有将愿景变为现实的决断力。',
    strengths: ['领导力强', '决策果断', '自信乐观', '善于激励'],
    weaknesses: ['傲慢', '缺乏耐心', '可能显得强硬'],
    careers: ['CEO', '律师', '管理咨询', '企业家'],
    relationships: '在关系中直接而诚实，需要能跟上其节奏的伴侣。',
    color: '#f59e0b'
  },
  ENTP: {
    type: 'ENTP',
    name: '辩论家',
    role: '聪明好奇的发明家',
    description: '永不满足于现状的聪明发明家，充满无限创意的头脑。',
    strengths: ['创新能力', '沟通能力', '适应力强', '多才多艺'],
    weaknesses: ['好争辩', '三分钟热度', '忽视规则'],
    careers: ['律师', '营销策划', '创业者', '记者'],
    relationships: '享受有趣的辩论和智识刺激，需要能接住其脑洞的伴侣。',
    color: '#ec4899'
  },
  INFJ: {
    type: 'INFJ',
    name: '提倡者',
    role: '安静而坚定的理想主义者',
    description: '安静而有感染力的理想主义者，致力于让世界变得更美好。',
    strengths: ['同理心强', '有洞察力', '理想主义', '创造力'],
    weaknesses: ['过于理想化', '不善于拒绝', '自我封闭'],
    careers: ['心理咨询师', '社会工作者', '作家', '非营利组织'],
    relationships: '寻求深度连接，对虚伪敏感，需要能理解其内心世界的伴侣。',
    color: '#10b981'
  },
  INFP: {
    type: 'INFP',
    name: '调停者',
    role: '诗意善良的梦想家',
    description: '诗意而善良的理想主义者，渴望创意的自由和深度连接。',
    strengths: ['同理心', '创造力', '理想主义', '适应力'],
    weaknesses: ['过于理想化', '情感脆弱', '优柔寡断'],
    careers: ['作家', '艺术家', '心理咨询师', '教师'],
    relationships: '在关系中寻找灵魂伴侣，需要时间和空间来表达内心。',
    color: '#a855f7'
  },
  ENFJ: {
    type: 'ENFJ',
    name: '主人公',
    role: '富有感染力的领导者',
    description: '魅力超凡的天生领导者，能够激励他人实现共同理想。',
    strengths: ['感染力强', '有责任感', '善于沟通', '利他主义'],
    weaknesses: ['过于理想化', '取悦他人', '控制欲'],
    careers: ['教师', 'HR', '政治家', '培训师'],
    relationships: '在关系中热情而投入，需要感受到被需要和欣赏。',
    color: '#f97316'
  },
  ENFP: {
    type: 'ENFP',
    name: '竞选者',
    role: '充满热情的创意者',
    description: '热情洋溢的创意者，与生俱来的乐观和好奇心。',
    strengths: ['热情洋溢', '创意无限', '社交能力强', '洞察力'],
    weaknesses: ['注意力分散', '情绪化', '难以专注'],
    careers: ['营销', '广告', '记者', '活动策划'],
    relationships: '在关系中充满热情和浪漫，需要能与其一起探索生活的伴侣。',
    color: '#ef4444'
  },
  ISTJ: {
    type: 'ISTJ',
    name: '物流师',
    role: '务实可靠的传统守护者',
    description: '值得信赖的可靠成员，脚踏实地，注重事实。',
    strengths: ['责任感强', '可靠', '务实', '有组织'],
    weaknesses: ['不够灵活', '难以接受批评', '不善表达'],
    careers: ['会计', '审计', '公务员', '军事'],
    relationships: '在关系中忠诚而稳定，用行动而非言语表达爱意。',
    color: '#3b82f6'
  },
  ISFJ: {
    type: 'ISFJ',
    name: '守护者',
    role: '温暖体贴的照顾者',
    description: '可靠而温暖的照顾者，无私奉献，不求回报。',
    strengths: ['体贴', '有责任感', '勤奋', '忠诚'],
    weaknesses: ['自我牺牲', '回避冲突', '不善于表达需求'],
    careers: ['护士', '行政', '图书管理员', '社工'],
    relationships: '用无微不至的关怀表达爱，需要感受到自己的付出被珍惜。',
    color: '#14b8a6'
  },
  ESTJ: {
    type: 'ESTJ',
    name: '总经理',
    role: '果断高效的执行者',
    description: '优秀的组织者，专注于建立和执行规则。',
    strengths: ['领导力', '高效', '诚实', '有组织'],
    weaknesses: ['缺乏弹性', '传统主义', '不够包容'],
    careers: ['管理者', '军官', '法官', '财务主管'],
    relationships: '在关系中传统而稳定，需要秩序和尊重。',
    color: '#eab308'
  },
  ESFJ: {
    type: 'ESFJ',
    name: '执政官',
    role: '热情洋溢的给予者',
    description: '热心的社会活动家，总是乐于助人，营造和谐氛围。',
    strengths: ['善于社交', '有责任感', '善解人意', '受欢迎'],
    weaknesses: ['过于在意他人看法', '回避冲突', '过度工作'],
    careers: ['护士', '教师', '销售', '人力资源'],
    relationships: '在关系中付出型，需要感受到被认可和感激。',
    color: '#f472b6'
  },
  ISTP: {
    type: 'ISTP',
    name: '鉴赏家',
    role: '大胆实际的行动派',
    description: '善于发现规律和规律，运用逻辑思维解决实际问题。',
    strengths: ['理性', '动手能力强', '适应力', '冷静'],
    weaknesses: ['社交笨拙', '冒险精神', '不善于规划'],
    careers: ['工程师', '飞行员', '机械师', 'IT'],
    relationships: '在关系中需要空间和自由，用行动而非言语表达。',
    color: '#6366f1'
  },
  ISFP: {
    type: 'ISFP',
    name: '探险家',
    role: '自由奔放的艺术家',
    description: '灵活迷人的艺术家居家型，享受当下的美好。',
    strengths: ['艺术气质', '观察力', '适应力', '好奇心'],
    weaknesses: ['逃避冲突', '过度敏感', '犹豫不决'],
    careers: ['设计师', '摄影师', '厨师', '画家'],
    relationships: '在关系中浪漫而温柔，需要空间和理解。',
    color: '#8b5cf6'
  },
  ESTP: {
    type: 'ESTP',
    name: '企业家',
    role: '精力充沛的冒险家',
    description: '聪明、精力充沛的冒险家，享受与朋友共度的时光。',
    strengths: ['社交能力强', '冒险精神', '务实', '魅力四射'],
    weaknesses: ['冲动', '缺乏耐心', '风险偏好'],
    careers: ['企业家', '销售', '经纪人', '演员'],
    relationships: '在关系中充满活力和乐趣，需要刺激和新奇。',
    color: '#22c55e'
  },
  ESFP: {
    type: 'ESFP',
    name: '表演者',
    role: '自发奔放的活力源泉',
    description: '引人注目的表演者和社交明星，喜欢成为关注的中心。',
    strengths: ['魅力', '热情', '社交能力', '活在当下'],
    weaknesses: ['注意力短暂', '冲动', '不喜欢独处'],
    careers: ['演员', '主持人', '公关', '导游'],
    relationships: '在关系中热情奔放，需要伴侣陪伴和关注。',
    color: '#f43f5e'
  }
};

export const mbtiQuestions: MBTIQuestion[] = [
  // EI维度 - 4题
  {
    id: 1,
    dimension: 'EI',
    textA: '在社交聚会中，我通常是主动发起对话的人',
    textB: '我更喜欢在一旁观察，倾听他人的谈话',
    weightA: 1,
    weightB: -1
  },
  {
    id: 2,
    dimension: 'EI',
    textA: '我通过与他人交流来获得能量',
    textB: '独处是我充电的方式',
    weightA: 1,
    weightB: -1
  },
  {
    id: 3,
    dimension: 'EI',
    textA: '我喜欢同时处理多个任务或对话',
    textB: '我更喜欢专注于一件事',
    weightA: 1,
    weightB: -1
  },
  {
    id: 4,
    dimension: 'EI',
    textA: '我有很多朋友和广泛的社交圈',
    textB: '我只有少数几个亲密的朋友',
    weightA: 1,
    weightB: -1
  },
  // SN维度 - 4题
  {
    id: 5,
    dimension: 'SN',
    textA: '我更关注具体的事实和细节',
    textB: '我更关注可能性和未来的趋势',
    weightA: 1,
    weightB: -1
  },
  {
    id: 6,
    dimension: 'SN',
    textA: '我相信眼见为实',
    textB: '我相信直觉和想象力',
    weightA: 1,
    weightB: -1
  },
  {
    id: 7,
    dimension: 'SN',
    textA: '我更喜欢具体实用的想法',
    textB: '我更喜欢抽象和有创意的理论',
    weightA: 1,
    weightB: -1
  },
  {
    id: 8,
    dimension: 'SN',
    textA: '我记忆事实和数据比较在行',
    textB: '我记忆图像和联想比较在行',
    weightA: 1,
    weightB: -1
  },
  // TF维度 - 4题
  {
    id: 9,
    dimension: 'TF',
    textA: '做决定时，我更看重逻辑和客观分析',
    textB: '做决定时，我更看重人情和对他人的影响',
    weightA: 1,
    weightB: -1
  },
  {
    id: 10,
    dimension: 'TF',
    textA: '我更愿意被客观地评价',
    textB: '我更愿意被善意地理解',
    weightA: 1,
    weightB: -1
  },
  {
    id: 11,
    dimension: 'TF',
    textA: '我更关注事情是否公平合理',
    textB: '我更关注和谐与和睦',
    weightA: 1,
    weightB: -1
  },
  {
    id: 12,
    dimension: 'TF',
    textA: '我倾向于直接指出别人的错误',
    textB: '我倾向于委婉地处理冲突',
    weightA: 1,
    weightB: -1
  },
  // JP维度 - 4题
  {
    id: 13,
    dimension: 'JP',
    textA: '我更喜欢有计划有安排的生活',
    textB: '我喜欢随性而为，保持灵活',
    weightA: 1,
    weightB: -1
  },
  {
    id: 14,
    dimension: 'JP',
    textA: '我会提前完成deadline',
    textB: '我经常在最后一刻才完成',
    weightA: 1,
    weightB: -1
  },
  {
    id: 15,
    dimension: 'JP',
    textA: '我更喜欢按照清单完成任务',
    textB: '我喜欢随时调整计划',
    weightA: 1,
    weightB: -1
  },
  {
    id: 16,
    dimension: 'JP',
    textA: '我讨厌迟到和计划被打乱',
    textB: '迟到一点也没关系，计划本来就会变',
    weightA: 1,
    weightB: -1
  },
  // 扩展题目 - 12题
  {
    id: 17,
    dimension: 'EI',
    textA: '我很容易和陌生人聊起来',
    textB: '和新认识的人交谈让我感到不自在',
    weightA: 1,
    weightB: -1
  },
  {
    id: 18,
    dimension: 'SN',
    textA: '我更关心如何解决问题',
    textB: '我更关心为什么会出现这个问题',
    weightA: 1,
    weightB: -1
  },
  {
    id: 19,
    dimension: 'TF',
    textA: '我更愿意做一个有同情心的人',
    textB: '我更愿意做一个理性公正的人',
    weightA: 1,
    weightB: -1
  },
  {
    id: 20,
    dimension: 'JP',
    textA: '我认为规则是重要的，应该被遵守',
    textB: '规则是灵活的，可以根据情况调整',
    weightA: 1,
    weightB: -1
  },
  {
    id: 21,
    dimension: 'EI',
    textA: '我享受站在舞台中央的感觉',
    textB: '我更愿意在幕后工作',
    weightA: 1,
    weightB: -1
  },
  {
    id: 22,
    dimension: 'SN',
    textA: '我更喜欢一步一步按部就班地做事',
    textB: '我喜欢走捷径，找到更聪明的方法',
    weightA: 1,
    weightB: -1
  },
  {
    id: 23,
    dimension: 'TF',
    textA: '当朋友难过时，我会先安慰他',
    textB: '当朋友难过时，我会先帮他分析问题',
    weightA: 1,
    weightB: -1
  },
  {
    id: 24,
    dimension: 'JP',
    textA: '做决定时，我会权衡利弊后快速决定',
    textB: '做决定时，我会保持开放，等待更多信息',
    weightA: 1,
    weightB: -1
  },
  {
    id: 25,
    dimension: 'EI',
    textA: '我经常主动联系朋友',
    textB: '我更倾向于等待朋友联系我',
    weightA: 1,
    weightB: -1
  },
  {
    id: 26,
    dimension: 'SN',
    textA: '我是一个务实的人',
    textB: '我是一个理想主义的人',
    weightA: 1,
    weightB: -1
  },
  {
    id: 27,
    dimension: 'TF',
    textA: '我更容易被逻辑和理性说服',
    textB: '我更容易被情感和价值观说服',
    weightA: 1,
    weightB: -1
  },
  {
    id: 28,
    dimension: 'JP',
    textA: '我喜欢把事情安排得井井有条',
    textB: '我喜欢随机应变，享受惊喜',
    weightA: 1,
    weightB: -1
  }
];

export function calculateMBTI(answers: number[]): { type: string; dimensions: { EI: number; SN: number; TF: number; JP: number } } {
  const dimensions = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0
  };

  mbtiQuestions.forEach((question, index) => {
    if (answers[index] !== undefined) {
      const value = answers[index];
      if (value > 0) {
        dimensions[question.dimension] += question.weightA * Math.abs(value - 3);
      } else {
        dimensions[question.dimension] += question.weightB * Math.abs(value - 3);
      }
    }
  });

  // 归一化到 -100 ~ 100
  const maxScore = mbtiQuestions.length / 4;
  Object.keys(dimensions).forEach(key => {
    dimensions[key as keyof typeof dimensions] = Math.round((dimensions[key as keyof typeof dimensions] / maxScore) * 100);
  });

  const type = (
    (dimensions.EI > 0 ? 'E' : 'I') +
    (dimensions.SN > 0 ? 'S' : 'N') +
    (dimensions.TF > 0 ? 'T' : 'F') +
    (dimensions.JP > 0 ? 'J' : 'P')
  );

  return { type, dimensions };
}
