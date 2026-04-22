import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 社交电量检测仪
 * 测测你的社交电池容量
 */
export const socialTest: FunTest = {
  id: 'social',
  title: '社交电量检测仪',
  subtitle: '你的社交电池还剩多少？',
  description: '8道灵魂拷问，测出你的社交电量等级。从社交恐怖分子到隐形人——这里没有社交礼仪，只有你的真实电量。',
  category: '社交',
  emoji: '🔋',
  themeColor: 'from-green-500 via-emerald-500 to-teal-600',
  accentColor: 'text-green-400',
  borderColor: 'border-green-500/20',
  questionCount: 8,
  estimatedTime: '1分钟',
  questions: [
    {
      id: 's1', text: '朋友突然来你家楼下说要见你，你的反应是？',
      emoji: '🏠',
      options: [
        { text: '开心！立刻下楼！', weights: { kongbu: 3, daren: 2, kaiwang: 1 } },
        { text: '「我今天没洗头，改天吧」', weights: { yinxing: 3, kongbu: 2, pugong: 1 } },
        { text: '假装不在家', weights: { yinxing: 3, pugong: 2, daren: 1 } },
        { text: '「上来吧，正好我煮了火锅」', weights: { daren: 3, kaiwang: 2, kongbu: 1 } },
      ],
    },
    {
      id: 's2', text: '聚会中你通常扮演什么角色？',
      emoji: '🎉',
      options: [
        { text: '气氛组，全场最嗨', weights: { kongbu: 3, kaiwang: 2, daren: 1 } },
        { text: '角落观察者，默默吃东西', weights: { yinxing: 3, pugong: 2, guancha: 1 } },
        { text: '话题发起者，控场大师', weights: { daren: 3, kongbu: 2, kaiwang: 1 } },
        { text: '提前离开的那个人', weights: { yinxing: 3, pugong: 2, guancha: 1 } },
      ],
    },
    {
      id: 's3', text: '你的微信好友列表有多少人是「仅聊天」？',
      emoji: '👥',
      options: [
        { text: '不到10个，我很少加人', weights: { yinxing: 3, pugong: 2, guancha: 1 } },
        { text: '一半以上，加完就屏蔽', weights: { yinxing: 3, guancha: 2, pugong: 1 } },
        { text: '没有，我全开放', weights: { kongbu: 3, daren: 2, kaiwang: 1 } },
        { text: '我不记得了，随缘', weights: { pugong: 3, kaiwang: 2, guancha: 1 } },
      ],
    },
    {
      id: 's4', text: '接到陌生电话，你会？',
      emoji: '📞',
      options: [
        { text: '秒接，万一是帅哥/美女呢', weights: { kaiwang: 3, kongbu: 2, daren: 1 } },
        { text: '等响铃结束，然后查归属地', weights: { guancha: 3, yinxing: 2, pugong: 1 } },
        { text: '直接挂掉，从不接陌生号码', weights: { yinxing: 3, guancha: 2, pugong: 1 } },
        { text: '接起来听两句再决定挂不挂', weights: { pugong: 3, kaiwang: 2, guancha: 1 } },
      ],
    },
    {
      id: 's5', text: ' elevator里遇到领导/老师，你会？',
      emoji: '🛗',
      options: [
        { text: '主动打招呼并尬聊一路', weights: { daren: 3, kaiwang: 2, kongbu: 1 } },
        { text: '点头微笑，然后低头看手机', weights: { pugong: 3, guancha: 2, yinxing: 1 } },
        { text: '假装没看见，背对TA', weights: { yinxing: 3, guancha: 2, pugong: 1 } },
        { text: '讲个笑话活跃气氛', weights: { kongbu: 3, daren: 2, kaiwang: 1 } },
      ],
    },
    {
      id: 's6', text: '被拉进一个陌生人很多的群，你会？',
      emoji: '💬',
      options: [
        { text: '立刻自我介绍，主动认识大家', weights: { daren: 3, kongbu: 2, kaiwang: 1 } },
        { text: '潜水观察，从不说一句话', weights: { yinxing: 3, guancha: 2, pugong: 1 } },
        { text: '偶尔发个表情包刷存在感', weights: { pugong: 3, kaiwang: 2, guancha: 1 } },
        { text: '退群，不认识的人我不聊', weights: { yinxing: 3, guancha: 2, pugong: 1 } },
      ],
    },
    {
      id: 's7', text: '周末有人约你出去玩，你的默认反应是？',
      emoji: '📅',
      options: [
        { text: '「去哪？几点？穿什么？」兴奋', weights: { daren: 3, kongbu: 2, kaiwang: 1 } },
        { text: '「让我想想...」然后拒绝', weights: { yinxing: 3, pugong: 2, guancha: 1 } },
        { text: '「可以啊」但出门时后悔', weights: { pugong: 3, kaiwang: 2, yinxing: 1 } },
        { text: '看是谁约，看心情决定', weights: { guancha: 3, pugong: 2, kaiwang: 1 } },
      ],
    },
    {
      id: 's8', text: '你的社交能量条多久需要充电？',
      emoji: '🔌',
      options: [
        { text: '永远满格，越社交越兴奋', weights: { kongbu: 3, daren: 2, kaiwang: 1 } },
        { text: '2小时，然后需要独处一周', weights: { yinxing: 3, guancha: 2, pugong: 1 } },
        { text: '半天，晚上需要安静回血', weights: { pugong: 3, guancha: 2, kaiwang: 1 } },
        { text: '看和谁在一起，和喜欢的人永远满格', weights: { kaiwang: 3, pugong: 2, daren: 1 } },
      ],
    },
  ],
  results: {
    kongbu: {
      id: 'kongbu', title: '社交恐怖分子', subtitle: 'KONG-BU',
      description: '你是社交场合的核武器，所到之处无不鸡飞狗跳。你可以在任何场合和任何陌生人自来熟，电梯里也能和陌生人聊成闺蜜。你不是没有边界感，你是根本没有边界。',
      traits: ['自来熟', '社牛天花板', '无边界', '全场焦点'],
      memeQuote: '没有我暖不了的场。', mbtiHint: 'ENFP / ESFP / ENTP',
      color: 'text-red-400', bgGradient: 'from-red-600 to-orange-700', emoji: '💣', rarity: 'SSR',
      personaScene: { main: '💣', companions: ['🔥', '🎉', '📢'], layout: 'scatter' },
    },
    yinxing: {
      id: 'yinxing', title: '隐形人', subtitle: 'YIN-XING',
      description: '你是社交场合的幽灵——在场但不存在。你从不主动说话，从不发起聚会，从不发朋友圈。你享受独处，社交对你来说是纯粹的耗电。你的理想生活是：没有人认识我。',
      traits: ['社交隐身', '独处成瘾', '被动社交', '低电量'],
      memeQuote: '别看我，我不在。', mbtiHint: 'INTJ / INTP / ISTP',
      color: 'text-slate-400', bgGradient: 'from-slate-700 to-gray-900', emoji: '👻', rarity: 'SR',
      personaScene: { main: '👻', companions: ['🌫️', '🚶', '📱'], layout: 'stack' },
    },
    daren: {
      id: 'daren', title: '社交达人', subtitle: 'DA-REN',
      description: '你是人群中的润滑剂，聚会的灵魂人物。你擅长察言观色，知道什么时候该说什么话。你有500个微信好友，其中100个真的认识你。你不是社牛，你是社交艺术家。',
      traits: ['人脉王', '察言观色', '八面玲珑', '社交艺术家'],
      memeQuote: '朋友多了路好走。', mbtiHint: 'ENFJ / ESFJ / ESTP',
      color: 'text-amber-400', bgGradient: 'from-amber-600 to-yellow-700', emoji: '🌟', rarity: 'SR',
      personaScene: { main: '🌟', companions: ['✨', '🤝', '👥'], layout: 'orbit' },
    },
    guancha: {
      id: 'guancha', title: '观察者', subtitle: 'GUAN-CHA',
      description: '你是社交场合的摄影师——在场，但只看不拍。你不参与，但你什么都看在眼里。你的朋友圈从来不发，但你的大脑里存了所有人的黑历史。你是社交世界的旁观者。',
      traits: ['旁观者', '信息收集', '不发朋友圈', '暗中观察'],
      memeQuote: '我不说话，但我什么都看到了。', mbtiHint: 'INTJ / INFJ / ISTJ',
      color: 'text-blue-400', bgGradient: 'from-blue-700 to-indigo-900', emoji: '👁️', rarity: 'R',
      personaScene: { main: '👁️', companions: ['🔍', '📸', '🤫'], layout: 'stack' },
    },
    pugong: {
      id: 'pugong', title: '普通社恐', subtitle: 'PU-GONG',
      description: '你不是完全的社恐，也不是社牛。你可以社交，但需要心理建设。你偶尔会主动约人，但约完会后悔。你在社恐和社牛之间反复横跳，是社交的中间态。',
      traits: ['可社可恐', '需要心理建设', '偶尔主动', '社交薛定谔'],
      memeQuote: '我可以社交，但我不想。', mbtiHint: 'ISFJ / ISTJ / INFP',
      color: 'text-green-400', bgGradient: 'from-green-600 to-emerald-700', emoji: '😐', rarity: 'N',
      personaScene: { main: '😐', companions: ['😰', '🤷', '💨'], layout: 'stack' },
    },
    kaiwang: {
      id: 'kaiwang', title: '社交海王', subtitle: 'KAI-WANG',
      description: '你享受社交，但不依赖社交。你有很多朋友，但你不会为任何一个朋友消耗自己。你可以很嗨，也可以很独。你的社交策略是：来者不拒，去者不追。',
      traits: ['社交自由', '来者不拒', '去者不追', '能量可控'],
      memeQuote: '社交是我生活中的调味品，不是主食。', mbtiHint: 'ENTP / ESTP / ENFP',
      color: 'text-purple-400', bgGradient: 'from-purple-600 to-violet-700', emoji: '🌊', rarity: 'SR',
      personaScene: { main: '🌊', companions: ['🐟', '🐠', '🐡'], layout: 'row' },
    },
  },
  calculate: (answers) => calculateResult(socialTest, answers),
};
