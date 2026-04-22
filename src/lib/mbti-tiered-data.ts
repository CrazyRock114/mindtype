import { MBTIQuestion } from '@/types';

/**
 * MBTI 三档测试题库
 * - quick: 16题（每维度4题）——极速体验
 * - standard: 28题（每维度7题）——标准版（已有）
 * - precise: 48题（每维度12题）——深度分析
 *
 * 所有题库共享相同的计分逻辑：
 * value 1-5, 3为中立, 1=完全同意A, 5=完全同意B
 * deviation = 3 - value, 正=偏A, 负=偏B
 */

// ========== 极速版 16题 ==========
export const mbtiQuickQuestions: MBTIQuestion[] = [
  // EI 维度 4题
  {
    id: 1, dimension: 'EI',
    textA: '在社交场合中，我通常是主动开启话题的人',
    textB: '我更喜欢在角落里观察，等别人来找我',
    weightA: 1, weightB: -1,
  },
  {
    id: 2, dimension: 'EI',
    textA: '和一群人在一起让我感到 energized（充满能量）',
    textB: '独处是我恢复精力的唯一方式',
    weightA: 1, weightB: -1,
  },
  {
    id: 3, dimension: 'EI',
    textA: '我倾向于先想后说，确保每句话都经过思考',
    textB: '我倾向于边说边想，在交流中整理思路',
    weightA: -1, weightB: 1, // 注意：这里A=I, B=E
  },
  {
    id: 4, dimension: 'EI',
    textA: '我的社交圈小而深，只有几个知心朋友',
    textB: '我的社交圈大而广，认识很多人',
    weightA: -1, weightB: 1, // A=I, B=E
  },
  // SN 维度 4题
  {
    id: 5, dimension: 'SN',
    textA: '我更关注具体的事实、细节和实际经验',
    textB: '我更关注可能性、联想和未来的图景',
    weightA: 1, weightB: -1,
  },
  {
    id: 6, dimension: 'SN',
    textA: '我信任已被验证的方法和过去的经验',
    textB: '我更喜欢探索新的方式和创新的思路',
    weightA: 1, weightB: -1,
  },
  {
    id: 7, dimension: 'SN',
    textA: '我倾向于从整体上把握事物的意义和关联',
    textB: '我倾向于一步步处理具体的信息和数据',
    weightA: -1, weightB: 1, // A=N, B=S
  },
  {
    id: 8, dimension: 'SN',
    textA: '我经常沉浸在对未来的想象和「如果」中',
    textB: '我更关注当下正在发生的具体事情',
    weightA: -1, weightB: 1, // A=N, B=S
  },
  // TF 维度 4题
  {
    id: 9, dimension: 'TF',
    textA: '做决定时，我更看重逻辑、公平和客观标准',
    textB: '做决定时，我更看重人情、和谐和对人的影响',
    weightA: 1, weightB: -1,
  },
  {
    id: 10, dimension: 'TF',
    textA: '我认为批评应该直接、诚实，哪怕伤人',
    textB: '我认为批评应该委婉、体贴，维护关系优先',
    weightA: 1, weightB: -1,
  },
  {
    id: 11, dimension: 'TF',
    textA: '我更容易被他人的情绪和感受所打动',
    textB: '我更容易被事实和逻辑论证所说服',
    weightA: -1, weightB: 1, // A=F, B=T
  },
  {
    id: 12, dimension: 'TF',
    textA: '在冲突中，我优先考虑关系的修复和情感的安抚',
    textB: '在冲突中，我优先考虑问题的解决和道理的厘清',
    weightA: -1, weightB: 1, // A=F, B=T
  },
  // JP 维度 4题
  {
    id: 13, dimension: 'JP',
    textA: '我喜欢提前规划，按清单和日程执行任务',
    textB: '我喜欢保持灵活，根据当下的心情调整计划',
    weightA: 1, weightB: -1,
  },
  {
    id: 14, dimension: 'JP',
    textA: '截止日期让我感到焦虑，我倾向于提前完成',
    textB: '截止日期激发我的效率，我常在最后关头爆发',
    weightA: 1, weightB: -1,
  },
  {
    id: 15, dimension: 'JP',
    textA: '我享受即兴和惊喜，讨厌被计划束缚',
    textB: '我享受掌控感，不确定让我感到不安',
    weightA: -1, weightB: 1, // A=P, B=J
  },
  {
    id: 16, dimension: 'JP',
    textA: '我的桌面/房间通常比较随性，「乱中有序」',
    textB: '我的桌面/房间通常整洁有序，东西各归其位',
    weightA: -1, weightB: 1, // A=P, B=J
  },
];

// ========== 标准版 28题（已有题库，复用） ==========
// 从 mbti-data.ts 导入，此处不重复定义

// ========== 精准版 48题 ==========
export const mbtiPreciseQuestions: MBTIQuestion[] = [
  // ====== EI 维度 12题 ======
  {
    id: 1, dimension: 'EI',
    textA: '在社交聚会中，我通常是主动发起对话的人',
    textB: '我更喜欢在一旁观察，倾听他人的谈话',
    weightA: 1, weightB: -1,
  },
  {
    id: 2, dimension: 'EI',
    textA: '我通过与他人交流来获得能量',
    textB: '独处是我充电的方式',
    weightA: 1, weightB: -1,
  },
  {
    id: 3, dimension: 'EI',
    textA: '我喜欢同时处理多个任务或对话',
    textB: '我更喜欢专注于一件事',
    weightA: 1, weightB: -1,
  },
  {
    id: 4, dimension: 'EI',
    textA: '我有很多朋友和广泛的社交圈',
    textB: '我只有少数几个亲密的朋友',
    weightA: 1, weightB: -1,
  },
  {
    id: 5, dimension: 'EI',
    textA: '我很容易和陌生人聊起来',
    textB: '和新认识的人交谈让我感到不自在',
    weightA: 1, weightB: -1,
  },
  {
    id: 6, dimension: 'EI',
    textA: '我享受站在舞台中央的感觉',
    textB: '我更愿意在幕后工作',
    weightA: 1, weightB: -1,
  },
  {
    id: 7, dimension: 'EI',
    textA: '我经常主动联系朋友',
    textB: '我更倾向于等待朋友联系我',
    weightA: 1, weightB: -1,
  },
  {
    id: 8, dimension: 'EI',
    textA: '在团队讨论中，我倾向于先开口表达观点',
    textB: '在团队讨论中，我倾向于先听完所有人的想法',
    weightA: 1, weightB: -1,
  },
  {
    id: 9, dimension: 'EI',
    textA: '周末我更想出门参加活动、见朋友',
    textB: '周末我更想宅在家里做自己的事',
    weightA: 1, weightB: -1,
  },
  {
    id: 10, dimension: 'EI',
    textA: '别人常常觉得我很健谈、外向',
    textB: '别人常常觉得我很安静、内敛',
    weightA: 1, weightB: -1,
  },
  {
    id: 11, dimension: 'EI',
    textA: '即使在疲惫时，社交也能让我恢复活力',
    textB: '即使在开心时，社交后我也需要独处恢复',
    weightA: 1, weightB: -1,
  },
  {
    id: 12, dimension: 'EI',
    textA: '我倾向于「说出来」才能理清思路',
    textB: '我倾向于「想明白」了才会开口',
    weightA: 1, weightB: -1,
  },

  // ====== SN 维度 12题 ======
  {
    id: 13, dimension: 'SN',
    textA: '我更关注具体的事实和细节',
    textB: '我更关注可能性和未来的趋势',
    weightA: 1, weightB: -1,
  },
  {
    id: 14, dimension: 'SN',
    textA: '我相信眼见为实',
    textB: '我相信直觉和想象力',
    weightA: 1, weightB: -1,
  },
  {
    id: 15, dimension: 'SN',
    textA: '我更喜欢具体实用的想法',
    textB: '我更喜欢抽象和有创意的理论',
    weightA: 1, weightB: -1,
  },
  {
    id: 16, dimension: 'SN',
    textA: '我记忆事实和数据比较在行',
    textB: '我记忆图像和联想比较在行',
    weightA: 1, weightB: -1,
  },
  {
    id: 17, dimension: 'SN',
    textA: '我更关心如何解决问题',
    textB: '我更关心为什么会出现这个问题',
    weightA: 1, weightB: -1,
  },
  {
    id: 18, dimension: 'SN',
    textA: '我更喜欢一步一步按部就班地做事',
    textB: '我喜欢走捷径，找到更聪明的方法',
    weightA: 1, weightB: -1,
  },
  {
    id: 19, dimension: 'SN',
    textA: '我是一个务实的人',
    textB: '我是一个理想主义的人',
    weightA: 1, weightB: -1,
  },
  {
    id: 20, dimension: 'SN',
    textA: '我更喜欢已经验证过的方法和流程',
    textB: '我更喜欢尝试新颖独特的方式',
    weightA: 1, weightB: -1,
  },
  {
    id: 21, dimension: 'SN',
    textA: '我擅长注意和记住具体的细节',
    textB: '我擅长发现事物之间的隐藏联系',
    weightA: 1, weightB: -1,
  },
  {
    id: 22, dimension: 'SN',
    textA: '我认为「现实一点」是重要的建议',
    textB: '我认为「大胆想象」是重要的建议',
    weightA: 1, weightB: -1,
  },
  {
    id: 23, dimension: 'SN',
    textA: '我倾向于描述「是什么」',
    textB: '我倾向于描述「可能是什么」',
    weightA: 1, weightB: -1,
  },
  {
    id: 24, dimension: 'SN',
    textA: '我更相信直接经验和实际操作',
    textB: '我更相信灵感顿悟和理论推演',
    weightA: 1, weightB: -1,
  },

  // ====== TF 维度 12题 ======
  {
    id: 25, dimension: 'TF',
    textA: '做决定时，我更看重逻辑和客观分析',
    textB: '做决定时，我更看重人情和对他人的影响',
    weightA: 1, weightB: -1,
  },
  {
    id: 26, dimension: 'TF',
    textA: '我更愿意被客观地评价',
    textB: '我更愿意被善意地理解',
    weightA: 1, weightB: -1,
  },
  {
    id: 27, dimension: 'TF',
    textA: '我更关注事情是否公平合理',
    textB: '我更关注和谐与和睦',
    weightA: 1, weightB: -1,
  },
  {
    id: 28, dimension: 'TF',
    textA: '我倾向于直接指出别人的错误',
    textB: '我倾向于委婉地处理冲突',
    weightA: 1, weightB: -1,
  },
  {
    id: 29, dimension: 'TF',
    textA: '我更愿意做一个有同情心的人',
    textB: '我更愿意做一个理性公正的人',
    weightA: 1, weightB: -1,
  },
  {
    id: 30, dimension: 'TF',
    textA: '当朋友难过时，我会先安慰他',
    textB: '当朋友难过时，我会先帮他分析问题',
    weightA: 1, weightB: -1,
  },
  {
    id: 31, dimension: 'TF',
    textA: '我更容易被逻辑和理性说服',
    textB: '我更容易被情感和价值观说服',
    weightA: 1, weightB: -1,
  },
  {
    id: 32, dimension: 'TF',
    textA: '我认为在争论中，道理比关系更重要',
    textB: '我认为在争论中，关系比道理更重要',
    weightA: 1, weightB: -1,
  },
  {
    id: 33, dimension: 'TF',
    textA: '我倾向于用「对/错」来评判事情',
    textB: '我倾向于用「好/坏（感受）」来评判事情',
    weightA: 1, weightB: -1,
  },
  {
    id: 34, dimension: 'TF',
    textA: '我更容易因为事情「不合理」而生气',
    textB: '我更容易因为事情「不公平/伤人」而生气',
    weightA: 1, weightB: -1,
  },
  {
    id: 35, dimension: 'TF',
    textA: '我认为效率比氛围更重要',
    textB: '我认为氛围比效率更重要',
    weightA: 1, weightB: -1,
  },
  {
    id: 36, dimension: 'TF',
    textA: '我倾向于用事实和数据支持观点',
    textB: '我倾向于用故事和感受支持观点',
    weightA: 1, weightB: -1,
  },

  // ====== JP 维度 12题 ======
  {
    id: 37, dimension: 'JP',
    textA: '我更喜欢有计划有安排的生活',
    textB: '我喜欢随性而为，保持灵活',
    weightA: 1, weightB: -1,
  },
  {
    id: 38, dimension: 'JP',
    textA: '我会提前完成deadline',
    textB: '我经常在最后一刻才完成',
    weightA: 1, weightB: -1,
  },
  {
    id: 39, dimension: 'JP',
    textA: '我更喜欢按照清单完成任务',
    textB: '我喜欢随时调整计划',
    weightA: 1, weightB: -1,
  },
  {
    id: 40, dimension: 'JP',
    textA: '我讨厌迟到和计划被打乱',
    textB: '迟到一点也没关系，计划本来就会变',
    weightA: 1, weightB: -1,
  },
  {
    id: 41, dimension: 'JP',
    textA: '我认为规则是重要的，应该被遵守',
    textB: '规则是灵活的，可以根据情况调整',
    weightA: 1, weightB: -1,
  },
  {
    id: 42, dimension: 'JP',
    textA: '做决定时，我会权衡利弊后快速决定',
    textB: '做决定时，我会保持开放，等待更多信息',
    weightA: 1, weightB: -1,
  },
  {
    id: 43, dimension: 'JP',
    textA: '我喜欢把任务分解成小步骤逐一完成',
    textB: '我喜欢在灵感来临时一气呵成',
    weightA: 1, weightB: -1,
  },
  {
    id: 44, dimension: 'JP',
    textA: '我倾向于先完成手头的事，再考虑下一步',
    textB: '我倾向于同时开多个坑，看心情切换',
    weightA: 1, weightB: -1,
  },
  {
    id: 45, dimension: 'JP',
    textA: '旅行前我会做详细的攻略和行程表',
    textB: '旅行时我喜欢随性探索，走哪算哪',
    weightA: 1, weightB: -1,
  },
  {
    id: 46, dimension: 'JP',
    textA: '我倾向于「先工作，后玩耍」',
    textB: '我倾向于「先玩耍，工作总能做完」',
    weightA: 1, weightB: -1,
  },
  {
    id: 47, dimension: 'JP',
    textA: '我认为承诺和计划应该被遵守',
    textB: '我认为承诺可以根据新情况调整',
    weightA: 1, weightB: -1,
  },
  {
    id: 48, dimension: 'JP',
    textA: '我的工作/学习空间通常井井有条',
    textB: '我的工作/学习空间通常灵活多变',
    weightA: 1, weightB: -1,
  },
];

/**
 * 通用MBTI计分函数——适用于任意题库的动态计分
 */
export function calculateMBTIFromQuestions(
  questions: MBTIQuestion[],
  answers: number[]
): { type: string; dimensions: { EI: number; SN: number; TF: number; JP: number } } {
  const dimensions = { EI: 0, SN: 0, TF: 0, JP: 0 };

  questions.forEach((question, index) => {
    if (answers[index] !== undefined && answers[index] !== null) {
      const value = answers[index];
      const deviation = 3 - value; // 1→+2, 2→+1, 3→0, 4→-1, 5→-2
      dimensions[question.dimension] += question.weightA * deviation;
    }
  });

  // 动态归一化：按每个维度的题目数量分别计算
  const dims: Array<'EI' | 'SN' | 'TF' | 'JP'> = ['EI', 'SN', 'TF', 'JP'];
  dims.forEach((dim) => {
    const count = questions.filter((q) => q.dimension === dim).length;
    const maxScore = count * 2; // 每题最大偏差为2
    dimensions[dim] = maxScore > 0
      ? Math.round((dimensions[dim] / maxScore) * 100)
      : 0;
  });

  const type =
    (dimensions.EI >= 0 ? 'E' : 'I') +
    (dimensions.SN >= 0 ? 'S' : 'N') +
    (dimensions.TF >= 0 ? 'T' : 'F') +
    (dimensions.JP >= 0 ? 'J' : 'P');

  return { type, dimensions };
}

/** 测试层级配置 */
export interface TestTier {
  id: 'quick' | 'standard' | 'precise';
  name: string;
  description: string;
  questionCount: number;
  estimatedTime: string;
  questions: MBTIQuestion[];
}

export const testTiers: TestTier[] = [
  {
    id: 'quick',
    name: '极速版',
    description: '16题快速体验，约3分钟',
    questionCount: 16,
    estimatedTime: '3分钟',
    questions: mbtiQuickQuestions,
  },
  {
    id: 'standard',
    name: '标准版',
    description: '28题标准测试，约8分钟',
    questionCount: 28,
    estimatedTime: '8分钟',
    questions: [], // 从 mbti-data.ts 导入使用
  },
  {
    id: 'precise',
    name: '精准版',
    description: '48题深度分析，约15分钟',
    questionCount: 48,
    estimatedTime: '15分钟',
    questions: mbtiPreciseQuestions,
  },
];
