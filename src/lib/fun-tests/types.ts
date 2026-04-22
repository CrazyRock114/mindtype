/**
 * 趣味测试类型定义
 * 所有趣味测试共享此数据模型
 */

export interface FunTest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  emoji: string;
  themeColor: string;        // tailwind gradient class, e.g. "from-pink-500 to-purple-500"
  accentColor: string;       // tailwind text color, e.g. "text-pink-400"
  borderColor: string;       // tailwind border color, e.g. "border-pink-500/20"
  questionCount: number;
  estimatedTime: string;
  questions: FunQuestion[];
  results: Record<string, FunResult>;
  // 计算函数：根据答案数组返回结果ID
  calculate: (answers: number[]) => CalculationResult;
}

export interface FunQuestion {
  id: string;
  text: string;
  emoji?: string;
  options: FunOption[];
}

export interface FunOption {
  text: string;
  // 每个选项对不同结果的权重贡献
  // key: resultId, value: weight (通常 0-10)
  weights: Record<string, number>;
}

export interface FunResult {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  traits: string[];
  memeQuote: string;         // 一句梗/金句，用于分享
  mbtiHint: string;          // "你的正经MBTI可能是..."
  color: string;             // tailwind color class for result card
  bgGradient: string;        // tailwind gradient for share card
  emoji: string;
  rarity?: string;           // 稀有度标签，如 "SSR" "N"
}

export interface CalculationResult {
  primary: string;           // 主要结果ID
  primaryScore: number;      // 主要结果得分
  secondary: string;         // 次要结果ID（runner-up）
  secondaryScore: number;
  allScores: Record<string, number>;
}

/**
 * 用户测试记录（用于localStorage）
 */
export interface FunTestRecord {
  testId: string;
  resultId: string;
  timestamp: number;
}
