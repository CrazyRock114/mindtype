import { SBTIQuestion, SBTIType } from '@/types';

export const sbtiQuestions: SBTIQuestion[] = [
  {
    id: 1,
    text: '如果有一天你突然变成了动物，你最想变成什么？',
    options: [
      { text: '一只每天睡觉20小时的考拉', score: 10, type: '宅神' },
      { text: '一只在天上自由飞翔的老鹰', score: 8, type: '梦想家' },
      { text: '一只每天到处蹭饭的流浪猫', score: 6, type: '社交达人' },
      { text: '一只被投喂的熊猫（国宝待遇）', score: 9, type: '人生赢家' }
    ]
  },
  {
    id: 2,
    text: '你的手机没电了，你会？',
    options: [
      { text: '太好了！终于可以远离手机了', score: 10, type: '反内卷达人' },
      { text: '到处找充电宝，离不开手机', score: 8, type: '科技依赖' },
      { text: '找个咖啡馆待着，顺便社交', score: 6, type: '社交蝴蝶' },
      { text: '回家睡觉，反正也没人找我', score: 9, type: '躺平大师' }
    ]
  },
  {
    id: 3,
    text: '周末早上被闹钟吵醒，你的第一反应是？',
    options: [
      { text: '关掉闹钟继续睡，天塌了也不管', score: 10, type: '睡眠冠军' },
      { text: '弹射起床，开始卷！', score: 3, type: '卷王之王' },
      { text: '躺着刷手机到中午', score: 8, type: '摸鱼高手' },
      { text: '看心情，心情好就起', score: 7, type: '随性而为' }
    ]
  },
  {
    id: 4,
    text: '朋友约你出去玩，你的回复是？',
    options: [
      { text: '去！必须去！走起！', score: 6, type: '社交狂魔' },
      { text: '让我想想...要不还是算了', score: 10, type: '社恐患者' },
      { text: '去的，但我要晚点到', score: 8, type: '迟到达人' },
      { text: '看情况，不一定', score: 7, type: '佛系玩家' }
    ]
  },
  {
    id: 5,
    text: '你的工作/学习状态是？',
    options: [
      { text: 'DDL是第一生产力，不到最后不动手', score: 10, type: '摸鱼狂人' },
      { text: '提前完成，享受悠闲', score: 6, type: '时间管理大师' },
      { text: '边做边焦虑，效率极低', score: 8, type: '焦虑星人' },
      { text: '永远在准备开始中', score: 9, type: '梦想家' }
    ]
  },
  {
    id: 6,
    text: '如果给你一个亿，你会？',
    options: [
      { text: '存银行吃利息，提前退休', score: 10, type: '理财大师' },
      { text: '辞职环游世界', score: 7, type: '冒险家' },
      { text: '买房买股票继续卷', score: 5, type: '卷王之王' },
      { text: '分给朋友，一起享受', score: 8, type: '社交达人' }
    ]
  },
  {
    id: 7,
    text: '你理想的食堂打饭方式是？',
    options: [
      { text: '随便打，吃什么都行', score: 10, type: '无欲无求' },
      { text: '挑食，只吃爱吃的', score: 6, type: '美食家' },
      { text: '最好有人帮我打好', score: 9, type: '生活不能自理' },
      { text: '我要最后一个打，能选最好的', score: 7, type: '心机Boy' }
    ]
  },
  {
    id: 8,
    text: '当你看到一个有创意的短视频时？',
    options: [
      { text: '一键三连，必须支持', score: 6, type: '键盘侠' },
      { text: '收藏吃灰，再也不看', score: 10, type: '收藏大师' },
      { text: '看完就忘，下一个', score: 8, type: '金鱼脑' },
      { text: '模仿拍一个超越它', score: 5, type: '卷王之王' }
    ]
  }
];

export const sbtiTypes: Record<string, SBTIType> = {
  '宅神': {
    type: '宅神',
    title: '超级无敌宅家大师',
    description: '你是居家旅行必备良品，外卖和快递是你最好的朋友。床就是你的宇宙中心，出门对你来说是一种修行。你的座右铭是：生命在于静止。',
    traits: ['超长待机', '外卖雷达', '床到沙发直通车', 'Wi-Fi是命'],
    celebrity: '你的偶像应该也是宅男/宅女吧'
  },
  '摸鱼狂人': {
    type: '摸鱼狂人',
    title: '摸鱼界的yyds',
    description: '你是时间管理大师，表面上在认真工作，实际上脑子已经在度假。你深谙「工作是为了更好的摸鱼」之道，是职场隐藏Boss。',
    traits: ['多线程操作', '眼神管理', '摸鱼姿势多样', '演技派'],
    celebrity: '恭喜你成为摸鱼界的顶流'
  },
  '社恐患者': {
    type: '社恐患者',
    title: '社恐本恐',
    description: '你是社交场合的小透明，能发消息绝不打电话，能打字绝不语音。出门社交对你来说比登天还难，但你内心世界丰富得很。',
    traits: ['已读不回', '表情包达人', '线上话痨', '线下哑巴'],
    celebrity: '社恐是你，独处是享受'
  },
  '躺平大师': {
    type: '躺平大师',
    title: '躺平学博士',
    description: '你深谙躺平之道，信奉「努力不一定成功，但不努力一定很舒服」的人生哲学。你是反内卷先锋，淡泊名利，与世无争。',
    traits: ['极简生活', '低欲望', '心态平和', '拒绝焦虑'],
    celebrity: '躺平是一种境界'
  },
  '卷王之王': {
    type: '卷王之王',
    title: '卷王本王',
    description: '什么？你居然在看SBTI测试，不去学习吗？你的日程表排得比高考倒计时还满，你是那个让同事和同学都感到压力的存在。',
    traits: ['时间精确到秒', '永远在学习', '焦虑源泉', '自律狂魔'],
    celebrity: '卷王不需要休息'
  },
  '社交达人': {
    type: '社交达人',
    title: '社交天花板',
    description: '你是人群中的小太阳，走到哪里都是焦点。你的微信好友5000+，你的朋友圈永远热闹。你的人生哲学是：多个朋友多条路。',
    traits: ['自来熟', '话多', '活动组织者', '人脉王'],
    celebrity: '朋友遍天下'
  },
  '梦想家': {
    type: '梦想家',
    title: '白日梦想家',
    description: '你的脑子里装满了各种奇思妙想，但往往想的比做的多。你是那个永远在计划但从未开始的人。不过梦想还是要有的，万一实现了呢？',
    traits: ['脑洞大', '执行力差', '爱好广泛', '三分钟热度'],
    celebrity: '想得美不如做得好'
  },
  '人生赢家': {
    type: '人生赢家',
    title: '天选之人',
    description: '你是被眷顾的宠儿，运气好到让人嫉妒。你不用太努力就能得到别人拼命追求的东西。你的存在本身就是一个传奇。',
    traits: ['运气爆棚', '被保护', '顺风顺水', '招人嫉妒'],
    celebrity: '老天爷追着喂饭'
  },
  '睡眠冠军': {
    type: '睡眠冠军',
    title: '睡觉协会会长',
    description: '你对睡觉的热爱到了登峰造极的地步。你的人生名言是：生前何必久睡，死后自会长眠。你每天都在和床进行深度约会。',
    traits: ['秒睡', '多梦', '起床困难', '睡眠质量MAX'],
    celebrity: '睡到天荒地老'
  },
  '随性而为': {
    type: '随性而为',
    title: '佛系本佛',
    description: '你是那种「都行，可以，没关系」的代言人。别人焦虑的事情你都觉得无所谓，你的人生信条是：船到桥头自然直。',
    traits: ['佛系', '不争不抢', '心态好', '选择困难'],
    celebrity: '一切随缘'
  }
};

export function calculateSBTI(answers: number[]): string {
  const scores = answers.map((answer, index) => {
    return sbtiQuestions[index]?.options[answer]?.type || '躺平大师';
  });

  const typeCount: Record<string, number> = {};
  scores.forEach(type => {
    typeCount[type] = (typeCount[type] || 0) + 1;
  });

  let maxType = '躺平大师';
  let maxCount = 0;
  Object.entries(typeCount).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  });

  return maxType;
}
