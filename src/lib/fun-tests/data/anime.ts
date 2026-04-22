import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 二次元灵魂检定
 * 测测你的二次元浓度
 */
export const animeTest: FunTest = {
  id: 'anime',
  title: '二次元灵魂检定',
  subtitle: '测测你的二次元浓度',
  description: '10道灵魂拷问，测出你的二次元灵魂类型。从现充到骨灰级宅——这里没有现充，只有浓度。',
  category: '二次元',
  emoji: '🎌',
  themeColor: 'from-violet-500 via-purple-500 to-fuchsia-600',
  accentColor: 'text-violet-400',
  borderColor: 'border-violet-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'an1', text: '你的追番方式是？',
      emoji: '📺',
      options: [
        { text: '每季追10+部，新番全都要', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '只追口碑好的，宁缺毋滥', weights: { zaisheng: 3, putong: 2, xianchong: 1 } },
        { text: '偶尔看一两部热门', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '不看番，只刷短视频', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an2', text: '你会买周边/谷子吗？',
      emoji: '🛍️',
      options: [
        { text: '必买！吧唧立牌挂画全都要', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '只买最喜欢的角色的', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '偶尔买一两个', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '不买，有钱不如吃顿好的', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an3', text: '你的口头禅里有日语吗？',
      emoji: '💬',
      options: [
        { text: '「纳尼」「搜嘎」「牙白」挂嘴边', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '偶尔蹦出一两个词', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '不会，说中文不香吗', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '不仅不说日语，还讨厌别人夹杂日语', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an4', text: '你能接受cosplay吗？',
      emoji: '👘',
      options: [
        { text: '经常出cos，漫展常客', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '想尝试但没勇气', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '看别人cos可以，自己不行', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '完全不能接受，尴尬癌犯了', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an5', text: '你会去漫展/同人展吗？',
      emoji: '🎪',
      options: [
        { text: '每次必去，CP都不落', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '偶尔去大的，小的不去', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '去过一两次，体验一般', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '没去过，也不想去', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an6', text: '你的网易云/QQ音乐歌单里？',
      emoji: '🎵',
      options: [
        { text: '90%是动漫OP/ED/角色歌', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '一半日语歌一半中文歌', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '偶尔有几首动漫神曲', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '全是流行/说唱/摇滚', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an7', text: '你会看轻小说/漫画/同人本吗？',
      emoji: '📚',
      options: [
        { text: '都看！轻小说追更中，同人本一箱', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '只看漫画，小说太长看不下去', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '偶尔看一两本推荐的', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '不看，只看动画', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an8', text: '你的B站/弹幕使用习惯是？',
      emoji: '💻',
      options: [
        { text: 'B站是我的家，每天刷5小时+', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '每天看番+刷视频，弹幕必开', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '偶尔看番，弹幕看心情', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '不用B站，抖音/快手', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an9', text: '你能接受BL/GL吗？',
      emoji: '🏳️‍🌈',
      options: [
        { text: '磕疯了！我的CP必须是真的', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '看作品，好的就磕', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '不磕，但也不排斥', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '完全不能接受', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
    {
      id: 'an10', text: '你最想活在哪个动漫世界里？',
      emoji: '🌟',
      options: [
        { text: '《海贼王》——冒险自由', weights: { zhainan: 3, zaisheng: 2, putong: 1 } },
        { text: '《你的名字》——浪漫唯美', weights: { zaisheng: 3, putong: 2, zhainan: 1 } },
        { text: '《间谍过家家》——温馨搞笑', weights: { putong: 3, xianchong: 2, zaisheng: 1 } },
        { text: '我不想活在动漫世界，现实挺好的', weights: { xianchong: 3, putong: 2, zaisheng: 1 } },
      ],
    },
  ],
  results: {
    zhainan: {
      id: 'zhainan', title: '骨灰级宅男/宅女', subtitle: 'OTAKU',
      description: '你的二次元浓度已经爆表——B站6级、追番1000+、谷子一箱、漫展全勤。你活在二次元，呼吸着二次元，做梦都是二次元。现充是什么？能吃吗？',
      traits: ['浓度爆表', 'B站6级', '追番1000+', '漫展全勤'],
      memeQuote: '我不是宅，我只是生活在另一个世界。', mbtiHint: 'INTP / INFP / ISTP',
      color: 'text-purple-400', bgGradient: 'from-purple-700 to-fuchsia-900', emoji: '⛩️', rarity: 'SSR',
      personaScene: { main: '⛩️', companions: ['📺', '🎮', '🍜'], layout: 'orbit' },
    },
    zaisheng: {
      id: 'zaisheng', title: '资深二刺螈', subtitle: 'SENIOR-OTAKU',
      description: '你是一个合格的二次元——追番、买谷、逛展、磕CP，样样不落。但你还有现实生活的痕迹，偶尔还会和现充朋友出去玩。你在二次元和三次元之间找到了平衡。',
      traits: ['追番买谷', '逛展磕CP', '二三次元平衡', '浓度适中'],
      memeQuote: '二次元是我的精神家园，三次元是我的生存基地。', mbtiHint: 'ENFP / INFP / ISFP',
      color: 'text-pink-400', bgGradient: 'from-pink-600 to-rose-700', emoji: '🎀', rarity: 'SR',
      personaScene: { main: '🎀', companions: ['📱', '🛍️', '🎌'], layout: 'stack' },
    },
    putong: {
      id: 'putong', title: '普通观众', subtitle: 'VIEWER',
      description: '你就是一个普通的动画观众——偶尔看一两部热门番，知道几个经典角色，但不会沉迷。你对二次元有好感，但不是必需品。你是二次元世界的观光客。',
      traits: ['偶尔看番', '知道经典', '不沉迷', '观光客'],
      memeQuote: '好看就看，不好看就换。', mbtiHint: 'ISFJ / ESFJ / ISTJ',
      color: 'text-blue-400', bgGradient: 'from-blue-600 to-indigo-700', emoji: '👀', rarity: 'N',
      personaScene: { main: '👀', companions: ['📺', '🍿', '🤷'], layout: 'stack' },
    },
    xianchong: {
      id: 'xianchong', title: '现充', subtitle: 'NORMIE',
      description: '你是二次元世界的异类——你不追番，不买谷，不去漫展，甚至觉得二次元很奇怪。你的生活充满了阳光、运动和社交。你可能是二次元们最羡慕又最不理解的存在。',
      traits: ['阳光运动', '社交达人', '二次元绝缘', '现充本充'],
      memeQuote: '动漫？那不是小孩子看的吗？', mbtiHint: 'ESFP / ESTP / ENFJ',
      color: 'text-yellow-400', bgGradient: 'from-yellow-600 to-amber-700', emoji: '☀️', rarity: 'SR',
      personaScene: { main: '☀️', companions: ['🏃', '🎉', '👫'], layout: 'orbit' },
    },
  },
  calculate: (answers) => calculateResult(animeTest, answers),
};