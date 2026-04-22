import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 欧美Meme人格
 * 你在Meme文化里是什么存在？
 */
export const memeTest: FunTest = {
  id: 'meme',
  title: '欧美Meme人格',
  subtitle: '你在Meme文化里是什么存在？',
  description: '10道灵魂拷问，测出你的欧美Meme人格。从Doge到Distracted Boyfriend，从Drake到Woman Yelling at Cat——这里没有正常人类，只有行走的表情包。',
  category: 'Meme',
  emoji: '🐸',
  themeColor: 'from-lime-500 via-green-500 to-emerald-600',
  accentColor: 'text-lime-400',
  borderColor: 'border-lime-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'me1', text: '当别人在争论时，你的反应是？',
      emoji: '🍿',
      options: [
        { text: '搬好小板凳，吃瓜看戏', weights: { popcorn: 3, troll: 2, doge: 1 } },
        { text: '加入争论，必须站队', weights: { yelly: 3, troll: 2, cat: 1 } },
        { text: '发一个表情包缓和气氛', weights: { cat: 3, doge: 2, stonks: 1 } },
        { text: '假装没看见，刷别的', weights: { brain: 3, pugong: 2, cat: 1 } },
      ],
    },
    {
      id: 'me2', text: '你的朋友在做傻事，你会？',
      emoji: '😅',
      options: [
        { text: '拍下来发朋友圈', weights: { cat: 3, troll: 2, doge: 1 } },
        { text: '直接说「你这脑子不行」', weights: { brain: 3, yelly: 2, cat: 1 } },
        { text: '默默看着，内心嘲笑', weights: { pugong: 3, brain: 2, doge: 1 } },
        { text: '加入TA一起傻', weights: { doge: 3, troll: 2, cat: 1 } },
      ],
    },
    {
      id: 'me3', text: '你的生活态度更接近哪个meme？',
      emoji: '🎯',
      options: [
        { text: 'Stonks——不管发生什么，我都在赢', weights: { stonks: 3, doge: 2, troll: 1 } },
        { text: 'Brain expanding——我在变得越来越聪明', weights: { brain: 3, stonks: 2, pugong: 1 } },
        { text: 'Doge——什么都不在乎，wow', weights: { doge: 3, pugong: 2, cat: 1 } },
        { text: 'Woman yelling——永远在生气', weights: { yelly: 3, troll: 2, cat: 1 } },
      ],
    },
    {
      id: 'me4', text: '你发朋友圈的频率是？',
      emoji: '📱',
      options: [
        { text: '每天发，记录生活的每一个meme', weights: { troll: 3, cat: 2, doge: 1 } },
        { text: '偶尔发，有重大事件才发', weights: { pugong: 3, doge: 2, stonks: 1 } },
        { text: '只转发meme，不分享生活', weights: { doge: 3, troll: 2, cat: 1 } },
        { text: '不发，我是潜水员', weights: { brain: 3, pugong: 2, doge: 1 } },
      ],
    },
    {
      id: 'me5', text: '你在群聊里的角色是？',
      emoji: '💬',
      options: [
        { text: '表情包供应商，不发文字只发表情', weights: { cat: 3, doge: 2, troll: 1 } },
        { text: '话题终结者，一发消息全场安静', weights: { brain: 3, pugong: 2, doge: 1 } },
        { text: '拱火大师，专门挑事', weights: { troll: 3, yelly: 2, cat: 1 } },
        { text: '潜水员，只看不说话', weights: { pugong: 3, brain: 2, doge: 1 } },
      ],
    },
    {
      id: 'me6', text: '你最喜欢的网络用语风格是？',
      emoji: '🗣️',
      options: [
        { text: "「Literally can't even」", weights: { yelly: 3, troll: 2, cat: 1 } },
        { text: '「Stonks」「Dogecoin to the moon」', weights: { stonks: 3, doge: 2, troll: 1 } },
        { text: '经典互联网缩写LOL/LMAO/BRB', weights: { pugong: 3, doge: 2, cat: 1 } },
        { text: '哲学/深奥的引用', weights: { brain: 3, stonks: 2, pugong: 1 } },
      ],
    },
    {
      id: 'me7', text: '当你看到有人犯错时，你会？',
      emoji: '🎪',
      options: [
        { text: '截图保存，做成meme', weights: { cat: 3, troll: 2, doge: 1 } },
        { text: '指出错误，教育TA', weights: { brain: 3, yelly: 2, pugong: 1 } },
        { text: '私聊提醒，给TA留面子', weights: { pugong: 3, brain: 2, doge: 1 } },
        { text: '无所谓，关我屁事', weights: { doge: 3, pugong: 2, troll: 1 } },
      ],
    },
    {
      id: 'me8', text: '你的笑点更接近哪种meme？',
      emoji: '😂',
      options: [
        { text: 'Absurdist/超现实meme', weights: { doge: 3, brain: 2, troll: 1 } },
        { text: 'Relatable/共鸣型meme', weights: { pugong: 3, cat: 2, doge: 1 } },
        { text: 'Satirical/讽刺型meme', weights: { troll: 3, brain: 2, yelly: 1 } },
        { text: 'Wholesome/治愈型meme', weights: { cat: 3, pugong: 2, doge: 1 } },
      ],
    },
    {
      id: 'me9', text: '你处理压力的方式是？',
      emoji: '💆',
      options: [
        { text: '制作/转发meme自嘲', weights: { cat: 3, doge: 2, troll: 1 } },
        { text: '分析压力来源，制定解决方案', weights: { brain: 3, stonks: 2, pugong: 1 } },
        { text: '大吃大喝/疯狂购物', weights: { yelly: 3, pugong: 2, cat: 1 } },
        { text: '躺平，什么都不做', weights: { doge: 3, pugong: 2, brain: 1 } },
      ],
    },
    {
      id: 'me10', text: '如果你能成为一张meme，你希望是哪张？',
      emoji: '🖼️',
      options: [
        { text: 'Stonks——永远向上', weights: { stonks: 3, brain: 2, doge: 1 } },
        { text: 'Doge——什么都不在乎', weights: { doge: 3, pugong: 2, cat: 1 } },
        { text: 'Woman yelling at cat——永远有戏', weights: { yelly: 3, troll: 2, cat: 1 } },
        { text: 'Galaxy brain——聪明绝顶', weights: { brain: 3, stonks: 2, pugong: 1 } },
      ],
    },
  ],
  results: {
    doge: {
      id: 'doge', title: 'Doge', subtitle: 'DOGE',
      description: '你是网络世界的Doge——什么都不在乎，wow。你对一切都保持一种「这有啥」的态度，不管是好事还是坏事。你的meme哲学是：Life is short, wow. 你可能是这个世界上最chill的人。',
      traits: ['什么都不在乎', '超chill', 'wow', '佛系天花板'],
      memeQuote: 'Much wow. Very chill.',
      mbtiHint: 'INFP / ISFP / ISTP',
      color: 'text-yellow-400', bgGradient: 'from-yellow-600 to-amber-700', emoji: '🐕', rarity: 'SSR',
      personaScene: { main: '🐕', companions: ['🚀', '💰', '🌕'], layout: 'orbit' },
    },
    cat: {
      id: 'cat', title: 'Smug Cat', subtitle: 'SMUG-CAT',
      description: '你是网络世界的Smug Cat——无辜但得意。你什么都不做，但你的存在本身就是嘲讽。你的表情在说：「我知道一切，但我懒得说」。你是网络meme中的智慧象征。',
      traits: ['无辜但得意', '什么都不做', '存在即嘲讽', '智慧象征'],
      memeQuote: 'I know everything, but I don\'t care.',
      mbtiHint: 'INTJ / INTP / ISTJ',
      color: 'text-teal-400', bgGradient: 'from-teal-700 to-cyan-800', emoji: '😺', rarity: 'SR',
      personaScene: { main: '😺', companions: ['😏', '🐱', '✨'], layout: 'stack' },
    },
    yelly: {
      id: 'yelly', title: 'Woman Yelling', subtitle: 'YELLY',
      description: '你是网络世界的Yelling Woman——永远在生气，永远在大声说话。你的情绪是外放的，你的愤怒是真实的。你可能被认为「drama queen」，但你只是不压抑自己。',
      traits: ['永远生气', '情绪外放', 'drama queen', '不压抑'],
      memeQuote: 'I AM NOT YELLING, THIS IS MY NORMAL VOICE!',
      mbtiHint: 'ESFP / ESTP / ENFP',
      color: 'text-red-400', bgGradient: 'from-red-700 to-orange-800', emoji: '😤', rarity: 'SR',
      personaScene: { main: '😤', companions: ['📢', '💢', '🙀'], layout: 'scatter' },
    },
    brain: {
      id: 'brain', title: 'Galaxy Brain', subtitle: 'BRAIN',
      description: '你是网络世界的Galaxy Brain——你以为你在第一层，实际上你在第五层。你过度思考一切，包括为什么自己会过度思考。你的脑子是宇宙的，但你的行动力是单细胞的。',
      traits: ['过度思考', '宇宙级脑子', '行动力零', '理论派'],
      memeQuote: 'My brain is expanding, but nothing is happening.',
      mbtiHint: 'INTP / INTJ / INFJ',
      color: 'text-violet-400', bgGradient: 'from-violet-700 to-purple-900', emoji: '🧠', rarity: 'SR',
      personaScene: { main: '🧠', companions: ['💡', '🌌', '⚡'], layout: 'orbit' },
    },
    stonks: {
      id: 'stonks', title: 'Stonks Man', subtitle: 'STONKS',
      description: '你是网络世界的Stonks Man——不管发生什么，你都在赢。亏损？那是「investment」。失败？那是「learning opportunity」。你的人生曲线永远是向上的，至少在PPT上是这样。',
      traits: ['永远向上', '乐观过度', '投资思维', 'PPT艺术家'],
      memeQuote: 'It\'s not a loss, it\'s a long-term investment!',
      mbtiHint: 'ENTJ / ESTJ / ENTP',
      color: 'text-green-400', bgGradient: 'from-green-700 to-emerald-800', emoji: '📈', rarity: 'SSR',
      personaScene: { main: '📈', companions: ['💰', '📊', '🚀'], layout: 'stack' },
    },
    troll: {
      id: 'troll', title: 'Trollface', subtitle: 'TROLL',
      description: '你是网络世界的Trollface——拱火是你的天职，挑事是你的爱好。你在网上说的一切都不是真心的，你只是为了看大家的反应。你是互联网的恶魔，但也是快乐的源泉。',
      traits: ['拱火大师', '挑事爱好', '不是真心', '快乐源泉'],
      memeQuote: 'I did it for the lulz.',
      mbtiHint: 'ENTP / ESTP / ENFP',
      color: 'text-orange-400', bgGradient: 'from-orange-700 to-red-800', emoji: '😈', rarity: 'SSR',
      personaScene: { main: '😈', companions: ['🔥', '🎣', '😂'], layout: 'scatter' },
    },
    pugong: {
      id: 'pugong', title: 'NPC', subtitle: 'NPC',
      description: '你是网络世界的NPC——你刷meme，你点赞，你转发，但你从不创造。你的存在让互联网更完整，但你不是主角。你可能会被忽略，但没有你，互联网就不完整。',
      traits: ['刷meme', '点赞转发', '不创造', '互联网拼图'],
      memeQuote: 'I am just here to scroll.',
      mbtiHint: 'ISFJ / ISTJ / ESFJ',
      color: 'text-slate-400', bgGradient: 'from-slate-600 to-gray-800', emoji: '🤖', rarity: 'N',
      personaScene: { main: '🤖', companions: ['👤', '📱', '💤'], layout: 'stack' },
    },
  },
  calculate: (answers) => calculateResult(memeTest, answers),
};
