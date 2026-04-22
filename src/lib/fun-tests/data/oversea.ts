import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 留子生存报告
 * 测测你是什么类型的留学生
 */
export const overseaTest: FunTest = {
  id: 'oversea',
  title: '留子生存报告',
  subtitle: '你是什么类型的留子？',
  description: '10道灵魂拷问，测出你的留子类型。从厨神到白女，从阴暗爬行到social king——这里没有学霸，只有生存。',
  category: '留学',
  emoji: '🛫',
  themeColor: 'from-sky-500 via-blue-500 to-indigo-600',
  accentColor: 'text-sky-400',
  borderColor: 'border-sky-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'o1', text: '你的日常饮食是？',
      emoji: '🍽️',
      options: [
        { text: '自己做中餐，厨艺飞涨', weights: { chushen: 3, shenghuo: 2, pugong: 1 } },
        { text: '白人饭，吃得像兔子', weights: { bainv: 3, pugong: 2, shenghuo: 1 } },
        { text: '外卖/快餐/便利店', weights: { shenghuo: 3, pugong: 2, anying: 1 } },
        { text: '一天一顿，活着就行', weights: { anying: 3, shenghuo: 2, pugong: 1 } },
      ],
    },
    {
      id: 'o2', text: '遇到racist，你会？',
      emoji: '🗣️',
      options: [
        { text: '当场怼回去，用英文骂到TA自闭', weights: { social: 3, chushen: 2, shenghuo: 1 } },
        { text: '翻个白眼走开，不值得', weights: { bainv: 3, pugong: 2, shenghuo: 1 } },
        { text: '回家发小红书吐槽', weights: { anying: 3, shenghuo: 2, pugong: 1 } },
        { text: '假装没听懂，内心默默记下', weights: { pugong: 3, anying: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'o3', text: '你的英语水平？',
      emoji: '🗣️',
      options: [
        { text: '雅思8.0，和local聊得飞起', weights: { social: 3, bainv: 2, shenghuo: 1 } },
        { text: '能听懂但不会说，沉默是金', weights: { pugong: 3, anying: 2, shenghuo: 1 } },
        { text: '只会「Can I get a...」', weights: { shenghuo: 3, pugong: 2, anying: 1 } },
        { text: '中文才是我的舒适区', weights: { anying: 3, chushen: 2, pugong: 1 } },
      ],
    },
    {
      id: 'o4', text: '你的社交圈组成是？',
      emoji: '👥',
      options: [
        { text: '全是中国人，中文万岁', weights: { anying: 3, chushen: 2, shenghuo: 1 } },
        { text: '一半中国人一半外国人', weights: { social: 3, bainv: 2, shenghuo: 1 } },
        { text: '主要是外国人，融入local', weights: { bainv: 3, social: 2, shenghuo: 1 } },
        { text: '没有社交圈，独来独往', weights: { anying: 3, pugong: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'o5', text: '你对「回国」的态度是？',
      emoji: '✈️',
      options: [
        { text: '迫不及待想回国，国外一天也待不下去了', weights: { anying: 3, shenghuo: 2, pugong: 1 } },
        { text: '纠结，两边都有吸引力和问题', weights: { pugong: 3, shenghuo: 2, bainv: 1 } },
        { text: '不想回国，国外更自由', weights: { bainv: 3, social: 2, shenghuo: 1 } },
        { text: '哪边给工签我就去哪边', weights: { shenghuo: 3, pugong: 2, social: 1 } },
      ],
    },
    {
      id: 'o6', text: '你的周末通常怎么过？',
      emoji: '📅',
      options: [
        { text: 'hiking/健身/户外运动', weights: { bainv: 3, social: 2, shenghuo: 1 } },
        { text: '在家做饭/看剧/打游戏', weights: { chushen: 3, anying: 2, pugong: 1 } },
        { text: ' party/ bar/ 社交', weights: { social: 3, bainv: 2, shenghuo: 1 } },
        { text: '赶DDL/复习/去图书馆', weights: { shenghuo: 3, pugong: 2, chushen: 1 } },
      ],
    },
    {
      id: 'o7', text: '你最想念国内的什么？',
      emoji: '🏠',
      options: [
        { text: '美食！火锅！烧烤！奶茶！', weights: { chushen: 3, anying: 2, shenghuo: 1 } },
        { text: '家人和朋友', weights: { pugong: 3, shenghuo: 2, anying: 1 } },
        { text: '便利的快递和外卖', weights: { shenghuo: 3, pugong: 2, chushen: 1 } },
        { text: '好像也没什么特别想念的', weights: { bainv: 3, social: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'o8', text: '你处理孤独的方式是？',
      emoji: '💭',
      options: [
        { text: '找朋友视频/聊天', weights: { pugong: 3, shenghuo: 2, chushen: 1 } },
        { text: '一个人静静，独处充电', weights: { bainv: 3, anying: 2, pugong: 1 } },
        { text: '出去社交，认识新朋友', weights: { social: 3, bainv: 2, shenghuo: 1 } },
        { text: '刷剧/打游戏/刷手机麻痹自己', weights: { anying: 3, shenghuo: 2, pugong: 1 } },
      ],
    },
    {
      id: 'o9', text: '你的穿搭风格是？',
      emoji: '👕',
      options: [
        { text: 'lululemon/北脸/户外运动风', weights: { bainv: 3, social: 2, shenghuo: 1 } },
        { text: '国内带过来的衣服，继续穿', weights: { pugong: 3, chushen: 2, anying: 1 } },
        { text: '随便穿，有什么穿什么', weights: { shenghuo: 3, anying: 2, pugong: 1 } },
        { text: 'All black，行走的衣柜', weights: { anying: 3, pugong: 2, shenghuo: 1 } },
      ],
    },
    {
      id: 'o10', text: '描述一下你的留学精神状态？',
      emoji: '🧠',
      options: [
        { text: '充实快乐，享受每一天', weights: { social: 3, bainv: 2, shenghuo: 1 } },
        { text: '还行吧，有苦有乐', weights: { pugong: 3, shenghuo: 2, chushen: 1 } },
        { text: '阴暗爬行，想死但觉得该死的另有其人', weights: { anying: 3, shenghuo: 2, pugong: 1 } },
        { text: '每天都在「想回国」和「再忍忍」之间横跳', weights: { shenghuo: 3, pugong: 2, anying: 1 } },
      ],
    },
  ],
  results: {
    bainv: {
      id: 'bainv', title: '白女', subtitle: 'WHITE-GIRL',
      description: '你已经完全融入了——lululemon是标配，brunch是日常，hiking是周末。你的英语说得比中文还溜，你的朋友圈一半是local。你可能是留子中最快适应的人，但回国可能会水土不服。',
      traits: ['融入local', '户外运动', '健康生活', '中英夹杂'],
      memeQuote: 'Let\'s grab a coffee and go hiking!', mbtiHint: 'ESFP / ENFP / ESTP',
      color: 'text-pink-400', bgGradient: 'from-pink-600 to-rose-700', emoji: '🧘', rarity: 'SSR',
      personaScene: { main: '🧘', companions: ['☕', '🏔️', '🥗'], layout: 'orbit' },
    },
    chushen: {
      id: 'chushen', title: '留子厨神', subtitle: 'CHU-SHEN',
      description: '你的厨艺在出国后飞涨——从煮泡面到红烧肉，从饺子到火锅。你的厨房是留子们的耶路撒冷，你的冰箱是唐人街。你用美食治愈乡愁，用厨艺征服外国室友。',
      traits: ['厨艺飞涨', '乡愁治愈', '厨房王者', '室友之神'],
      memeQuote: '出了国，人人都是新东方毕业生。', mbtiHint: 'ISFJ / ESFJ / ISTJ',
      color: 'text-orange-400', bgGradient: 'from-orange-600 to-red-700', emoji: '👨‍🍳', rarity: 'SR',
      personaScene: { main: '👨‍🍳', companions: ['🍲', '🥢', '🔥'], layout: 'scatter' },
    },
    social: {
      id: 'social', title: 'Social King/Queen', subtitle: 'SOCIAL-KING',
      description: '你是留子圈的交际花——party有你，社团有你，各种局都有你。你的微信好友来自20个国家，你的周末永远不会无聊。你证明了：语言不是障碍，社牛才是天赋。',
      traits: ['交际花', '跨国友谊', '周末满档', '社牛天赋'],
      memeQuote: '全世界都是我朋友。', mbtiHint: 'ENFP / ESFP / ENFJ',
      color: 'text-purple-400', bgGradient: 'from-purple-600 to-violet-700', emoji: '👑', rarity: 'SSR',
      personaScene: { main: '👑', companions: ['🥂', '🌍', '💃'], layout: 'orbit' },
    },
    anying: {
      id: 'anying', title: '阴暗爬行留子', subtitle: 'AN-YING',
      description: '你的留学生活是一出悲剧——课听不懂、饭不好吃、朋友没有、想家想到哭。你在深夜的小红书上疯狂搜索「留学生抑郁怎么办」。但请相信，这只是暂时的，撑过去你就是王者。',
      traits: ['抑郁边缘', '想家', '孤独', '深夜emo'],
      memeQuote: '想死，但觉得该死的另有其人。', mbtiHint: 'INFP / INFJ / ISFP',
      color: 'text-slate-400', bgGradient: 'from-slate-700 to-gray-900', emoji: '🕷️', rarity: 'SR',
      personaScene: { main: '🕷️', companions: ['🌑', '📱', '😢'], layout: 'stack' },
    },
    shenghuo: {
      id: 'shenghuo', title: '生存主义留子', subtitle: 'SHENG-CUN',
      description: '你是留子中的务实派——不追求融入，不追求社交，只追求活着。你精打细算，会找折扣，会薅羊毛。你的留学目标明确：拿到文凭，找到工作，拿到工签。你是留子中的生存专家。',
      traits: ['务实派', '精打细算', '目标明确', '生存专家'],
      memeQuote: '活着，拿到文凭，回去。', mbtiHint: 'ISTJ / ESTJ / INTJ',
      color: 'text-green-400', bgGradient: 'from-green-600 to-emerald-700', emoji: '🎒', rarity: 'R',
      personaScene: { main: '🎒', companions: ['📝', '💰', '📅'], layout: 'stack' },
    },
    pugong: {
      id: 'pugong', title: '普通留子', subtitle: 'PU-TONG',
      description: '你就是一个普通的留学生——上课、写作业、偶尔社交、偶尔想家。你不突出也不垫底，你在努力适应，也在慢慢成长。你是大多数留子的真实写照。',
      traits: ['普普通通', '努力适应', '慢慢成长', '大多数'],
      memeQuote: '我就是个普通留子，活着就不错了。', mbtiHint: 'ISFJ / ISTJ / ESFJ',
      color: 'text-blue-400', bgGradient: 'from-blue-600 to-indigo-700', emoji: '📖', rarity: 'N',
      personaScene: { main: '📖', companions: ['☕', '🏠', '🤷'], layout: 'stack' },
    },
  },
  calculate: (answers) => calculateResult(overseaTest, answers),
};