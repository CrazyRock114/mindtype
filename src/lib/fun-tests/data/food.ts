import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 食物人格鉴定
 * 你是什么食物成精了？
 */
export const foodTest: FunTest = {
  id: 'food',
  title: '食物人格鉴定',
  subtitle: '你是什么食物成精了？',
  description: '10道灵魂拷问，测出你的食物人格。从火锅到白粥，从螺蛳粉到马卡龙——你的性格，藏在你爱吃的里面。',
  category: '生活',
  emoji: '🍜',
  themeColor: 'from-orange-500 via-amber-500 to-yellow-600',
  accentColor: 'text-orange-400',
  borderColor: 'border-orange-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'f1', text: '饿极了的时候，你最想吃什么？',
      emoji: '😋',
      options: [
        { text: '火锅！要辣！要爽！', weights: { huoguo: 3, luosifen: 2, malaxiangguo: 1 } },
        { text: '一碗热腾腾的白粥配咸菜', weights: { baizhou: 3, doujiang: 2, mianbao: 1 } },
        { text: '奶茶+炸鸡，快乐加倍', weights: { naicha: 3, tianpin: 2, hanbao: 1 } },
        { text: '精致的三明治/沙拉', weights: { salad: 3, mianbao: 2, doujiang: 1 } },
      ],
    },
    {
      id: 'f2', text: '朋友来你家，你会招待TA吃什么？',
      emoji: '🏠',
      options: [
        { text: '点一桌子外卖，仪式感拉满', weights: { huoguo: 3, malaxiangguo: 2, hanbao: 1 } },
        { text: '煮一锅泡面，简单实在', weights: { paomian: 3, baizhou: 2, doujiang: 1 } },
        { text: '亲手做一顿精致的大餐', weights: { salad: 3, tianpin: 2, mianbao: 1 } },
        { text: '「冰箱有啥吃啥」，佛系', weights: { baizhou: 3, doujiang: 2, paomian: 1 } },
      ],
    },
    {
      id: 'f3', text: '你对待剩菜的态度是？',
      emoji: '🥡',
      options: [
        { text: '必须吃完！浪费可耻', weights: { baizhou: 3, doujiang: 2, paomian: 1 } },
        { text: '第二天热热继续吃', weights: { paomian: 3, baizhou: 2, malaxiangguo: 1 } },
        { text: '扔掉，下一顿吃新鲜的', weights: { salad: 3, tianpin: 2, naicha: 1 } },
        { text: '看心情，心情好就吃完', weights: { naicha: 3, hanbao: 2, luosifen: 1 } },
      ],
    },
    {
      id: 'f4', text: '你的口味偏好是？',
      emoji: '🌶️',
      options: [
        { text: '无辣不欢，越辣越爽', weights: { huoguo: 3, luosifen: 2, malaxiangguo: 1 } },
        { text: '清淡为主，养生第一', weights: { baizhou: 3, doujiang: 2, salad: 1 } },
        { text: '甜！甜！甜！', weights: { tianpin: 3, naicha: 2, mianbao: 1 } },
        { text: '什么口味都行，不挑食', weights: { paomian: 3, hanbao: 2, doujiang: 1 } },
      ],
    },
    {
      id: 'f5', text: '深夜外卖，你通常点什么？',
      emoji: '🌙',
      options: [
        { text: '烧烤/炸鸡/重口味', weights: { huoguo: 3, hanbao: 2, malaxiangguo: 1 } },
        { text: '奶茶/甜品/快乐肥宅水', weights: { naicha: 3, tianpin: 2, luosifen: 1 } },
        { text: '不点，晚上不吃东西', weights: { salad: 3, baizhou: 2, doujiang: 1 } },
        { text: '泡面/速食/随便垫一口', weights: { paomian: 3, hanbao: 2, baizhou: 1 } },
      ],
    },
    {
      id: 'f6', text: '你拍照发朋友圈前，会先P图吗？',
      emoji: '📸',
      options: [
        { text: 'P！滤镜！调色！要精致！', weights: { tianpin: 3, salad: 2, naicha: 1 } },
        { text: '加个滤镜就发，差不多得了', weights: { naicha: 3, mianbao: 2, paomian: 1 } },
        { text: '直接发原图，真实最重要', weights: { huoguo: 3, luosifen: 2, baizhou: 1 } },
        { text: '不拍照，直接吃', weights: { baizhou: 3, doujiang: 2, paomian: 1 } },
      ],
    },
    {
      id: 'f7', text: '如果只能吃一种食物一辈子，你会选？',
      emoji: '🍽️',
      options: [
        { text: '火锅，因为可以涮一切', weights: { huoguo: 3, malaxiangguo: 2, luosifen: 1 } },
        { text: '白粥，因为清淡养胃', weights: { baizhou: 3, doujiang: 2, salad: 1 } },
        { text: '泡面，简单快捷又好吃', weights: { paomian: 3, hanbao: 2, baizhou: 1 } },
        { text: '甜品，人生已经够苦了', weights: { tianpin: 3, naicha: 2, mianbao: 1 } },
      ],
    },
    {
      id: 'f8', text: '你对网红餐厅的态度是？',
      emoji: '🏪',
      options: [
        { text: '排队2小时也要打卡！', weights: { naicha: 3, tianpin: 2, salad: 1 } },
        { text: '等不排队了再去', weights: { mianbao: 3, doujiang: 2, paomian: 1 } },
        { text: '从不跟风，路边摊最好吃', weights: { huoguo: 3, luosifen: 2, malaxiangguo: 1 } },
        { text: '完全不知道什么是网红餐厅', weights: { baizhou: 3, doujiang: 2, paomian: 1 } },
      ],
    },
    {
      id: 'f9', text: '吃东西时你最注重什么？',
      emoji: '✨',
      options: [
        { text: '味道，好吃是唯一的标准', weights: { huoguo: 3, luosifen: 2, malaxiangguo: 1 } },
        { text: '健康，吃得健康才能活得久', weights: { salad: 3, baizhou: 2, doujiang: 1 } },
        { text: '颜值，好看的食物才有食欲', weights: { tianpin: 3, naicha: 2, salad: 1 } },
        { text: '方便，能吃饱就行', weights: { paomian: 3, hanbao: 2, baizhou: 1 } },
      ],
    },
    {
      id: 'f10', text: '你的理想约会餐厅是？',
      emoji: '💕',
      options: [
        { text: '热闹的火锅店，边吃边聊', weights: { huoguo: 3, malaxiangguo: 2, luosifen: 1 } },
        { text: '安静的咖啡馆/甜品店', weights: { naicha: 3, tianpin: 2, mianbao: 1 } },
        { text: '路边大排档，烟火气最浓', weights: { luosifen: 3, malaxiangguo: 2, huoguo: 1 } },
        { text: '家里，自己做/点外卖', weights: { baizhou: 3, paomian: 2, doujiang: 1 } },
      ],
    },
  ],
  results: {
    huoguo: {
      id: 'huoguo', title: '火锅', subtitle: 'HOT-POT',
      description: '你是人群中的火锅——热闹、滚烫、有味道。你的朋友很多，因为你让人舒服。你有脾气（辣度可调），但本质上是个温暖的人。你的人生哲学是：万物皆可涮。',
      traits: ['热闹滚烫', '包容万物', '有脾气但温暖', '社交中心'],
      memeQuote: '没有什么是一顿火锅解决不了的。', mbtiHint: 'ENFP / ESFP / ENFJ',
      color: 'text-red-400', bgGradient: 'from-red-600 to-orange-700', emoji: '🍲', rarity: 'SR',
      personaScene: { main: '🍲', companions: ['🌶️', '🔥', '🥢'], layout: 'orbit' },
    },
    baizhou: {
      id: 'baizhou', title: '白粥', subtitle: 'PORRIDGE',
      description: '你是生活中的白粥——清淡、养胃、不可或缺。你不喜欢喧嚣，但谁离开了你都会觉得少了点什么。你是那个在角落里默默付出的人，温暖但不张扬。',
      traits: ['清淡温和', '养胃治愈', '低调踏实', '不可或缺'],
      memeQuote: '平平淡淡才是真。', mbtiHint: 'ISFJ / ISTJ / INFJ',
      color: 'text-slate-300', bgGradient: 'from-slate-500 to-gray-700', emoji: '🥣', rarity: 'R',
      personaScene: { main: '🥣', companions: ['🥢', '🌾', '☁️'], layout: 'stack' },
    },
    naicha: {
      id: 'naicha', title: '奶茶', subtitle: 'BOBA-TEA',
      description: '你是社交界的奶茶——甜美、流行、让人快乐。你紧跟潮流，哪里热闹哪里有你。你的生活需要糖分，你的朋友圈需要点赞。你是当代年轻人的精神慰藉。',
      traits: ['甜美治愈', '紧跟潮流', '社交货币', '快乐源泉'],
      memeQuote: '奶茶在手，快乐我有。', mbtiHint: 'ESFP / ENFP / ESFJ',
      color: 'text-pink-400', bgGradient: 'from-pink-500 to-rose-600', emoji: '🧋', rarity: 'SR',
      personaScene: { main: '🧋', companions: ['🧊', '🍬', '✨'], layout: 'orbit' },
    },
    luosifen: {
      id: 'luosifen', title: '螺蛳粉', subtitle: 'LUO-SI',
      description: '你是食物界的螺蛳粉——闻起来臭，吃起来香。你不在乎别人的眼光，你喜欢的就是最好的。你的朋友圈两极分化：爱死你或者远离你。但你根本不在乎。',
      traits: ['特立独行', '不在乎眼光', '真爱至上', '两极分化'],
      memeQuote: '爱我你怕了吗？', mbtiHint: 'INTP / ENTP / INFP',
      color: 'text-yellow-600', bgGradient: 'from-yellow-700 to-amber-800', emoji: '🍜', rarity: 'SSR',
      personaScene: { main: '🍜', companions: ['🌶️', '😷', '✨'], layout: 'scatter' },
    },
    tianpin: {
      id: 'tianpin', title: '甜品', subtitle: 'DESSERT',
      description: '你是生活中的甜品——精致、甜美、让人愉悦。你对生活品质有要求，你追求美好事物。你的人生需要仪式感，你的朋友圈总是很美。但你偶尔也会深夜暴食。',
      traits: ['精致甜美', '追求品质', '仪式感强', '偶尔暴食'],
      memeQuote: '人生已经够苦了，需要点甜。', mbtiHint: 'ISFP / INFP / ESFP',
      color: 'text-pink-300', bgGradient: 'from-pink-400 to-rose-500', emoji: '🍰', rarity: 'SR',
      personaScene: { main: '🍰', companions: ['🍓', '🍦', '✨'], layout: 'stack' },
    },
    paomian: {
      id: 'paomian', title: '泡面', subtitle: 'INSTANT',
      description: '你是生活里的泡面——简单、快捷、无处不在。你不讲究，能吃饱就行。但别小看泡面，它的口味多到超乎想象。你也是如此——表面简单，内心丰富。',
      traits: ['简单直接', '随遇而安', '方便快捷', '内心丰富'],
      memeQuote: '简单快乐，人生不累。', mbtiHint: 'ISTP / ESTP / ENTP',
      color: 'text-yellow-400', bgGradient: 'from-yellow-500 to-amber-600', emoji: '🍜', rarity: 'N',
      personaScene: { main: '🍜', companions: ['🥚', '🌶️', '⏰'], layout: 'stack' },
    },
    salad: {
      id: 'salad', title: '沙拉', subtitle: 'SALAD',
      description: '你是社交界的沙拉——健康、自律、有品位。你对自己有要求，对生活有标准。你可能被认为「太装了」，但你知道自己在追求什么。你的自律让你与众不同。',
      traits: ['健康自律', '有品位', '克制理性', '追求品质'],
      memeQuote: '自律给我自由。', mbtiHint: 'INTJ / ENTJ / ISTJ',
      color: 'text-green-400', bgGradient: 'from-green-600 to-emerald-700', emoji: '🥗', rarity: 'SR',
      personaScene: { main: '🥗', companions: ['🥑', '🥕', '💪'], layout: 'orbit' },
    },
    malaxiangguo: {
      id: 'malaxiangguo', title: '麻辣香锅', subtitle: 'MALA-XIANG',
      description: '你是食物界的麻辣香锅——重口味、接地气、让人上头。你不喜欢精致的摆盘，你喜欢真实的味道。你的朋友都是真朋友，因为你够真、够辣、够爽。',
      traits: ['重口味', '接地气', '真实直爽', '让人上头'],
      memeQuote: '够辣才够味，够真才够朋友。', mbtiHint: 'ESTP / ESFP / ENTP',
      color: 'text-red-500', bgGradient: 'from-red-700 to-orange-800', emoji: '🌶️', rarity: 'R',
      personaScene: { main: '🌶️', companions: ['🔥', '🍲', '😋'], layout: 'scatter' },
    },
    mianbao: {
      id: 'mianbao', title: '面包', subtitle: 'BREAD',
      description: '你是生活中的面包——百搭、可靠、温暖。你可以出现在任何场合：早餐、午餐、下午茶。你适应力强，和谁都能相处。你是那个让所有人安心的人。',
      traits: ['百搭可靠', '温暖踏实', '适应力强', '让人安心'],
      memeQuote: '我百搭，但我不是备胎。', mbtiHint: 'ISFJ / ESFJ / ISTJ',
      color: 'text-amber-300', bgGradient: 'from-amber-500 to-yellow-600', emoji: '🍞', rarity: 'N',
      personaScene: { main: '🍞', companions: ['🧈', '🍯', '☕'], layout: 'stack' },
    },
    doujiang: {
      id: 'doujiang', title: '豆浆油条', subtitle: 'DOU-JIANG',
      description: '你是传统的豆浆油条——朴素、经典、有温度。你不追潮流，但你永远不会过时。你喜欢简单的生活，简单的快乐。你是那个让人感到「回家」的人。',
      traits: ['朴素经典', '有温度', '不追潮流', '让人安心'],
      memeQuote: '平平淡淡，温温暖暖。', mbtiHint: 'ISTJ / ISFJ / ESTJ',
      color: 'text-amber-400', bgGradient: 'from-amber-600 to-yellow-700', emoji: '🥢', rarity: 'N',
      personaScene: { main: '🥢', companions: ['🥛', '🥖', '☀️'], layout: 'row' },
    },
    hanbao: {
      id: 'hanbao', title: '汉堡', subtitle: 'BURGER',
      description: '你是快餐界的汉堡——高效、满足、全球化。你做事雷厉风行，不拖泥带水。你的生活节奏快，但你知道自己要什么。你是现代都市人的缩影。',
      traits: ['高效直接', '目标明确', '快节奏', '现代都市'],
      memeQuote: '时间就是金钱，效率就是生命。', mbtiHint: 'ENTJ / ESTJ / INTJ',
      color: 'text-orange-400', bgGradient: 'from-orange-600 to-red-700', emoji: '🍔', rarity: 'R',
      personaScene: { main: '🍔', companions: ['🍟', '🥤', '⚡'], layout: 'stack' },
    },
  },
  calculate: (answers) => calculateResult(foodTest, answers),
};
