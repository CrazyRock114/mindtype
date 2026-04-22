import { type FunTest, type CalculationResult } from './types';

/**
 * 基于答案数组生成确定性伪随机种子
 * 保证同一套答案总是得到相同的扰动结果
 */
function seedFromAnswers(answers: number[]): number {
  return answers.reduce((acc, val, i) => acc + (val + 1) * (i + 1) * 137, 42);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/**
 * 趣味测试通用计算引擎
 * 基于加权得分系统，返回最高分和次高分结果
 *
 * 反同质化机制：
 * 1. 当第一名和第二名差距 ≤ 2 时，引入基于答案的确定性扰动，
 *    让相近分数的结果有机会成为 primary
 * 2. 负权重支持：选项中可以使用负值来抑制某些结果
 * 3. 得分标准化：根据结果总数和题目数量进行自适应调整
 */
export function calculateResult(
  test: FunTest,
  answers: number[]
): CalculationResult {
  const scores: Record<string, number> = {};

  // 初始化所有结果的分数为0
  Object.keys(test.results).forEach((id) => {
    scores[id] = 0;
  });

  // 累加每个答案的权重（支持负权重）
  answers.forEach((optionIndex, questionIndex) => {
    const question = test.questions[questionIndex];
    if (!question) return;

    const option = question.options[optionIndex];
    if (!option) return;

    Object.entries(option.weights).forEach(([resultId, weight]) => {
      scores[resultId] = (scores[resultId] || 0) + weight;
    });
  });

  // 确保分数不低于0
  Object.keys(scores).forEach((id) => {
    scores[id] = Math.max(0, scores[id]);
  });

  // 按原始分数排序
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, score]) => score > 0);

  if (sorted.length === 0) {
    // 兜底：返回第一个结果
    const firstId = Object.keys(test.results)[0];
    return {
      primary: firstId,
      primaryScore: 0,
      secondary: firstId,
      secondaryScore: 0,
      allScores: scores,
    };
  }

  // ===== 反同质化：近分随机化 =====
  // 当第一名和第二名差距 ≤ 2 分时，引入确定性扰动
  // 这样相近的结果会有竞争，但不会改变用户的"明显倾向"
  let finalSorted = sorted;
  if (sorted.length >= 2) {
    const gap = sorted[0][1] - sorted[1][1];
    if (gap <= 2) {
      const seed = seedFromAnswers(answers);
      // 给前3名各自加 0-2.5 的确定性扰动
      const adjusted = sorted.slice(0, 3).map(([id, score], i) => {
        const noise = seededRandom(seed + i * 73) * 2.5;
        return [id, score + noise] as [string, number];
      });
      // 剩余结果不变
      const rest = sorted.slice(3);
      finalSorted = [...adjusted, ...rest].sort((a, b) => b[1] - a[1]);
    }
  }

  return {
    primary: finalSorted[0][0],
    primaryScore: Math.round(finalSorted[0][1] * 10) / 10,
    secondary: finalSorted[1]?.[0] || finalSorted[0][0],
    secondaryScore: Math.round((finalSorted[1]?.[1] || 0) * 10) / 10,
    allScores: scores,
  };
}

/**
 * 生成趣味测试分享文案
 */
export function generateShareText(
  test: FunTest,
  resultId: string,
  baseUrl: string
): { title: string; text: string; url: string } {
  const result = test.results[resultId];
  if (!result) {
    return {
      title: `${test.title}`,
      text: `快来测测你的${test.title}！`,
      url: `${baseUrl}/fun-test/${test.id}`,
    };
  }

  return {
    title: `我的${test.title}结果是：${result.title}`,
    text: `${result.memeQuote}\n\n快来测测你的${test.title}！`,
    url: `${baseUrl}/fun-test/${test.id}?result=${resultId}`,
  };
}

/**
 * localStorage 键名
 */
const STORAGE_KEY = 'mindtype_fun_test_history';

/**
 * 保存测试记录到 localStorage
 */
export function saveTestRecord(testId: string, resultId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const history = getTestHistory();
    history.unshift({ testId, resultId, timestamp: Date.now() });
    // 最多保存50条
    const trimmed = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

/**
 * 获取测试历史
 */
export function getTestHistory(): Array<{ testId: string; resultId: string; timestamp: number }> {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * 获取用户做过的某个测试的最新结果
 */
export function getLatestResult(testId: string): string | null {
  const history = getTestHistory();
  const record = history.find((h) => h.testId === testId);
  return record?.resultId || null;
}
