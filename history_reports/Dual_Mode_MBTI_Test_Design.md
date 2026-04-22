# 双模式MBTI测试设计方案

**文档版本：** v1.0  
**编写日期：** 2026年4月14日  
**目标：** 设计快速版（10题）和精准版（96题）两套测试，满足不同场景需求

---

## 一、设计原则

### 1.1 双模式定位

| 维度 | AI快速预测（10题） | 96题精准测试 |
|------|-------------------|--------------|
| **目标场景** | 引流、快速体验 | 深度分析、付费转化 |
| **用户心态** | 好奇、想快速了解 | 认真、寻求准确结果 |
| **用时** | 3-5分钟 | 15-20分钟 |
| **准确度** | 70-80% | 90-95% |
| **成本** | 低（AI推理） | 中（题目版权+计算） |
| **商业模式** | 免费，引导至精准版 | 免费测试，付费看完整报告 |

### 1.2 核心设计理念

```
快速版 = AI预测模型 + 精简题库 + 用户画像辅助
精准版 = 标准MBTI题库 + 认知功能测试 + 详细维度分析
```

---

## 二、AI快速预测版（10题）

### 2.1 测试流程

```
用户进入 → 选择快速测试 → 
AI动态出题（每题基于前一题答案调整）→ 
10题完成 → AI综合分析 → 给出MBTI预测 + 置信度 → 
引导完成96题精准版（可选）
```

### 2.2 题目设计策略

#### **题目选择算法**

```typescript
interface QuestionStrategy {
  // 第一题：开放式场景，快速定位大致倾向
  initialQuestion: Question;
  
  // 后续9题：基于前面答案动态调整
  adaptiveQuestions: (previousAnswers: Answer[]) => Question[];
}

// 决策树逻辑
const DECISION_TREE = {
  // E/I 维度判断（2题）
  EI: {
    q1: "周末你更倾向于：A.和朋友聚会 B.独自看书",
    q2: (prev) => prev === 'A' ? "聚会后你的感受：A.充能 B.疲惫" : "独处时你的感受：A.享受 B.寂寞"
  },
  
  // S/N 维度判断（2题）
  SN: {
    q1: "你更关注：A.具体事实和细节 B.整体模式和可能性",
    q2: (prev) => prev === 'A' ? "做决定时你更依赖：A.过往经验 B.直觉预感" : "描述事物时你更倾向于：A.使用比喻 B.直接陈述"
  },
  
  // T/F 维度判断（2题）
  TF: {
    q1: "朋友遇到问题时，你通常会：A.帮TA分析问题 B.先倾听和安慰",
    q2: (prev) => prev === 'A' ? "你更重视：A.逻辑和公平 B.和谐和感受" : "评价一件事时，你更看重：A.客观结果 B.对人的影响"
  },
  
  // J/P 维度判断（2题）
  JP: {
    q1: "你的工作/生活空间通常是：A.整洁有序 B.随性而为",
    q2: (prev) => prev === 'A' ? "旅行前你会：A.详细规划行程 B.大致定个方向" : "面对截止日期，你通常：A.提前完成 B.最后冲刺"
  },
  
  // 验证题（2题，交叉验证）
  VALIDATION: ["综合验证题1", "综合验证题2"]
};
```

### 2.3 完整题库（10题）

```typescript
const FAST_TEST_QUESTIONS: Question[] = [
  {
    id: 'fast_q1',
    dimension: 'EI',
    question: '在一场大型社交活动后，你的感觉通常是？',
    options: [
      { key: 'E', text: '感到兴奋和充满能量，想继续社交', weight: 1.0 },
      { key: 'I', text: '感到有些疲惫，需要独处恢复', weight: 1.0 },
      { key: 'N', text: '取决于活动和遇到的人', weight: 0.5 }
    ],
    category: 'energy_source'
  },
  {
    id: 'fast_q2',
    dimension: 'EI',
    question: '当你需要解决一个难题时，你更倾向于？',
    options: [
      { key: 'E', text: '找朋友讨论，在交流中理清思路', weight: 1.0 },
      { key: 'I', text: '独自思考，在安静中深入分析', weight: 1.0 }
    ],
    category: 'processing_style'
  },
  {
    id: 'fast_q3',
    dimension: 'SN',
    question: '描述一个你刚去过的地方时，你更可能提到？',
    options: [
      { key: 'S', text: '具体的细节：装饰、温度、食物的味道', weight: 1.0 },
      { key: 'N', text: '整体的印象：氛围、感觉、联想到的事物', weight: 1.0 }
    ],
    category: 'information_gathering'
  },
  {
    id: 'fast_q4',
    dimension: 'SN',
    question: '学习新技能时，你更喜欢？',
    options: [
      { key: 'S', text: '按部就班，从基础开始实践', weight: 1.0 },
      { key: 'N', text: '先了解整体框架，再填充细节', weight: 1.0 }
    ],
    category: 'learning_style'
  },
  {
    id: 'fast_q5',
    dimension: 'TF',
    question: '朋友向你倾诉感情困扰，你的第一反应是？',
    options: [
      { key: 'T', text: '分析问题原因，提供解决建议', weight: 1.0 },
      { key: 'F', text: '倾听和共情，让TA感到被理解', weight: 1.0 }
    ],
    category: 'decision_making'
  },
  {
    id: 'fast_q6',
    dimension: 'TF',
    question: '在做重要决定时，你更依赖？',
    options: [
      { key: 'T', text: '逻辑分析、利弊权衡、客观标准', weight: 1.0 },
      { key: 'F', text: '个人价值观、对他人的影响、内心感受', weight: 1.0 }
    ],
    category: 'decision_criteria'
  },
  {
    id: 'fast_q7',
    dimension: 'JP',
    question: '你的日常生活更倾向于？',
    options: [
      { key: 'J', text: '有计划、有条理，喜欢提前安排', weight: 1.0 },
      { key: 'P', text: '灵活应变，根据当下感觉调整', weight: 1.0 }
    ],
    category: 'lifestyle'
  },
  {
    id: 'fast_q8',
    dimension: 'JP',
    question: '面对一个长期项目，你通常会？',
    options: [
      { key: 'J', text: '制定详细计划，按阶段推进', weight: 1.0 },
      { key: 'P', text: '设定大致方向，边做边调整', weight: 1.0 }
    ],
    category: 'planning_style'
  },
  {
    id: 'fast_q9',
    dimension: 'VALIDATION',
    question: '以下哪种描述更符合你的性格？',
    options: [
      { key: 'ET', text: '外向且理性，喜欢挑战和竞争', weight: 1.0 },
      { key: 'EF', text: '外向且感性，重视人际和谐', weight: 1.0 },
      { key: 'IT', text: '内向且理性，追求深度和精准', weight: 1.0 },
      { key: 'IF', text: '内向且感性，注重内心价值观', weight: 1.0 }
    ],
    category: 'cross_validation'
  },
  {
    id: 'fast_q10',
    dimension: 'VALIDATION',
    question: '在压力情况下，你更可能？',
    options: [
      { key: 'SJ', text: '依靠过往经验，按既定流程处理', weight: 1.0 },
      { key: 'SP', text: '灵活应对，寻找即时解决方案', weight: 1.0 },
      { key: 'NJ', text: '思考长远影响，制定应对策略', weight: 1.0 },
      { key: 'NP', text: '探索多种可能，尝试创新方法', weight: 1.0 }
    ],
    category: 'stress_response'
  }
];
```

### 2.4 AI预测算法

```typescript
interface PredictionResult {
  mbtiType: string;           // 预测的MBTI类型
  confidence: number;         // 置信度（0-1）
  dimensionScores: {          // 各维度得分
    EI: { E: number; I: number };
    SN: { S: number; N: number };
    TF: { T: number; F: number };
    JP: { J: number; P: number };
  };
  reasoning: string;          // AI推理过程
  suggestions: string[];      // 建议完成的精准测试重点
}

async function predictMBTI(answers: Answer[]): Promise<PredictionResult> {
  // 1. 基础计分
  const scores = calculateDimensionScores(answers);
  
  // 2. 构建Prompt让AI进行深度分析
  const analysisPrompt = `
你是一位专业的MBTI分析师。请根据用户的10个测试答案，预测其MBTI类型。

用户答案：
${answers.map(a => `Q${a.questionId}: 选择${a.selectedOption}`).join('\n')}

基础维度得分：
- E/I: E=${scores.EI.E}, I=${scores.EI.I}
- S/N: S=${scores.SN.S}, N=${scores.SN.N}
- T/F: T=${scores.TF.T}, F=${scores.TF.F}
- J/P: J=${scores.JP.J}, P=${scores.JP.P}

请分析：
1. 用户的MBTI类型是什么？（4字母）
2. 置信度是多少？（0-100%，考虑答案一致性）
3. 哪些维度的倾向不够明确？
4. 建议用户在96题精准测试中重点关注哪些维度？

输出JSON格式：
{
  "mbtiType": "INTJ",
  "confidence": 0.85,
  "dimensionAnalysis": {
    "EI": { "tendency": "I", "strength": "strong" },
    "SN": { "tendency": "N", "strength": "moderate" },
    "TF": { "tendency": "T", "strength": "strong" },
    "JP": { "tendency": "J", "strength": "weak" }
  },
  "reasoning": "分析过程...",
  "suggestions": ["建议关注J/P维度的区分"]
}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: analysisPrompt }],
    response_format: { type: 'json_object' },
    temperature: 0.3
  });

  return JSON.parse(response.choices[0].message.content);
}
```

### 2.5 结果展示设计

```typescript
interface FastTestResult {
  mbtiType: string;
  confidence: number;
  briefDescription: string;
  keyTraits: string[];
  careerMatch: string[];
  nextSteps: {
    action: 'take_precise_test' | 'view_basic_report' | 'chat_with_ai';
    label: string;
    benefit: string;
  }[];
}

// 结果页展示逻辑
const RESULT_DISPLAY = {
  // 置信度 > 80%：强推荐，直接展示详细结果
  HIGH_CONFIDENCE: {
    message: '根据您的回答，我们高度确信您是 {{type}} 型人格',
    primaryCTA: '查看详细解读',
    secondaryCTA: '与AI咨询师深入探讨',
    showTraits: true,
    showCareer: true
  },
  
  // 置信度 60-80%：中等，建议完成精准版
  MEDIUM_CONFIDENCE: {
    message: '您可能是 {{type}} 型人格，但某些维度特征不够明显',
    primaryCTA: '完成96题精准测试（免费）',
    secondaryCTA: '先查看初步解读',
    showTraits: true,
    showCareer: false,
    highlightUncertainty: true
  },
  
  // 置信度 < 60%：低，强烈建议完成精准版
  LOW_CONFIDENCE: {
    message: '您的答案显示出较为平衡的性格特征',
    primaryCTA: '完成96题精准测试获取准确结果',
    secondaryCTA: '重新进行快速测试',
    showTraits: false,
    showCareer: false
  }
};
```

---

## 三、96题精准测试版

### 3.1 测试结构设计

```
96题 = 24题×4维度（每个维度6题正测 + 6题反测）

每维度分配：
- E/I 维度：24题
- S/N 维度：24题  
- T/F 维度：24题
- J/P 维度：24题

额外：
- 8题认知功能测试（Ni/Ne/Si/Se/Fi/Fe/Ti/Te）
```

### 3.2 题目来源与版权

| 来源 | 题目数量 | 版权状态 | 说明 |
|------|----------|----------|------|
| Sakinorva认知功能测试 | 48题 | 公开/免费 | 开源MBTI测试，认知功能维度 |
| 自编题目 | 32题 | 自有版权 | 针对四大场景优化的情境题 |
| 16Personalities风格改编 | 16题 | 需原创 | 参考风格，完全重新编写 |

### 3.3 完整题库结构（示例）

```typescript
// E/I 维度题目（24题）
const EI_QUESTIONS: Question[] = [
  // 能量来源（6题）
  {
    id: 'ei_q1',
    dimension: 'EI',
    aspect: 'energy_source',
    direction: 'positive',
    question: '在社交聚会中，你通常会：',
    options: [
      { text: '主动与多人交流，享受热闹氛围', score: 3, type: 'E' },
      { text: '与少数几个熟人深入交谈', score: 1, type: 'E' },
      { text: '找个安静的角落观察', score: 1, type: 'I' },
      { text: '提前离开，回家独处', score: 3, type: 'I' }
    ]
  },
  {
    id: 'ei_q2',
    dimension: 'EI',
    aspect: 'energy_source',
    direction: 'positive',
    question: '连续工作一周后，理想的周末是：',
    options: [
      { text: '组织或参加聚会，与朋友狂欢', score: 3, type: 'E' },
      { text: '约一两个好友吃顿饭', score: 1, type: 'E' },
      { text: '在家看书、看电影，享受独处', score: 1, type: 'I' },
      { text: '完全不安排社交活动，独自充电', score: 3, type: 'I' }
    ]
  },
  
  // 思考方式（6题）
  {
    id: 'ei_q3',
    dimension: 'EI',
    aspect: 'processing',
    direction: 'positive',
    question: '面对一个复杂问题时，你更倾向于：',
    options: [
      { text: '立即找人讨论，在交流中理清思路', score: 3, type: 'E' },
      { text: '先自己思考一段时间，再与他人讨论', score: 1, type: 'E' },
      { text: '独自深入思考，必要时才寻求帮助', score: 1, type: 'I' },
      { text: '完全独自解决，不希望被打扰', score: 3, type: 'I' }
    ]
  },
  
  // 行动风格（6题）
  // ...
  
  // 社交偏好（6题 - 反向测试）
  {
    id: 'ei_q7',
    dimension: 'EI',
    aspect: 'social_preference',
    direction: 'reverse',
    question: '你不喜欢成为人群中的焦点。',
    options: [
      { text: '完全不同意', score: 3, type: 'E' },
      { text: '不太同意', score: 1, type: 'E' },
      { text: '比较同意', score: 1, type: 'I' },
      { text: '完全同意', score: 3, type: 'I' }
    ]
  }
];

// S/N 维度题目（24题）
const SN_QUESTIONS: Question[] = [
  // 信息获取（6题）
  {
    id: 'sn_q1',
    dimension: 'SN',
    aspect: 'information',
    direction: 'positive',
    question: '阅读一篇文章时，你更关注：',
    options: [
      { text: '具体的事实、数据和细节描述', score: 3, type: 'S' },
      { text: '实际案例和可操作的步骤', score: 1, type: 'S' },
      { text: '整体的观点和背后的意义', score: 1, type: 'N' },
      { text: '未来的可能性和创新想法', score: 3, type: 'N' }
    ]
  },
  
  // 认知方式（6题）
  {
    id: 'sn_q2',
    dimension: 'SN',
    aspect: 'cognition',
    direction: 'positive',
    question: '你更倾向于信任：',
    options: [
      { text: '经验证的事实和确凿的证据', score: 3, type: 'S' },
      { text: '过往的成功经验', score: 1, type: 'S' },
      { text: '直觉和第六感', score: 1, type: 'N' },
      { text: '灵感和顿悟', score: 3, type: 'N' }
    ]
  },
  
  // ... 其他S/N题目
];

// T/F 维度题目（24题）
const TF_QUESTIONS: Question[] = [
  {
    id: 'tf_q1',
    dimension: 'TF',
    aspect: 'decision_making',
    direction: 'positive',
    question: '在做重要决定时，你更看重：',
    options: [
      { text: '逻辑分析和客观标准', score: 3, type: 'T' },
      { text: '公平性和一致性', score: 1, type: 'T' },
      { text: '对他人的影响和感受', score: 1, type: 'F' },
      { text: '个人价值观和内心和谐', score: 3, type: 'F' }
    ]
  },
  // ...
];

// J/P 维度题目（24题）
const JP_QUESTIONS: Question[] = [
  {
    id: 'jp_q1',
    dimension: 'JP',
    aspect: 'lifestyle',
    direction: 'positive',
    question: '你的桌面/工作空间通常是：',
    options: [
      { text: '整洁有序，每样东西都有固定位置', score: 3, type: 'J' },
      { text: '大致整齐，偶尔有些凌乱', score: 1, type: 'J' },
      { text: '随性摆放，能找到东西就行', score: 1, type: 'P' },
      { text: '杂乱无章，但我有自己的"系统"', score: 3, type: 'P' }
    ]
  },
  // ...
];

// 认知功能测试（8题）
const COGNITIVE_FUNCTION_QUESTIONS: Question[] = [
  {
    id: 'cf_q1',
    function: 'Ni',
    question: '你经常在没有明显证据的情况下，对未来趋势有准确的预感。',
    options: [
      { text: '完全不符合', score: 1 },
      { text: '不太符合', score: 2 },
      { text: '比较符合', score: 3 },
      { text: '非常符合', score: 4 }
    ]
  },
  {
    id: 'cf_q2',
    function: 'Ne',
    question: '你能轻松地从一件事联想到多种可能性和关联。',
    options: [
      { text: '完全不符合', score: 1 },
      { text: '不太符合', score: 2 },
      { text: '比较符合', score: 3 },
      { text: '非常符合', score: 4 }
    ]
  }
  // ... 其他认知功能题目
];
```

### 3.4 计分算法

```typescript
interface DimensionScore {
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  left: { type: 'E' | 'S' | 'T' | 'J'; score: number; percentage: number };
  right: { type: 'I' | 'N' | 'F' | 'P'; score: number; percentage: number };
  strength: 'slight' | 'moderate' | 'clear' | 'very_clear';
}

function calculateDimensionScore(answers: Answer[]): DimensionScore[] {
  const dimensions = ['EI', 'SN', 'TF', 'JP'] as const;
  
  return dimensions.map(dim => {
    const dimAnswers = answers.filter(a => a.dimension === dim);
    
    let leftScore = 0;
    let rightScore = 0;
    let maxPossible = 0;
    
    dimAnswers.forEach(answer => {
      const option = answer.selectedOption;
      maxPossible += 3; // 每题最高分3分
      
      if (['E', 'S', 'T', 'J'].includes(option.type)) {
        leftScore += option.score;
      } else {
        rightScore += option.score;
      }
    });
    
    const total = leftScore + rightScore;
    const leftPercentage = (leftScore / total) * 100;
    const rightPercentage = (rightScore / total) * 100;
    
    // 确定倾向强度
    const diff = Math.abs(leftPercentage - rightPercentage);
    let strength: DimensionScore['strength'];
    if (diff <= 10) strength = 'slight';
    else if (diff <= 25) strength = 'moderate';
    else if (diff <= 40) strength = 'clear';
    else strength = 'very_clear';
    
    return {
      dimension: dim,
      left: { 
        type: dim === 'EI' ? 'E' : dim === 'SN' ? 'S' : dim === 'TF' ? 'T' : 'J',
        score: leftScore, 
        percentage: leftPercentage 
      },
      right: { 
        type: dim === 'EI' ? 'I' : dim === 'SN' ? 'N' : dim === 'TF' ? 'F' : 'P',
        score: rightScore, 
        percentage: rightPercentage 
      },
      strength
    };
  });
}

function determineMBTIType(scores: DimensionScore[]): string {
  return scores.map(s => {
    return s.left.percentage > s.right.percentage ? s.left.type : s.right.type;
  }).join('');
}

// 认知功能堆栈分析
function analyzeCognitiveFunctions(answers: Answer[]): CognitiveStack {
  const functionScores = {
    Ni: 0, Ne: 0, Si: 0, Se: 0,
    Fi: 0, Fe: 0, Ti: 0, Te: 0
  };
  
  answers.filter(a => a.function).forEach(answer => {
    functionScores[answer.function] += answer.selectedOption.score;
  });
  
  // 排序得到认知功能堆栈
  const sorted = Object.entries(functionScores)
    .sort((a, b) => b[1] - a[1])
    .map(([fn, score]) => ({ function: fn, score }));
  
  return {
    dominant: sorted[0],
    auxiliary: sorted[1],
    tertiary: sorted[2],
    inferior: sorted[7]
  };
}
```

### 3.5 进度管理与用户体验

```typescript
// 分阶段测试设计
const TEST_STRUCTURE = {
  sections: [
    { id: 'ei', name: '能量来源', questions: 24, time: '4-5分钟' },
    { id: 'sn', name: '认知方式', questions: 24, time: '4-5分钟' },
    { id: 'tf', name: '决策风格', questions: 24, time: '4-5分钟' },
    { id: 'jp', name: '生活态度', questions: 24, time: '4-5分钟' }
  ],
  
  // 保存进度
  saveProgress: (userId: string, sectionIndex: number, answers: Answer[]) => {
    localStorage.setItem(`mbti_progress_${userId}`, JSON.stringify({
      sectionIndex,
      answers,
      timestamp: Date.now()
    }));
  },
  
  // 恢复进度
  loadProgress: (userId: string) => {
    const saved = localStorage.getItem(`mbti_progress_${userId}`);
    return saved ? JSON.parse(saved) : null;
  }
};

// UI组件设计
interface TestProgressUI {
  currentSection: number;
  totalSections: number;
  currentQuestion: number;
  totalQuestions: number;
  percentage: number;
  estimatedTimeRemaining: string;
}
```

---

## 四、两套测试的协同设计

### 4.1 用户旅程

```
流量入口
    │
    ▼
┌─────────────────┐
│   快速测试      │  ← 3-5分钟，免费
│   (10题)        │
└────────┬────────┘
         │
         ├─→ 置信度高 ──→ 展示结果 ──→ 引导深入咨询
         │
         ├─→ 置信度中 ──→ 建议精准测试 ──→ 转化至96题
         │
         └─→ 置信度低 ──→ 强烈建议精准测试 ──→ 转化至96题
                           │
                           ▼
                    ┌─────────────────┐
                    │   精准测试       │  ← 15-20分钟，免费测试
                    │   (96题)        │     完整报告付费解锁
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   完整报告       │  ← 付费转化点
                    │   + AI咨询       │
                    └─────────────────┘
```

### 4.2 数据打通

```typescript
// 快速测试结果导入精准测试
function importFastTestResults(fastResult: FastTestResult): TestContext {
  return {
    prefillAnswers: [],
    highlightedDimensions: fastResult.uncertainDimensions,
    suggestions: fastResult.suggestions,
    estimatedTimeAdjustment: '-3分钟（基于快速测试结果）'
  };
}

// 两套测试结果的融合算法
function mergeTestResults(
  fastResult: FastTestResult,
  preciseResult: PreciseTestResult
): FinalResult {
  // 如果结果一致，提高置信度
  if (fastResult.mbtiType === preciseResult.mbtiType) {
    return {
      ...preciseResult,
      confidence: Math.min(preciseResult.confidence + 0.1, 0.99),
      consistencyNote: '快速测试和精准测试高度一致，结果可靠'
    };
  }
  
  // 如果不一致，以精准测试为准，但标注差异
  return {
    ...preciseResult,
    confidence: preciseResult.confidence * 0.9,
    inconsistencyWarning: '您在快速测试中显示出与精准测试不同的倾向，建议与AI咨询师探讨',
    fastTestResult: fastResult.mbtiType
  };
}
```

---

## 五、A/B测试计划

### 5.1 测试假设

| 假设 | 测试方案 | 成功指标 |
|------|----------|----------|
| 快速测试能提高整体转化率 | A: 直接进入96题 / B: 先快速测试 | B组96题完成率 > A组 |
| 10题是最佳数量 | 测试5/10/15题版本 | 10题版本的置信度/时间比最优 |
| 动态出题优于固定题库 | A: 固定10题 / B: 动态10题 | B组准确率 > A组 5% |

### 5.2 数据追踪

```typescript
interface TestAnalytics {
  // 快速测试指标
  fastTestStart: number;
  fastTestComplete: number;
  fastTestAbandon: number;
  averageFastTestTime: number;
  
  // 精准测试指标
  preciseTestStart: number;
  preciseTestComplete: number;
  preciseTestAbandon: number;
  averagePreciseTestTime: number;
  
  // 转化指标
  fastToPreciseConversion: number;
  fastToChatConversion: number;
  preciseToPaymentConversion: number;
  
  // 质量指标
  fastTestAccuracy: number;  // 与精准测试的一致性
  userSatisfactionScore: number;
}
```

---

## 六、实施检查清单

### Phase 1：快速测试（2周）
- [ ] 完成10题题库设计
- [ ] 实现AI预测算法
- [ ] 设计结果展示页面
- [ ] 埋点数据追踪

### Phase 2：精准测试（2周）
- [ ] 完成96题题库（或获取Sakinorva授权）
- [ ] 实现分维度计分算法
- [ ] 认知功能分析模块
- [ ] 进度保存/恢复功能

### Phase 3：协同优化（1周）
- [ ] 两套测试数据打通
- [ ] 用户旅程优化
- [ ] A/B测试配置
- [ ] 性能优化

---

*文档结束*
