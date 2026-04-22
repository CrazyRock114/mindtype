import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 动物灵魂附体
 * 你的灵魂是什么动物？
 */
export const animalTest: FunTest = {
  id: 'animal',
  title: '动物灵魂附体',
  subtitle: '你的灵魂是什么动物？',
  description: '10道灵魂拷问，测出你的动物灵魂。从卡皮巴拉到哈士奇，从猫头鹰到蜜蜂——你的性格，其实是一只动物。',
  category: '趣味',
  emoji: '🐾',
  themeColor: 'from-amber-500 via-yellow-500 to-orange-600',
  accentColor: 'text-amber-400',
  borderColor: 'border-amber-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'a1', text: '如果不用上班/上学，你会怎么过一天？',
      emoji: '📅',
      options: [
        { text: '睡到自然醒，然后继续躺着', weights: { kapibala: 3, maomi: 2, shu: 1 } },
        { text: '出门社交，认识新朋友', weights: { gou: 3, hou: 2, ha: 1 } },
        { text: '制定详细计划，按部就班执行', weights: { mi: 3, niu: 2, shu: 1 } },
        { text: '想干嘛干嘛，看心情', weights: { mao: 3, kapibala: 2, hu: 1 } },
      ],
    },
    {
      id: 'a2', text: '遇到危险时，你的本能反应是？',
      emoji: '⚠️',
      options: [
        { text: '逃跑，安全第一', weights: { shu: 3, tu: 2, maomi: 1 } },
        { text: '正面刚，怕什么', weights: { hu: 3, gou: 2, hou: 1 } },
        { text: '装死，等危险过去', weights: { kapibala: 3, shu: 2, tu: 1 } },
        { text: '观察分析，找最佳方案', weights: { mao: 3, mi: 2, shu: 1 } },
      ],
    },
    {
      id: 'a3', text: '你的社交圈特点是？',
      emoji: '👥',
      options: [
        { text: '朋友很多，但知心很少', weights: { gou: 3, hou: 2, ha: 1 } },
        { text: '只有几个铁哥们/闺蜜', weights: { maomi: 3, niu: 2, tu: 1 } },
        { text: '独来独往，不需要朋友', weights: { mao: 3, hu: 2, mi: 1 } },
        { text: '来者不拒，谁都可以是朋友', weights: { hou: 3, gou: 2, ha: 1 } },
      ],
    },
    {
      id: 'a4', text: '你最喜欢的工作方式是？',
      emoji: '💼',
      options: [
        { text: '团队协作，一起干', weights: { mi: 3, gou: 2, niu: 1 } },
        { text: '独立完成，不受打扰', weights: { mao: 3, mi: 2, hu: 1 } },
        { text: '有人来一起就干，没人就自己干', weights: { kapibala: 3, mao: 2, tu: 1 } },
        { text: '最好不要工作', weights: { kapibala: 3, shu: 2, maomi: 1 } },
      ],
    },
    {
      id: 'a5', text: '你的口头禅最接近哪个？',
      emoji: '💬',
      options: [
        { text: '「 hurry up！」/「快点！」', weights: { mi: 3, niu: 2, gou: 1 } },
        { text: '「随便」/「都行」', weights: { kapibala: 3, mao: 2, shu: 1 } },
        { text: '「哈哈哈」/「笑死」', weights: { hou: 3, ha: 2, gou: 1 } },
        { text: '「让我想想」', weights: { mao: 3, mi: 2, hu: 1 } },
      ],
    },
    {
      id: 'a6', text: '周末最理想的安排是？',
      emoji: '🌟',
      options: [
        { text: '和朋友出去玩', weights: { gou: 3, hou: 2, ha: 1 } },
        { text: '在家睡觉', weights: { kapibala: 3, maomi: 2, mao: 1 } },
        { text: '看书/学习/提升自己', weights: { mi: 3, mao: 2, shu: 1 } },
        { text: '做手工/画画/创作', weights: { tu: 3, mao: 2, mi: 1 } },
      ],
    },
    {
      id: 'a7', text: '你对陌生人的态度是？',
      emoji: '🤝',
      options: [
        { text: '主动打招呼，自来熟', weights: { gou: 3, hou: 2, ha: 1 } },
        { text: '保持微笑但保持距离', weights: { kapibala: 3, mao: 2, shu: 1 } },
        { text: '观察一段时间再决定', weights: { mao: 3, mi: 2, hu: 1 } },
        { text: '无视，不关我事', weights: { mao: 3, hu: 2, mi: 1 } },
      ],
    },
    {
      id: 'a8', text: '如果可以选择超能力，你会选？',
      emoji: '✨',
      options: [
        { text: '隐身，想消失就消失', weights: { kapibala: 3, mao: 2, shu: 1 } },
        { text: '读心术，知道别人想什么', weights: { mi: 3, mao: 2, tu: 1 } },
        { text: '超级速度，什么都快', weights: { mi: 3, niu: 2, gou: 1 } },
        { text: '变出食物，永远不会饿', weights: { ha: 3, shu: 2, maomi: 1 } },
      ],
    },
    {
      id: 'a9', text: '你的能量来源是？',
      emoji: '⚡',
      options: [
        { text: '和人聊天、社交、聚会', weights: { gou: 3, hou: 2, ha: 1 } },
        { text: '独处、安静、思考', weights: { mao: 3, mi: 2, hu: 1 } },
        { text: '睡觉、发呆、什么都不做', weights: { kapibala: 3, maomi: 2, shu: 1 } },
        { text: '运动、干活、动起来', weights: { niu: 3, mi: 2, gou: 1 } },
      ],
    },
    {
      id: 'a10', text: '描述一下你现在的精神状态？',
      emoji: '🧠',
      options: [
        { text: '稳定，没有什么大波动', weights: { kapibala: 3, niu: 2, shu: 1 } },
        { text: '混乱但快乐', weights: { ha: 3, hou: 2, gou: 1 } },
        { text: '累，想睡', weights: { kapibala: 3, maomi: 2, mao: 1 } },
        { text: '随时准备战斗', weights: { hu: 3, mi: 2, niu: 1 } },
      ],
    },
  ],
  results: {
    kapibala: {
      id: 'kapibala', title: '卡皮巴拉', subtitle: 'CAPYBARA',
      description: '你是动物界的卡皮巴拉——情绪稳定、佛系、和谁都能和平共处。你不焦虑、不内卷、不生气。你的人生哲学是：活着就好，其他随缘。你是当代年轻人的精神图腾。',
      traits: ['情绪稳定', '佛系', '和谁都能处', '活着就好'],
      memeQuote: '情绪稳定，世界和平。', mbtiHint: 'INFP / ISFP / ISTP',
      color: 'text-amber-600', bgGradient: 'from-amber-700 to-yellow-800', emoji: '🦫', rarity: 'SSR',
    },
    gou: {
      id: 'gou', title: '金毛犬', subtitle: 'GOLDEN-DOG',
      description: '你是动物界的金毛——热情、忠诚、人见人爱。你总是第一个打招呼，最后一个离开。你的热情有时会吓到I人，但你真心只是想交朋友。你是社交场合的小太阳。',
      traits: ['热情忠诚', '社交达人', '人见人爱', '小太阳'],
      memeQuote: '你好！我叫金毛！你叫什么！', mbtiHint: 'ENFP / ESFP / ENFJ',
      color: 'text-yellow-400', bgGradient: 'from-yellow-600 to-amber-700', emoji: '🐕', rarity: 'SR',
    },
    mao: {
      id: 'mao', title: '猫', subtitle: 'CAT',
      description: '你是动物界的猫——独立、高冷、有自己的节奏。你不需要取悦任何人，你来去自如。你喜欢独处，但不孤独。你的高冷是选择，不是缺陷。你是I人的终极形态。',
      traits: ['独立高冷', '来去自如', '不取悦任何人', 'I人终极形态'],
      memeQuote: '朕的事，不用你管。', mbtiHint: 'INTJ / INTP / ISTJ',
      color: 'text-purple-400', bgGradient: 'from-purple-700 to-indigo-900', emoji: '🐱', rarity: 'SR',
    },
    mi: {
      id: 'mi', title: '蜜蜂', subtitle: 'BEE',
      description: '你是动物界的蜜蜂——勤劳、高效、目标明确。你从不偷懒，总是在忙碌。你有计划、有节奏、有成果。但别忘了停下来闻闻花香，工作不是人生的全部。',
      traits: ['勤劳高效', '目标明确', '有计划', '停不下来'],
      memeQuote: '忙完这阵就可以忙下一阵了。', mbtiHint: 'ENTJ / ESTJ / ISTJ',
      color: 'text-yellow-300', bgGradient: 'from-yellow-500 to-amber-600', emoji: '🐝', rarity: 'SR',
    },
    shu: {
      id: 'shu', title: '仓鼠', subtitle: 'HAMSTER',
      description: '你是动物界的仓鼠——囤积、谨慎、喜欢在舒适圈里转。你存了很多东西（知识/零食/钱），但很少拿出来用。你害怕改变，但你的生活很安稳。',
      traits: ['囤积癖', '谨慎小心', '舒适圈居民', '害怕改变'],
      memeQuote: '囤得再多，也不够用。', mbtiHint: 'ISFJ / ISTJ / INFP',
      color: 'text-orange-300', bgGradient: 'from-orange-500 to-amber-600', emoji: '🐹', rarity: 'R',
    },
    hu: {
      id: 'hu', title: '老虎', subtitle: 'TIGER',
      description: '你是动物界的老虎——霸气、独立、领地意识强。你不群居，但你是王者。你有野心、有魄力、有执行力。你的存在本身就是一种威慑力。',
      traits: ['霸气独立', '领地意识', '有野心', '王者气场'],
      memeQuote: '我的地盘我做主。', mbtiHint: 'ENTJ / ESTP / INTJ',
      color: 'text-orange-500', bgGradient: 'from-orange-700 to-red-800', emoji: '🐯', rarity: 'SSR',
    },
    hou: {
      id: 'hou', title: '猴子', subtitle: 'MONKEY',
      description: '你是动物界的猴子——活泼、调皮、永远停不下来。你好奇心强，喜欢尝试新事物。你有时会惹麻烦，但你总能化解。你是朋友圈里的开心果。',
      traits: ['活泼调皮', '好奇心强', '开心果', '停不下来'],
      memeQuote: '人生就是一场猴戏。', mbtiHint: 'ENTP / ESTP / ENFP',
      color: 'text-amber-500', bgGradient: 'from-amber-600 to-yellow-700', emoji: '🐒', rarity: 'R',
    },
    maomi: {
      id: 'maomi', title: '树懒', subtitle: 'SLOTH',
      description: '你是动物界的树懒——慢、懒、但可爱。你的节奏比正常人慢三倍，但你从不因此焦虑。你的生活哲学是：慢慢来，反正也急不来。',
      traits: ['慢节奏', '懒但可爱', '不焦虑', '慢慢来'],
      memeQuote: '急什么，反正也赶不上。', mbtiHint: 'INFP / ISFP / INTP',
      color: 'text-green-400', bgGradient: 'from-green-700 to-emerald-800', emoji: '🦥', rarity: 'R',
    },
    ha: {
      id: 'ha', title: '哈士奇', subtitle: 'HUSKY',
      description: '你是动物界的哈士奇——智商忽高忽低、行为不可预测、但永远快乐。你可能拆家，可能犯二，但你永远不会emo。你是混乱中的快乐源泉。',
      traits: ['快乐源泉', '行为不可预测', '永不emo', '混乱中自有秩序'],
      memeQuote: '我虽然二，但我快乐啊！', mbtiHint: 'ENFP / ESFP / ENTP',
      color: 'text-blue-300', bgGradient: 'from-blue-600 to-slate-800', emoji: '🐺', rarity: 'SR',
    },
    niu: {
      id: 'niu', title: '牛', subtitle: 'OX',
      description: '你是动物界的牛——踏实、勤劳、不抱怨。你默默耕耘，从不求回报。你是团队中最可靠的存在。但偶尔也要学会说「不」，别把所有事情都扛在自己肩上。',
      traits: ['踏实勤劳', '默默付出', '可靠', '不抱怨'],
      memeQuote: '耕耘不问收获，但收获总会来。', mbtiHint: 'ISFJ / ISTJ / ESFJ',
      color: 'text-amber-700', bgGradient: 'from-amber-800 to-yellow-900', emoji: '🐂', rarity: 'R',
    },
    tu: {
      id: 'tu', title: '兔子', subtitle: 'RABBIT',
      description: '你是动物界的兔子——敏感、温柔、需要安全感。你容易受惊，但一旦信任你就会全心全意。你的世界很小，但对你来说很温暖。你是需要被温柔对待的存在。',
      traits: ['敏感温柔', '需要安全感', '容易受惊', '全心全意'],
      memeQuote: '我胆子小，但我的爱很大。', mbtiHint: 'INFJ / ISFJ / INFP',
      color: 'text-pink-300', bgGradient: 'from-pink-400 to-rose-500', emoji: '🐰', rarity: 'R',
    },
  },
  calculate: (answers) => calculateResult(animalTest, answers),
};
