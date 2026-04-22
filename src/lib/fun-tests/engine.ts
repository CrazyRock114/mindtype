import { type FunTest, type CalculationResult } from './types';

/**
 * 趣味测试通用计算引擎
 * 基于加权得分系统，返回最高分和次高分结果
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

  // 累加每个答案的权重
  answers.forEach((optionIndex, questionIndex) => {
    const question = test.questions[questionIndex];
    if (!question) return;

    const option = question.options[optionIndex];
    if (!option) return;

    Object.entries(option.weights).forEach(([resultId, weight]) => {
      scores[resultId] = (scores[resultId] || 0) + weight;
    });
  });

  // 按分数排序
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

  return {
    primary: sorted[0][0],
    primaryScore: sorted[0][1],
    secondary: sorted[1]?.[0] || sorted[0][0],
    secondaryScore: sorted[1]?.[1] || 0,
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
