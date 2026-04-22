import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 赛博人格鉴定
 * 你在赛博空间里是什么存在？
 */
export const cyberTest: FunTest = {
  id: 'cyber',
  title: '赛博人格鉴定',
  subtitle: '你在赛博空间里是什么存在？',
  description: '10道灵魂拷问，测出你的赛博人格。从数字游民到赛博疯子——这里没有现实，只有代码和流量。',
  category: '赛博',
  emoji: '💻',
  themeColor: 'from-cyan-500 via-blue-500 to-purple-600',
  accentColor: 'text-cyan-400',
  borderColor: 'border-cyan-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'c1', text: '你的日均屏幕使用时间？',
      emoji: '📱',
      options: [
        { text: '4小时以内，我有现实生活', weights: { xianshi: 3, putong: 2, shenghuo: 1 } },
        { text: '4-8小时，正常范围', weights: { putong: 3, shenghuo: 2, xianshi: 1 } },
        { text: '8-12小时，手机是外置器官', weights: { wangluo: 3, shenghuo: 2, putong: 1 } },
        { text: '12小时以上，现实是什么？', weights: { saibo: 3, wangluo: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'c2', text: '没有网络的一天，你会？',
      emoji: '📡',
      options: [
        { text: '正好可以休息，看书/运动', weights: { xianshi: 3, shenghuo: 2, putong: 1 } },
        { text: '有点焦虑，但还能忍', weights: { putong: 3, shenghuo: 2, wangluo: 1 } },
        { text: '疯狂找Wi-Fi，像瘾君子找毒品', weights: { wangluo: 3, shenghuo: 2, saibo: 1 } },
        { text: '崩溃，我的世界崩塌了', weights: { saibo: 3, wangluo: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'c3', text: '你的数字身份有多少个？',
      emoji: '👤',
      options: [
        { text: '1-2个，微信+微博/小红书', weights: { xianshi: 3, putong: 2, shenghuo: 1 } },
        { text: '3-5个，不同平台不同人设', weights: { wangluo: 3, putong: 2, shenghuo: 1 } },
        { text: '5-10个，每个平台都有小号', weights: { saibo: 3, wangluo: 2, putong: 1 } },
        { text: '数不清，我有马甲军团', weights: { saibo: 3, wangluo: 2, putong: 1 } },
      ],
    },
    {
      id: 'c4', text: '你更相信AI还是人类？',
      emoji: '🤖',
      options: [
        { text: '人类，AI只是工具', weights: { xianshi: 3, shenghuo: 2, putong: 1 } },
        { text: '看情况，各有优劣', weights: { putong: 3, shenghuo: 2, wangluo: 1 } },
        { text: 'AI，至少AI不会骗我', weights: { wangluo: 3, saibo: 2, putong: 1 } },
        { text: 'AI终将统治人类，我选择加入', weights: { saibo: 3, wangluo: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'c5', text: '你的社交主要发生在哪里？',
      emoji: '💬',
      options: [
        { text: '线下，面对面才是真的', weights: { xianshi: 3, shenghuo: 2, putong: 1 } },
        { text: '线上线下差不多', weights: { putong: 3, shenghuo: 2, wangluo: 1 } },
        { text: '线上，网友比现实朋友多', weights: { wangluo: 3, saibo: 2, putong: 1 } },
        { text: '我只和AI聊天', weights: { saibo: 3, wangluo: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'c6', text: '你的密码管理方式是？',
      emoji: '🔐',
      options: [
        { text: '全部一样，好记', weights: { xianshi: 3, putong: 2, shenghuo: 1 } },
        { text: '分几类，重要的一样，不重要的另一样', weights: { putong: 3, shenghuo: 2, wangluo: 1 } },
        { text: '每个都不一样，用密码管理器', weights: { wangluo: 3, saibo: 2, putong: 1 } },
        { text: '随机生成+双重验证+硬件密钥', weights: { saibo: 3, wangluo: 2, putong: 1 } },
      ],
    },
    {
      id: 'c7', text: '你对元宇宙/VR的态度是？',
      emoji: '🥽',
      options: [
        { text: '噱头，不会成气候', weights: { xianshi: 3, shenghuo: 2, putong: 1 } },
        { text: '观望，可能有用', weights: { putong: 3, shenghuo: 2, wangluo: 1 } },
        { text: '兴奋，未来已来', weights: { wangluo: 3, saibo: 2, putong: 1 } },
        { text: '我已经住在里面了', weights: { saibo: 3, wangluo: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'c8', text: '你的信息获取方式是？',
      emoji: '📰',
      options: [
        { text: '传统媒体+书籍', weights: { xianshi: 3, shenghuo: 2, putong: 1 } },
        { text: '公众号/新闻APP', weights: { putong: 3, shenghuo: 2, wangluo: 1 } },
        { text: '社交媒体/短视频/算法推荐', weights: { wangluo: 3, saibo: 2, putong: 1 } },
        { text: 'RSS/Discord/Telegram/暗网', weights: { saibo: 3, wangluo: 2, putong: 1 } },
      ],
    },
    {
      id: 'c9', text: '你认为10年后人类和AI的关系是？',
      emoji: '🔮',
      options: [
        { text: 'AI是工具，人类主导', weights: { xianshi: 3, shenghuo: 2, putong: 1 } },
        { text: '共生，互相依赖', weights: { putong: 3, wangluo: 2, shenghuo: 1 } },
        { text: 'AI超越人类，人类边缘化', weights: { saibo: 3, wangluo: 2, putong: 1 } },
        { text: '人类意识上传，成为AI', weights: { saibo: 3, wangluo: 2, xianshi: 1 } },
      ],
    },
    {
      id: 'c10', text: '描述一下你和手机的关系？',
      emoji: '📱',
      options: [
        { text: '工具，用完就放', weights: { xianshi: 3, shenghuo: 2, putong: 1 } },
        { text: '重要，但不是离不开', weights: { putong: 3, shenghuo: 2, wangluo: 1 } },
        { text: '外置器官，24小时不离身', weights: { wangluo: 3, saibo: 2, putong: 1 } },
        { text: '我是手机的奴隶', weights: { saibo: 3, wangluo: 2, shenghuo: 1 } },
      ],
    },
  ],
  results: {
    saibo: {
      id: 'saibo', title: '赛博疯子', subtitle: 'CYBER-FREAK',
      description: '你已经超越了普通网民，进入了赛博疯子的境界。你有10+个马甲，你的密码是随机生成的，你的信息来自暗网。你相信AI统治人类只是时间问题，并且你已经准备好加入AI阵营了。',
      traits: ['多马甲', '密码偏执', '暗网用户', 'AI信徒'],
      memeQuote: '人类太脆弱了，我选择上传意识。', mbtiHint: 'INTP / INTP / INTJ',
      color: 'text-purple-400', bgGradient: 'from-purple-700 to-indigo-900', emoji: '👾', rarity: 'SSR',
    },
    wangluo: {
      id: 'wangluo', title: '数字原住民', subtitle: 'DIGITAL-NATIVE',
      description: '你生在数字时代，长在屏幕前。你的社交主要在线上，你的信息来自算法推荐，你的记忆存在云端。你不是离不开网络，你只是不需要现实。',
      traits: ['屏幕依赖', '算法喂养', '云端记忆', '现实可替代'],
      memeQuote: '没有网络的一天？那不叫一天。', mbtiHint: 'ENTP / ENFP / ESTP',
      color: 'text-cyan-400', bgGradient: 'from-cyan-700 to-blue-900', emoji: '🌐', rarity: 'SR',
    },
    xianshi: {
      id: 'xianshi', title: '现实主义者', subtitle: 'REALIST',
      description: '你是数字时代的异类——你更相信面对面，更相信纸质书，更相信人类。你用科技，但不被科技绑架。你是朋友圈里的「老年人」，但你可能是活得更清醒的那个。',
      traits: ['面对面优先', '纸质书爱好者', '科技不绑架', '清醒独立'],
      memeQuote: '放下手机，看看真实的世界。', mbtiHint: 'ISTJ / ISFJ / ESTJ',
      color: 'text-green-400', bgGradient: 'from-green-700 to-emerald-900', emoji: '🌳', rarity: 'SR',
    },
    shenghuo: {
      id: 'shenghuo', title: '数字游民', subtitle: 'NOMAD',
      description: '你是数字时代的游牧民族——你在线上和线下之间自由切换。你利用科技提高效率，但不沉迷。你的工作可能在咖啡馆、在海边、在任何有Wi-Fi的地方。你平衡得很好。',
      traits: ['自由切换', '效率优先', '游牧生活', '平衡大师'],
      memeQuote: '有Wi-Fi的地方，就是我的办公室。', mbtiHint: 'ENTJ / ENTP / ESTP',
      color: 'text-blue-400', bgGradient: 'from-blue-700 to-cyan-900', emoji: '🧑‍💻', rarity: 'R',
    },
    putong: {
      id: 'putong', title: '普通网民', subtitle: 'NETIZEN',
      description: '你就是一个普通的网民——刷手机、看视频、发社交媒体。你不极端，不偏执，不疯狂。你享受科技带来的便利，也珍惜现实生活。你是大多数。',
      traits: ['普普通通', '享受便利', '珍惜现实', '大多数'],
      memeQuote: '我就是个普通网民，活着就不错了。', mbtiHint: 'ISFJ / ESFJ / ISTJ',
      color: 'text-slate-400', bgGradient: 'from-slate-600 to-gray-800', emoji: '👤', rarity: 'N',
    },
  },
  calculate: (answers) => calculateResult(cyberTest, answers),
};