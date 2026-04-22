import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 学术废品分类
 * 测测你是什么类型的学术垃圾
 */
export const studentTest: FunTest = {
  id: 'student',
  title: '学术废品分类',
  subtitle: '测测你是什么类型的学术垃圾',
  description: '10道灵魂拷问，测出你的学术废品类型。从DDL战士到学术混子——这里没有学霸，只有废品。',
  category: '学生',
  emoji: '🎓',
  themeColor: 'from-emerald-500 via-green-500 to-teal-600',
  accentColor: 'text-emerald-400',
  borderColor: 'border-emerald-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'st1', text: 'DDL前24小时，你在？',
      emoji: '⏰',
      options: [
        { text: '刚开始看题目', weights: { ddl: 3, hunzi: 2, bai: 1 } },
        { text: '已经写了一半，继续推进', weights: { xueba: 3, pugong: 2, ddl: 1 } },
        { text: '找代写/买现成的', weights: { hunzi: 3, bai: 2, shen: 1 } },
        { text: '不写了，准备挂科', weights: { bai: 3, shen: 2, hunzi: 1 } },
      ],
    },
    {
      id: 'st2', text: '你的笔记风格是？',
      emoji: '📝',
      options: [
        { text: '五颜六色的思维导图', weights: { xueba: 3, pugong: 2, ddl: 1 } },
        { text: '课本上零星几个字', weights: { hunzi: 3, bai: 2, ddl: 1 } },
        { text: '拍照PPT，拍完等于学完', weights: { shen: 3, hunzi: 2, pugong: 1 } },
        { text: '没有笔记，靠脑子记', weights: { bai: 3, shen: 2, hunzi: 1 } },
      ],
    },
    {
      id: 'st3', text: '上课你会坐在哪里？',
      emoji: '🪑',
      options: [
        { text: '第一排，离老师最近', weights: { xueba: 3, pugong: 2, hunzi: 1 } },
        { text: '中间，既不显眼也不隐蔽', weights: { pugong: 3, shen: 2, hunzi: 1 } },
        { text: '最后一排，方便摸鱼', weights: { hunzi: 3, shen: 2, ddl: 1 } },
        { text: '不去上课', weights: { bai: 3, shen: 2, hunzi: 1 } },
      ],
    },
    {
      id: 'st4', text: '期末考前一周，你的状态是？',
      emoji: '📚',
      options: [
        { text: '已经复习三轮，查漏补缺', weights: { xueba: 3, pugong: 2, ddl: 1 } },
        { text: '开始第一轮复习，熬夜模式', weights: { ddl: 3, pugong: 2, hunzi: 1 } },
        { text: '转发锦鲤，求不挂科', weights: { shen: 3, bai: 2, hunzi: 1 } },
        { text: '该吃吃该喝喝，随缘', weights: { bai: 3, shen: 2, hunzi: 1 } },
      ],
    },
    {
      id: 'st5', text: '你被老师点名回答问题时？',
      emoji: '👨‍🏫',
      options: [
        { text: '自信回答，侃侃而谈', weights: { xueba: 3, pugong: 2, hunzi: 1 } },
        { text: '站起来支支吾吾，全靠编', weights: { hunzi: 3, shen: 2, ddl: 1 } },
        { text: '低头假装在找书，躲过点名', weights: { shen: 3, hunzi: 2, pugong: 1 } },
        { text: '直接说「我不会」', weights: { bai: 3, shen: 2, hunzi: 1 } },
      ],
    },
    {
      id: 'st6', text: '你的论文/作业完成方式是？',
      emoji: '📄',
      options: [
        { text: '提前规划，分阶段完成', weights: { xueba: 3, pugong: 2, ddl: 1 } },
        { text: '最后三天创造奇迹', weights: { ddl: 3, hunzi: 2, pugong: 1 } },
        { text: '复制粘贴+降重大法', weights: { hunzi: 3, shen: 2, ddl: 1 } },
        { text: 'ChatGPT一键生成', weights: { shen: 3, hunzi: 2, bai: 1 } },
      ],
    },
    {
      id: 'st7', text: '你对GPA的态度是？',
      emoji: '📊',
      options: [
        { text: '必须4.0，少0.1都不行', weights: { xueba: 3, ddl: 2, pugong: 1 } },
        { text: '3.5以上就行，不用太卷', weights: { pugong: 3, ddl: 2, shen: 1 } },
        { text: '不挂科就行，要GPA干嘛', weights: { hunzi: 3, bai: 2, shen: 1 } },
        { text: 'GPA是什么？能吃吗？', weights: { bai: 3, shen: 2, hunzi: 1 } },
      ],
    },
    {
      id: 'st8', text: '小组作业中你通常扮演？',
      emoji: '👥',
      options: [
        { text: '组长，带飞全队', weights: { xueba: 3, pugong: 2, ddl: 1 } },
        { text: '摸鱼组员，等分配任务', weights: { hunzi: 3, shen: 2, bai: 1 } },
        { text: '抱大腿，跟着学霸混', weights: { shen: 3, hunzi: 2, bai: 1 } },
        { text: '最终整合，把大家的拼在一起', weights: { pugong: 3, ddl: 2, hunzi: 1 } },
      ],
    },
    {
      id: 'st9', text: '你的图书馆使用频率是？',
      emoji: '📖',
      options: [
        { text: '每天去，图书馆是我家', weights: { xueba: 3, ddl: 2, pugong: 1 } },
        { text: '考试前去，平时不去', weights: { ddl: 3, pugong: 2, shen: 1 } },
        { text: '去睡觉/吹空调/看剧', weights: { hunzi: 3, shen: 2, bai: 1 } },
        { text: '不知道图书馆在哪', weights: { bai: 3, shen: 2, hunzi: 1 } },
      ],
    },
    {
      id: 'st10', text: '如果让你给自己贴一个学术标签？',
      emoji: '🏷️',
      options: [
        { text: '「图书馆战神」', weights: { xueba: 3, pugong: 2, ddl: 1 } },
        { text: '「DDL永动机」', weights: { ddl: 3, hunzi: 2, pugong: 1 } },
        { text: '「学术混子」', weights: { hunzi: 3, shen: 2, bai: 1 } },
        { text: '「学术垃圾」', weights: { bai: 3, shen: 2, hunzi: 1 } },
      ],
    },
  ],
  results: {
    xueba: {
      id: 'xueba', title: '真·学霸', subtitle: 'XUE-BA',
      description: '你是学术界的真神——GPA 4.0、奖学金拿到手软、老师眼里的香饽饽。你不仅学习好，还井井有条。你的存在让其他同学感到压力，但你只是在做自己。',
      traits: ['GPA天花板', '奖学金收割机', '井井有条', '压力源'],
      memeQuote: '不是我在卷，是你们在躺。', mbtiHint: 'INTJ / ENTJ / ISTJ',
      color: 'text-yellow-400', bgGradient: 'from-yellow-600 to-amber-700', emoji: '👑', rarity: 'UR',
    },
    ddl: {
      id: 'ddl', title: 'DDL战士', subtitle: 'DDL-FIGHTER',
      description: '你是DDL界的传奇——每次都在最后一天创造奇迹。你的效率在截止前24小时达到峰值，你的肾上腺素就是你的燃料。你不是拖延，你是在等灵感。',
      traits: ['截止前爆发', '肾上腺素驱动', '效率奇高', '灵感依赖'],
      memeQuote: 'Deadline是第一生产力。', mbtiHint: 'ENTP / ENFP / ESTP',
      color: 'text-red-400', bgGradient: 'from-red-600 to-orange-700', emoji: '🔥', rarity: 'SR',
    },
    hunzi: {
      id: 'hunzi', title: '学术混子', subtitle: 'HUN-ZI',
      description: '你是学术界的混子——上课摸鱼、作业抄抄、考试靠猜。但奇怪的是，你居然没挂过科。你的生存智慧在于：知道怎么用最少的努力拿到及格。',
      traits: ['摸鱼达人', '及格万岁', '生存智慧', '运气不错'],
      memeQuote: '混也是一种本事。', mbtiHint: 'INTP / ISTP / ENTP',
      color: 'text-green-400', bgGradient: 'from-green-600 to-emerald-700', emoji: '🐟', rarity: 'SR',
    },
    bai: {
      id: 'bai', title: '彻底摆烂人', subtitle: 'BAI-LAN',
      description: '你已经超越了学术混子，进入了「彻底摆烂」的境界。你不care GPA，不care挂科，不care未来。你的座右铭是：爱咋咋地。你可能是隐藏的天才，也可能只是真的不在乎。',
      traits: ['彻底摆烂', '不在乎', '爱咋咋地', '潜在天才'],
      memeQuote: '爱咋咋地，活着就行。', mbtiHint: 'INFP / ISFP / ISTP',
      color: 'text-slate-400', bgGradient: 'from-slate-600 to-gray-700', emoji: '🛌', rarity: 'SSR',
    },
    shen: {
      id: 'shen', title: '神仙队友', subtitle: 'SHEN-XIAN',
      description: '你是小组作业里的神仙——不抢功、不抱怨、默默完成自己的部分。你可能是学霸也可能是学渣，但你靠谱。你的存在让所有人都安心。',
      traits: ['靠谱', '默默付出', '不抢功', '让人安心'],
      memeQuote: '我不出声，但我完成了。', mbtiHint: 'ISFJ / ISTJ / ESFJ',
      color: 'text-blue-400', bgGradient: 'from-blue-600 to-indigo-700', emoji: '👼', rarity: 'R',
    },
    pugong: {
      id: 'pugong', title: '普通学生', subtitle: 'PU-TONG',
      description: '你就是一个普通的学生——不突出也不垫底。你偶尔努力，偶尔摸鱼。你按时交作业，偶尔熬夜。你不是学霸也不是学渣，你是大多数。',
      traits: ['普普通通', '偶尔努力', '按时交作业', '大多数'],
      memeQuote: '我就是个普通学生，活着就不错了。', mbtiHint: 'ISFJ / ISTJ / ESTJ',
      color: 'text-cyan-400', bgGradient: 'from-cyan-600 to-teal-700', emoji: '👤', rarity: 'N',
    },
  },
  calculate: (answers) => calculateResult(studentTest, answers),
};