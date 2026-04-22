import { type FunTest } from './types';
import { mindTest } from './data/mind';
import { workTest } from './data/work';
import { loveTest } from './data/love';
import { socialTest } from './data/social';
import { foodTest } from './data/food';
import { animalTest } from './data/animal';
import { studentTest } from './data/student';
import { overseaTest } from './data/oversea';
import { cyberTest } from './data/cyber';
import { kvarietyTest } from './data/kvariety';
import { animeTest } from './data/anime';
import { memeTest } from './data/meme';

// 所有趣味测试的注册表
export const funTests: Record<string, FunTest> = {
  [mindTest.id]: mindTest,
  [workTest.id]: workTest,
  [loveTest.id]: loveTest,
  [socialTest.id]: socialTest,
  [foodTest.id]: foodTest,
  [animalTest.id]: animalTest,
  [studentTest.id]: studentTest,
  [overseaTest.id]: overseaTest,
  [cyberTest.id]: cyberTest,
  [kvarietyTest.id]: kvarietyTest,
  [animeTest.id]: animeTest,
  [memeTest.id]: memeTest,
};

// 测试列表（用于首页展示）
export const funTestList = Object.values(funTests);

// 分类映射
export const categoryLabels: Record<string, string> = {
  '发疯文学': '🔥 热门',
  '职场': '💼 职场',
  '恋爱': '💘 恋爱',
  '社交': '🗣️ 社交',
  '生活': '🍜 生活',
  '趣味': '🎭 趣味',
  '学生': '🎓 学生',
  '留学': '🛫 留学',
  '赛博': '💻 赛博',
  '韩娱': '🇰🇷 韩娱',
  '二次元': '🎌 二次元',
  'Meme': '🐸 Meme',
};

// 获取测试
export function getFunTest(id: string): FunTest | undefined {
  return funTests[id];
}

// 稀有度颜色
export const rarityColors: Record<string, string> = {
  'N': 'text-slate-400 bg-slate-500/20',
  'R': 'text-blue-400 bg-blue-500/20',
  'SR': 'text-purple-400 bg-purple-500/20',
  'SSR': 'text-amber-400 bg-amber-500/20',
  'UR': 'text-red-400 bg-red-500/20',
};

export { type FunTest, type FunQuestion, type FunOption, type FunResult, type CalculationResult } from './types';
export { calculateResult, generateShareText, saveTestRecord, getTestHistory, getLatestResult } from './engine';
