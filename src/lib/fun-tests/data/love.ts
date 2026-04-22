import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 恋爱脑CT扫描
 * 测测你的恋爱CPU占用率
 */
export const loveTest: FunTest = {
  id: 'love',
  title: '恋爱脑CT扫描',
  subtitle: '你的恋爱脑还有救吗？',
  description: '10道灵魂扫描，测出你的恋爱脑等级。从纯爱战神到海王之王，从清醒脑到恋爱癌晚期——这里没有狗粮，只有真相。',
  category: '恋爱',
  emoji: '💘',
  themeColor: 'from-pink-500 via-rose-500 to-red-600',
  accentColor: 'text-pink-400',
  borderColor: 'border-pink-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'l1', text: '看到前任发朋友圈和新对象合照，你的反应是？',
      emoji: '📸',
      options: [
        { text: '放大看细节，分析新对象哪里不如我', weights: { chunnao: 3, jiaolv: 2, qingxing: 1 } },
        { text: '点赞然后截图发给闺蜜/兄弟群吐槽', weights: { jiujing: 3, zhiqing: 2, tangping: 1 } },
        { text: '立刻屏蔽，眼不见心不烦', weights: { qingxing: 3, tangping: 2, jiujing: 1 } },
        { text: '深夜emo，翻遍所有聊天记录', weights: { chunnao: 3, jiaolv: 2, tian: 1 } },
      ],
    },
    {
      id: 'l2', text: '对象说「今晚加班不回家了」，你会？',
      emoji: '🏠',
      options: [
        { text: '送夜宵去TA公司查岗', weights: { chunnao: 3, jiaolv: 2, tian: 1 } },
        { text: '「好的，注意身体」然后自己嗨', weights: { qingxing: 3, tangping: 2, haizhu: 1 } },
        { text: '回「我也加班」然后真的去加班', weights: { juanwang: 3, qingxing: 2, tangping: 1 } },
        { text: '开始脑补TA出轨的100种剧情', weights: { jiaolv: 3, chunnao: 2, jiujing: 1 } },
      ],
    },
    {
      id: 'l3', text: '约会时对方手机一直响，你会？',
      emoji: '📱',
      options: [
        { text: '假装不在意，但余光一直瞟', weights: { jiaolv: 3, chunnao: 2, qingxing: 1 } },
        { text: '直接问「谁啊？这么重要？」', weights: { zhiqing: 3, fankang: 2, haizhu: 1 } },
        { text: '把自己的手机也拿出来开始刷', weights: { tangping: 3, qingxing: 2, jiujing: 1 } },
        { text: '趁TA去洗手间偷偷看锁屏', weights: { chunnao: 3, jiaolv: 2, tian: 1 } },
      ],
    },
    {
      id: 'l4', text: '你理想的爱情是？',
      emoji: '💕',
      options: [
        { text: '「你是我的唯一」灵魂伴侣型', weights: { chunnao: 3, tian: 2, jiaolv: 1 } },
        { text: '「一起变得更好」共同成长型', weights: { qingxing: 3, juanwang: 2, zhiqing: 1 } },
        { text: '「各自精彩，偶尔见面」独立型', weights: { haizhu: 3, tangping: 2, qingxing: 1 } },
        { text: '「及时行乐，活在当下」体验型', weights: { jiujing: 3, haizhu: 2, tangping: 1 } },
      ],
    },
    {
      id: 'l5', text: '对象忘记纪念日，你会？',
      emoji: '🎁',
      options: [
        { text: '暗示TA「今天是什么日子来着？」', weights: { jiaolv: 3, chunnao: 2, tian: 1 } },
        { text: '直接说「你忘了纪念日，我很难过」', weights: { qingxing: 3, zhiqing: 2, chunnao: 1 } },
        { text: '自己也忘了，然后一起笑', weights: { tangping: 3, jiujing: 2, qingxing: 1 } },
        { text: '记小本本上，下次吵架用', weights: { zhiqing: 3, jiaolv: 2, fankang: 1 } },
      ],
    },
    {
      id: 'l6', text: '朋友说你「恋爱脑」，你的反应是？',
      emoji: '🧠',
      options: [
        { text: '「我没有！我只是太爱TA了！」', weights: { chunnao: 3, jiaolv: 2, tian: 1 } },
        { text: '反思一下，好像确实有点', weights: { qingxing: 3, zhiqing: 2, tangping: 1 } },
        { text: '「恋爱脑怎么了？总比没恋爱好」', weights: { chunnao: 3, fankang: 2, jiujing: 1 } },
        { text: '「我清醒得很，只是演技好」', weights: { haizhu: 3, qingxing: 2, zhiqing: 1 } },
      ],
    },
    {
      id: 'l7', text: '分手后你会？',
      emoji: '💔',
      options: [
        { text: '立刻找新欢填补空虚', weights: { jiujing: 3, haizhu: 2, tangping: 1 } },
        { text: '哭三个月，然后突然想通', weights: { chunnao: 3, jiaolv: 2, tian: 1 } },
        { text: '分析失败原因，写一篇复盘', weights: { qingxing: 3, zhiqing: 2, juanwang: 1 } },
        { text: '无所谓，下一个更乖', weights: { haizhu: 3, tangping: 2, jiujing: 1 } },
      ],
    },
    {
      id: 'l8', text: '约会软件里，你最看重对方的？',
      emoji: '🔍',
      options: [
        { text: '颜值，第一眼感觉最重要', weights: { jiujing: 3, haizhu: 2, chunnao: 1 } },
        { text: '三观，聊得来才能走得远', weights: { qingxing: 3, zhiqing: 2, chunnao: 1 } },
        { text: '经济条件，贫贱夫妻百事哀', weights: { zhiqing: 3, juanwang: 2, qingxing: 1 } },
        { text: '有趣程度，无聊的人没法忍', weights: { jiujing: 3, tangping: 2, haizhu: 1 } },
      ],
    },
    {
      id: 'l9', text: '对象说「我们需要谈谈」，你的第一反应是？',
      emoji: '💬',
      options: [
        { text: '完了完了要分手了（开始脑补）', weights: { jiaolv: 3, chunnao: 2, tian: 1 } },
        { text: '「好啊，什么时候？」冷静应对', weights: { qingxing: 3, zhiqing: 2, tangping: 1 } },
        { text: '「谈什么？没什么好谈的」逃避', weights: { tangping: 3, jiujing: 2, haizhu: 1 } },
        { text: '先发制人「我也有话要说」', weights: { fankang: 3, zhiqing: 2, haizhu: 1 } },
      ],
    },
    {
      id: 'l10', text: '如果爱情有段位，你在哪个段位？',
      emoji: '🏆',
      options: [
        { text: '青铜——母胎solo/初恋还在', weights: { chunnao: 2, jiaolv: 2, qingxing: 1 } },
        { text: '黄金——谈过几次，还算清醒', weights: { qingxing: 3, zhiqing: 2, tangping: 1 } },
        { text: '钻石——恋爱经验丰富，游刃有余', weights: { haizhu: 3, jiujing: 2, zhiqing: 1 } },
        { text: '王者——海王/海后，鱼塘管理大师', weights: { haizhu: 3, jiujing: 2, tangping: 1 } },
      ],
    },
  ],
  results: {
    chunnao: {
      id: 'chunnao', title: '恋爱脑晚期', subtitle: 'CHUN-NAO',
      description: '你的大脑CPU 90%被恋爱占用，剩余10%用来想TA。你把对象当氧气，没有TA你会窒息。你所有的情绪波动都来自TA的回复速度。温馨提示：恋爱脑是病，得治。',
      traits: ['为爱痴狂', '情绪被对象操控', '失去自我', '恋爱即生活'],
      memeQuote: '没有TA的世界是灰色的。', mbtiHint: 'INFP / ENFP / ISFJ',
      color: 'text-pink-400', bgGradient: 'from-pink-600 to-rose-700', emoji: '🧠', rarity: 'SSR',
      personaScene: { main: '🧠', companions: ['💖', '🩸', '💘'], layout: 'orbit' },
    },
    qingxing: {
      id: 'qingxing', title: '清醒脑', subtitle: 'QING-XING',
      description: '你是恋爱界的诸葛亮，理性分析每一段关系。你不会为爱冲昏头脑，但也因此被说「太冷血」。你不是不会爱，你只是选择「聪明地爱」。',
      traits: ['理性分析', '独立人格', '情绪稳定', '冷静克制'],
      memeQuote: '恋爱可以，恋爱脑不行。', mbtiHint: 'INTJ / ENTJ / ISTJ',
      color: 'text-blue-400', bgGradient: 'from-blue-600 to-cyan-700', emoji: '🧊', rarity: 'SR',
      personaScene: { main: '🧊', companions: ['❄️', '🧠', '💎'], layout: 'stack' },
    },
    jiujing: {
      id: 'jiujing', title: '酒肉情侣', subtitle: 'JIU-JING',
      description: '你的恋爱哲学是「及时行乐，活在当下」。你不谈未来，只谈现在。你们一起喝酒、吃饭、旅行、享乐，但从不讨论「我们到底是什么关系」。',
      traits: ['及时行乐', '不谈未来', '享乐主义', '关系模糊'],
      memeQuote: '今朝有酒今朝醉，明天的事明天说。', mbtiHint: 'ESTP / ESFP / ENTP',
      color: 'text-amber-400', bgGradient: 'from-amber-600 to-yellow-700', emoji: '🍻', rarity: 'SR',
      personaScene: { main: '🍻', companions: ['🍷', '🥩', '🌙'], layout: 'scatter' },
    },
    haizhu: {
      id: 'haizhu', title: '海王/海后', subtitle: 'HAI-WANG',
      description: '你的鱼塘很大，里面养了很多鱼。你不是在谈恋爱，你是在做项目管理。你享受被喜欢的感觉，但拒绝被任何一个人绑定。你是爱情里的自由职业者。',
      traits: ['鱼塘管理', '拒绝绑定', '享受暧昧', '情感自由'],
      memeQuote: '我养鱼，但我每条鱼都知道我在养鱼。', mbtiHint: 'ENTP / ESTP / ENFP',
      color: 'text-purple-400', bgGradient: 'from-purple-600 to-violet-700', emoji: '🧜', rarity: 'SSR',
      personaScene: { main: '🧜', companions: ['🐟', '🐠', '🌊'], layout: 'orbit' },
    },
    tian: {
      id: 'tian', title: '纯爱战神', subtitle: 'CHUN-AI',
      description: '你相信一生一世一双人，为了爱情可以付出一切。你是恋爱脑里最纯粹的那种——不求回报，不计代价。在这个快餐爱情时代，你是稀世珍宝，也是最容易受伤的。',
      traits: ['为爱牺牲', '不计回报', '纯粹专一', '容易受伤'],
      memeQuote: '真爱就是：我愿意为你，付出一切。', mbtiHint: 'INFJ / INFP / ISFJ',
      color: 'text-red-400', bgGradient: 'from-red-600 to-pink-700', emoji: '⚔️', rarity: 'UR',
      personaScene: { main: '⚔️', companions: ['💖', '🛡️', '✨'], layout: 'orbit' },
    },
    jiaolv: {
      id: 'jiaolv', title: '恋爱焦虑者', subtitle: 'JIAO-LV',
      description: '你24小时处于恋爱警戒状态：TA为什么不回消息？TA是不是不爱我了？TA是不是在和别人聊天？你的恋爱不是在谈，是在监控。',
      traits: ['患得患失', '消息焦虑', '控制欲', '安全感缺失'],
      memeQuote: 'TA已读不回的3小时，我已经写好遗书了。', mbtiHint: 'ISFJ / INFJ / ENFJ',
      color: 'text-orange-400', bgGradient: 'from-orange-600 to-red-700', emoji: '😰', rarity: 'R',
      personaScene: { main: '😰', companions: ['📱', '⏰', '💔'], layout: 'scatter' },
    },
    zhiqing: {
      id: 'zhiqing', title: '清醒恋爱者', subtitle: 'ZHI-QING',
      description: '你既会爱，也会保护自己。你不会恋爱脑，但也不是冷血。你知道爱情需要经营，也知道什么时候该放手。你是恋爱市场里的理性投资者。',
      traits: ['理性投资', '有进有退', '成熟稳重', '清醒经营'],
      memeQuote: '我爱TA，但更爱我自己。', mbtiHint: 'INTJ / ENTJ / ISTP',
      color: 'text-cyan-400', bgGradient: 'from-cyan-600 to-teal-700', emoji: '💎', rarity: 'SR',
      personaScene: { main: '💎', companions: ['🧠', '❤️', '⚖️'], layout: 'stack' },
    },
    tangping: {
      id: 'tangping', title: '恋爱躺平人', subtitle: 'LIAN-TANG',
      description: '你对恋爱没什么热情，有人来就来，没人来就单着。你不主动，不拒绝，不负责。你的恋爱状态是薛定谔的——在谈和没谈之间。',
      traits: ['佛系恋爱', '不主动', '不负责', '顺其自然'],
      memeQuote: '爱情？有就有，没有就算了。', mbtiHint: 'INTP / INFP / ISTP',
      color: 'text-green-400', bgGradient: 'from-green-600 to-emerald-700', emoji: '🛌', rarity: 'R',
      personaScene: { main: '🛌', companions: ['💤', '📱', '🌸'], layout: 'stack' },
    },
    fankang: {
      id: 'fankang', title: '反PUA斗士', subtitle: 'FAN-PUA',
      description: '你对恋爱套路免疫，一眼看穿对方的PUA手段。你不吃画饼，不听鸡汤，不被道德绑架。你是恋爱市场里的防骗专家。',
      traits: ['反套路', '防骗雷达', '独立自强', '不吃饼'],
      memeQuote: '想PUA我？先去练练段位。', mbtiHint: 'ENTJ / ESTJ / ENTP',
      color: 'text-red-400', bgGradient: 'from-red-600 to-orange-700', emoji: '🛡️', rarity: 'SR',
      personaScene: { main: '🛡️', companions: ['⚔️', '🚫', '💪'], layout: 'orbit' },
    },
    juanwang: {
      id: 'juanwang', title: '事业爱情双卷王', subtitle: 'SHUANG-JUAN',
      description: '你不仅在事业上卷，在爱情里也卷。你会给对象做Excel表格记录纪念日，会研究恋爱心理学提升「用户体验」。你把恋爱当项目来管理。',
      traits: ['恋爱项目管理', '仪式感MAX', '卷王本王', '细节控'],
      memeQuote: '谈恋爱也要KPI，不然怎么进步？', mbtiHint: 'ENTJ / ESTJ / ISTJ',
      color: 'text-yellow-400', bgGradient: 'from-yellow-600 to-amber-700', emoji: '📊', rarity: 'SSR',
      personaScene: { main: '📊', companions: ['📈', '💼', '⏰'], layout: 'scatter' },
    },
  },
  calculate: (answers) => calculateResult(loveTest, answers),
};
