import { type FunTest } from '../types';
import { calculateResult } from '../engine';

/**
 * 韩综人格鉴定
 * 你在韩综里是什么角色？
 */
export const kvarietyTest: FunTest = {
  id: 'kvariety',
  title: '韩综人格鉴定',
  subtitle: '你在韩综里是什么角色？',
  description: '10道灵魂拷问，测出你的韩综人格。从Running Man的撕名牌王者到新西游记的综艺之神——这里没有剧本，只有你的真实反应。',
  category: '韩娱',
  emoji: '🇰🇷',
  themeColor: 'from-pink-500 via-rose-500 to-purple-600',
  accentColor: 'text-pink-400',
  borderColor: 'border-pink-500/20',
  questionCount: 10,
  estimatedTime: '2分钟',
  questions: [
    {
      id: 'k1', text: '组队做游戏时，你会？',
      emoji: '🏃',
      options: [
        { text: '冲在最前面，我要赢！', weights: { jingji: 3, mc: 2, pugong: 1 } },
        { text: '在后面搞笑，输赢不重要', weights: { gao: 3, pugong: 2, jingji: 1 } },
        { text: '默默配合队友，不抢风头', weights: { pugong: 3, tian: 2, gao: 1 } },
        { text: '暗中使坏，整蛊队友', weights: { jingji: 3, gao: 2, tian: 1 } },
      ],
    },
    {
      id: 'k2', text: '你吃东西的样子被镜头拍到，你会？',
      emoji: '🍽️',
      options: [
        { text: '吃得超香，导演夸我是吃播天才', weights: { gao: 3, pugong: 2, mc: 1 } },
        { text: '注意形象，小口慢咽', weights: { tian: 3, pugong: 2, jingji: 1 } },
        { text: '根本不在意镜头，该吃吃', weights: { gao: 3, jingji: 2, pugong: 1 } },
        { text: '故意做出夸张反应，制造笑点', weights: { gao: 3, mc: 2, pugong: 1 } },
      ],
    },
    {
      id: 'k3', text: '节目要求即兴表演，你的反应是？',
      emoji: '🎭',
      options: [
        { text: '立刻进入角色，影帝附体', weights: { mc: 3, gao: 2, jingji: 1 } },
        { text: '尴尬到脚趾抠地，想逃', weights: { pugong: 3, tian: 2, gao: 1 } },
        { text: '随便应付一下，赶紧结束', weights: { pugong: 3, jingji: 2, tian: 1 } },
        { text: '虽然尴尬但努力配合', weights: { tian: 3, pugong: 2, gao: 1 } },
      ],
    },
    {
      id: 'k4', text: '你的综艺定位更接近谁？',
      emoji: '🌟',
      options: [
        { text: '刘在石——控场大师，照顾所有人', weights: { mc: 3, tian: 2, pugong: 1 } },
        { text: '李光洙——倒霉蛋+搞笑担当', weights: { gao: 3, pugong: 2, jingji: 1 } },
        { text: '金钟国——能力者，只想赢', weights: { jingji: 3, mc: 2, gao: 1 } },
        { text: '宋智孝——懵智，存在感不高但意外有镜头', weights: { pugong: 3, tian: 2, gao: 1 } },
      ],
    },
    {
      id: 'k5', text: '节目PD突然让你做惩罚游戏，你会？',
      emoji: '⚡',
      options: [
        { text: '爽快接受，节目效果最重要', weights: { gao: 3, mc: 2, tian: 1 } },
        { text: '讨价还价，能不能轻一点', weights: { pugong: 3, tian: 2, gao: 1 } },
        { text: '拒绝，凭什么我做', weights: { jingji: 3, gao: 2, pugong: 1 } },
        { text: '虽然不愿意但默默接受', weights: { tian: 3, pugong: 2, gao: 1 } },
      ],
    },
    {
      id: 'k6', text: '你最想上的韩综是？',
      emoji: '📺',
      options: [
        { text: 'Running Man——撕名牌+游戏', weights: { jingji: 3, gao: 2, mc: 1 } },
        { text: '新西游记——搞笑+旅行', weights: { gao: 3, pugong: 2, tian: 1 } },
        { text: '认识的哥哥——谈话+才艺', weights: { mc: 3, gao: 2, pugong: 1 } },
        { text: '我独自生活——一个人也可以很好', weights: { pugong: 3, tian: 2, gao: 1 } },
      ],
    },
    {
      id: 'k7', text: '你和节目嘉宾发生了矛盾，你会？',
      emoji: '💥',
      options: [
        { text: '当场说出来，解决它', weights: { jingji: 3, mc: 2, gao: 1 } },
        { text: '忍下来，节目结束再说', weights: { tian: 3, pugong: 2, gao: 1 } },
        { text: '用搞笑化解尴尬', weights: { gao: 3, mc: 2, pugong: 1 } },
        { text: '假装没事，但记仇', weights: { pugong: 3, jingji: 2, gao: 1 } },
      ],
    },
    {
      id: 'k8', text: '节目收视率低迷，PD问你有没有好点子，你会？',
      emoji: '💡',
      options: [
        { text: '「让我来当MC，我carry全场」', weights: { mc: 3, jingji: 2, gao: 1 } },
        { text: '「增加惩罚游戏，越狠越好」', weights: { gao: 3, jingji: 2, mc: 1 } },
        { text: '「请大势嘉宾来救场」', weights: { pugong: 3, tian: 2, gao: 1 } },
        { text: '「我没想法，听PD的」', weights: { tian: 3, pugong: 2, gao: 1 } },
      ],
    },
    {
      id: 'k9', text: '你在节目里的名场面会是什么？',
      emoji: '🎬',
      options: [
        { text: '「我不干了！」撕掉名牌转身就走', weights: { jingji: 3, gao: 2, mc: 1 } },
        { text: '吃到美食时发出的「嗯~」声', weights: { gao: 3, pugong: 2, mc: 1 } },
        { text: '默默帮别人整理东西的暖心瞬间', weights: { tian: 3, pugong: 2, gao: 1 } },
        { text: '一本正经讲冷笑话结果全场安静', weights: { pugong: 3, gao: 2, tian: 1 } },
      ],
    },
    {
      id: 'k10', text: '如果只能在韩综里选一个人做朋友，你选？',
      emoji: '👫',
      options: [
        { text: '刘在石——可靠、温暖、永远支持你', weights: { mc: 3, tian: 2, pugong: 1 } },
        { text: '李光洙——搞笑、真诚、永远快乐', weights: { gao: 3, pugong: 2, tian: 1 } },
        { text: '姜虎东——大气、豪爽、保护欲强', weights: { mc: 3, jingji: 2, gao: 1 } },
        { text: '殷志源——随性、真实、不装', weights: { pugong: 3, gao: 2, tian: 1 } },
      ],
    },
  ],
  results: {
    mc: {
      id: 'mc', title: '综艺MC', subtitle: 'MC-MASTER',
      description: '你是天生的综艺MC——控场能力强，能照顾到每个人，总能在尴尬时刻化解气氛。你是团队的粘合剂，没有你的节目就像没有灵魂的躯壳。你就是刘在石本石。',
      traits: ['控场大师', '照顾所有人', '化解尴尬', '团队粘合剂'],
      memeQuote: '没关系，有我在。', mbtiHint: 'ENFJ / ESFJ / ENTJ',
      color: 'text-amber-400', bgGradient: 'from-amber-700 to-yellow-800', emoji: '🎤', rarity: 'SSR',
    },
    gao: {
      id: 'gao', title: '综艺之神', subtitle: 'VARIETY-GOD',
      description: '你是综艺之神眷顾的人——你什么都不用做就能制造笑点。你的倒霉、你的吃货属性、你的夸张反应都是天然的综艺素材。你就是李光洙本洙。',
      traits: ['天然笑点', '倒霉蛋', '吃货', '夸张反应'],
      memeQuote: '我也不知道为什么，但就是很好笑。', mbtiHint: 'ENFP / ESFP / ENTP',
      color: 'text-green-400', bgGradient: 'from-green-700 to-emerald-800', emoji: '😂', rarity: 'SSR',
    },
    jingji: {
      id: 'jingji', title: '胜负师', subtitle: 'WINNER',
      description: '你是综艺里的胜负师——你不在乎节目效果，只在乎输赢。你的眼里只有目标，为了赢你可以不择手段。你是节目的燃点，也是争议的焦点。你就是金钟国本钟。',
      traits: ['只想赢', '不择手段', '燃点担当', '争议焦点'],
      memeQuote: '给我赢！不择手段地赢！', mbtiHint: 'ENTJ / ESTJ / INTJ',
      color: 'text-red-400', bgGradient: 'from-red-700 to-orange-800', emoji: '🔥', rarity: 'SR',
    },
    tian: {
      id: 'tian', title: '天选之子', subtitle: 'CHOSEN-ONE',
      description: '你是综艺里的天选之子——你什么都不做就有镜头，你说什么都会被剪进正片。你的存在就是节目效果，你的笑容能治愈观众。你是被综艺之神选中的人。',
      traits: ['镜头磁铁', '治愈笑容', '不做也有效果', '天选之人'],
      memeQuote: '我也不知道为什么镜头总对着我。', mbtiHint: 'ISFJ / ESFJ / INFJ',
      color: 'text-pink-400', bgGradient: 'from-pink-600 to-rose-700', emoji: '✨', rarity: 'UR',
    },
    pugong: {
      id: 'pugong', title: '综艺背景板', subtitle: 'BACKGROUND',
      description: '你是综艺里的背景板——你不抢镜，不制造冲突，但你在场。你的存在让节目更完整，但你不是焦点。你可能会被剪掉很多镜头，但你依然是节目的一部分。',
      traits: ['不抢镜', '默默存在', '被剪辑对象', '节目拼图'],
      memeQuote: '虽然镜头少，但我也是一员。', mbtiHint: 'ISFJ / ISTJ / INFP',
      color: 'text-slate-400', bgGradient: 'from-slate-600 to-gray-800', emoji: '🧍', rarity: 'N',
    },
  },
  calculate: (answers) => calculateResult(kvarietyTest, answers),
};