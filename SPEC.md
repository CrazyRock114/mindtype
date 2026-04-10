# MBTI AI 测试网站 - 项目规范

## 1. 概念与愿景

一个融合专业心理学测试与AI智能解读的MBTI平台。区别于传统测试网站的静态报告，我们提供：
- **趣味引流**：SBTI（Super Brain Type Indicator）恶搞版以轻松幽默的方式吸引用户
- **深度解读**：AI实时生成个性化、专业化的性格分析
- **智能对话**：用户可针对测试结果与AI进行多轮深入交流
- **行业洞察**：按职业领域细分的MBTI分析，为未来职业规划服务铺垫

整体氛围：神秘优雅但不故弄玄虚，专业严谨但不失趣味。

## 2. 设计语言

### 美学方向
深空星云风格 + 心理学神秘感，融合赛博朋克霓虹元素。视觉上传递"探索自我"的神秘感，同时保持现代简洁。

### 色彩系统
```css
:root {
  --bg-primary: #0a0b14;        /* 深空背景 */
  --bg-secondary: #12141f;      /* 卡片背景 */
  --bg-tertiary: #1a1d2e;       /* 悬浮层 */
  --accent-purple: #8b5cf6;     /* 主强调色 - 智慧紫 */
  --accent-cyan: #06b6d4;       /* 次强调色 - 科技青 */
  --accent-pink: #ec4899;       /* 趣味/恶搞元素 */
  --accent-gold: #f59e0b;       /* 结果高亮 */
  --text-primary: #f1f5f9;      /* 主文字 */
  --text-secondary: #94a3b8;    /* 次文字 */
  --text-muted: #64748b;        /* 弱化文字 */
  --gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-card: linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%);
  --glow-purple: 0 0 30px rgba(139, 92, 246, 0.3);
  --glow-cyan: 0 0 20px rgba(6, 182, 212, 0.2);
}
```

### 字体系统
- **标题字体**: "Noto Serif SC" (中文) / "Playfair Display" (英文) - 优雅衬线体
- **正文字体**: "Noto Sans SC" (中文) / "Inter" (英文) - 清晰无衬线
- **装饰字体**: "Ma Shan Zheng" (中文手写风) - 用于SBTI恶搞页

### 空间系统
- 基础间距单位: 4px
- 页面最大宽度: 1200px
- 卡片圆角: 16px (大) / 12px (中) / 8px (小)
- 阴影层级: 3级（浅/中/深）

### 动效哲学
- **页面过渡**: 淡入淡出 + 微位移，duration 300ms
- **卡片悬浮**: scale(1.02) + box-shadow增强，duration 200ms
- **打字机效果**: AI输出文字逐字显示，speed 30ms/字
- **进度条动画**: 平滑填充，ease-out，duration 800ms
- **星星背景**: 缓慢漂浮动画，营造深空氛围

### 视觉资产
- **图标库**: Lucide React（线性风格，stroke-width: 1.5）
- **装饰元素**:
  - 动态星星粒子背景（CSS animation）
  - MBTI四维度的抽象符号图标（自定义SVG）
  - 渐变光晕装饰
- **占位图片**: 几何渐变图形（CSS生成）

## 3. 布局与结构

### 页面架构

```
/                    首页 - 双入口引导
├── /sbti            SBTI趣味测试页（恶搞引流）
├── /test            正规MBTI测试页
│   ├── /test/result 结果页（含AI解读 + AI对话）
│   └── /test/chat   独立AI对话页（可复访）
└── /industry        行业领域专区（未来扩展入口）
    ├── /industry/tech     科技行业
    ├── /industry/finance 金融行业
    ├── /industry/design  设计创意
    └── /industry/education 教育行业
```

### 首页布局
1. **Hero Section**: 全屏渐变背景 + 浮动星星动画
   - 大标题：使用衬线字体，带光晕效果
   - 双入口按钮：「正经测试」vs「趣味恶搞」
   - 滚动提示动画

2. **功能展示**: 三列卡片布局
   - AI智能解读
   - 趣味问答交流
   - 行业专属分析

3. **MBTI类型展示**: 16种人格的环形图谱
   - 可交互悬停查看简介
   - 点击跳转对应介绍页

### SBTI趣味页布局
1. **恶搞氛围营造**
   - 夸张标题："超能脑洞类型指示器"
   - 无厘头题目（如：如果你是一条鱼，你会...）
   - 趣味动画和表情包

2. **测试流程**
   - 步骤指示（星座风格图标）
   - 结果页带"官方认证恶搞证书"

3. **转化引导**
   - 趣味结果页底部：「想了解真实的自己？→ 测试真正的MBTI」

### MBTI测试页布局
1. **进度指示**: 顶部进度条 + 题号指示

2. **题目卡片**: 中央大卡片
   - 题目文字（大号）
   - 两极选择滑块或按钮组
   - 支持键盘快捷键选择

3. **计时/进度**: 右下角显示（可选）

### 结果页布局
1. **人格类型展示**: 大号字母 + 类型名称
   - 环形维度图（E/I, S/N, T/F, J/P四维）

2. **AI解读区域**
   - 打字机效果展示
   - 分段解读（性格优势/潜在盲点/人际关系/职业倾向）

3. **AI对话区域**
   - 聊天界面
   - 预设问题快捷按钮
   - 输入框 + 发送按钮

4. **行业专区入口**
   - 四大行业卡片
   - 「未来更多行业」预告

## 4. 功能与交互

### 核心功能

#### 4.1 SBTI趣味测试
- **题目数量**: 8道趣味问题
- **计分方式**: 恶搞逻辑（如：选A得5分"外星人值"）
- **结果类型**: 10种恶搞人格（如：宇宙超级无敌宅家达人）
- **交互细节**:
  - 选择时卡片轻微震动
  - 结果页"证书生成"动画
  - 分享按钮（生成分享图片）

#### 4.2 正规MBTI测试
- **题目数量**: 28道核心题
- **测试维度**:
  - E/I (外向/内向)
  - S/N (实感/直觉)
  - T/F (思考/情感)
  - J/P (判断/知觉)
- **交互细节**:
  - 左右滑块选择（A ↔ B）
  - 支持键盘 ← → 操作
  - 进度自动保存（localStorage）
  - 未作答可标记稍后回来

#### 4.3 AI解读生成
- **触发时机**: 测试完成立即生成
- **输出内容**:
  - 性格核心特质描述
  - 优势与短板分析
  - 人际关系模式
  - 职业发展建议
  - 学习成长方向
- **流式输出**: 使用SSE实现打字机效果
- **交互细节**:
  - 加载时骨架屏 + "AI正在分析..."文案
  - 分段逐步显示（每段有轻微延迟）
  - 可一键复制全文

#### 4.4 AI问答对话
- **对话模式**: 多轮对话，记忆上下文
- **预设问题**:
  - "这个结果准确吗？"
  - "我适合什么职业？"
  - "如何与这种人格相处？"
  - "有什么成长建议？"
- **交互细节**:
  - 用户消息右对齐，AI消息左对齐
  - AI回复打字机效果
  - 空消息禁止发送
  - 对话历史可清空

#### 4.5 行业专区（框架）
- **展示内容**:
  - 各行业简介
  - 该行业热门MBTI类型
  - 未来服务预告（"即将上线"）
- **交互细节**:
  - 卡片悬浮放大
  - 点击弹出模态框提示即将上线

### 边界状态处理

| 状态 | 处理方式 |
|------|----------|
| AI生成失败 | 显示重试按钮 + 降级文案"稍后再试" |
| 网络断开 | 顶部toast提示 + 本地缓存测试结果 |
| 快速连续点击 | 防抖处理，禁用按钮0.5s |
| 空输入对话 | 按钮禁用 + 输入框抖动提示 |
| 页面刷新中断测试 | localStorage恢复 + 弹窗询问 |

## 5. 组件清单

### 全局组件

#### NavBar
- 左侧：Logo + 网站名
- 右侧：导航链接（首页/测试/行业）
- 滚动时背景模糊增强
- 移动端：汉堡菜单

#### Button
- **变体**: primary (紫渐变) / secondary (边框) / ghost (透明)
- **尺寸**: sm (32px) / md (40px) / lg (48px)
- **状态**: default / hover (亮度+10%) / active (scale 0.98) / disabled (opacity 0.5) / loading (旋转图标)

#### Card
- **变体**: default / glass (毛玻璃) / gradient (渐变边框)
- **状态**: default / hover (上浮+阴影) / selected (边框高亮)

#### Input
- **变体**: default / search (带图标)
- **状态**: default / focus (边框发光) / error (红色边框+提示) / disabled

#### Modal
- 背景：半透明黑色遮罩 + 模糊
- 内容：居中卡片 + 关闭按钮
- 动画：scale 0.95→1 + fade

#### Toast
- 位置：顶部居中
- 类型：success (绿) / error (红) / info (蓝)
- 自动消失：3秒

### 业务组件

#### QuestionCard
- 题目序号标签
- 题干文字
- 选择区域（A/B滑块或按钮组）
- 进度指示

#### TypeDisplay
- 四个大字母 (M/B/T/I)
- 每字母独立颜色
- 维度图（雷达图或环形图）
- 类型名称标签

#### AIResponse
- 打字机文字效果
- 分段加载动画
- 复制/重生成按钮

#### ChatMessage
- 用户/AI消息气泡
- 时间戳
- 加载中状态（三个点跳动）

#### IndustryCard
- 行业图标
- 行业名称
- 简介文字
- 状态标签（热门/即将上线）

#### SBITCertificate
- 恶搞"证书"样式
- 用户名称输入
- 结果类型展示
- 生成/分享按钮

## 6. 技术方案

### 技术栈
- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4 + CSS Variables
- **组件库**: shadcn/ui
- **AI集成**: coze-coding-dev-sdk (LLM)
- **状态管理**: React Context + useReducer (测试状态)

### 项目结构
```
src/
├── app/
│   ├── layout.tsx              # 根布局 + NavBar
│   ├── page.tsx                # 首页
│   ├── sbti/
│   │   └── page.tsx            # SBTI趣味测试
│   ├── test/
│   │   ├── page.tsx            # MBTI测试
│   │   ├── result/
│   │   │   └── page.tsx        # 测试结果页
│   │   └── chat/
│   │       └── page.tsx        # AI对话页
│   └── industry/
│       ├── page.tsx            # 行业总览
│       └── [slug]/
│           └── page.tsx        # 各行业页
├── components/
│   ├── ui/                     # shadcn/ui基础组件
│   ├── NavBar.tsx
│   ├── StarBackground.tsx
│   ├── QuestionCard.tsx
│   ├── TypeDisplay.tsx
│   ├── AIResponse.tsx
│   ├── ChatInterface.tsx
│   ├── IndustryCard.tsx
│   └── SBITCertificate.tsx
├── lib/
│   ├── mbti-questions.ts       # MBTI题目数据
│   ├── sbti-questions.ts       # SBTI题目数据
│   ├── mbti-types.ts           # 16种人格数据
│   ├── sbti-types.ts           # 恶搞人格数据
│   ├── industry-data.ts        # 行业数据
│   └── utils.ts                # 工具函数
├── hooks/
│   ├── useTestStore.ts         # 测试状态管理
│   └── useAIChat.ts            # AI对话hook
└── types/
    └── index.ts                # 类型定义
```

### API 设计

#### POST /api/mbti/interpret
生成MBTI性格解读

**Request:**
```json
{
  "type": "INTJ",
  "answers": [1, 3, 2, 4, ...] // 各维度选择
}
```

**Response:** SSE流式输出
```
data: {"content": "你的性格核心特质是..."}
data: {"content": "\n\n在职业发展中..."}
...
data: [DONE]
```

#### POST /api/chat
AI对话接口

**Request:**
```json
{
  "mbtiType": "INTJ",
  "messages": [
    {"role": "user", "content": "我适合什么职业？"}
  ]
}
```

**Response:** SSE流式输出

### 数据模型

```typescript
// MBTI测试结果
interface MBTIResult {
  type: 'INTJ' | 'ENTP' | ...; // 16种类型
  dimensions: {
    EI: number;  // -100 ~ 100
    SN: number;
    TF: number;
    JP: number;
  };
  answers: number[]; // 各题选择
  timestamp: number;
}

// AI对话消息
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// SBTI结果
interface SBTIResult {
  type: string;
  score: number;
  description: string;
}
```

### 状态持久化
- **测试进度**: localStorage，key = `mbti_test_progress`
- **测试结果**: localStorage，key = `mbti_result_{type}`
- **对话历史**: localStorage，key = `mbti_chat_{type}`

### AI提示词策略

#### 性格解读
```
你是专业的MBTI性格分析师。用户刚刚完成了MBTI测试，类型是 {type}。
请根据这个类型的特点，结合测试过程中的选择倾向，生成一份个性化、专业且温暖的解读报告。
报告需要包含以下部分：
1. 性格核心特质（150字）
2. 优势与潜能（100字）
3. 潜在盲点与成长建议（100字）
4. 人际关系模式（80字）
5. 职业发展建议（100字）

语气：专业但亲切，像一位了解你的朋友在分析
```

#### AI对话
```
你是用户的MBTI性格顾问。用户的人格类型是 {type}。
请根据这个类型为用户提供个性化建议。
- 可以回答关于职业、人际关系、个人成长的问题
- 如果用户问题超出范围，引导回到性格相关话题
- 保持对话连贯性，记住之前的对话内容
```

## 7. 未来扩展预留

### 行业职业规划服务
- 各行业独立页面框架已建立
- 预留行业专属MBTI数据接口
- AI对话可接入行业知识库

### 可能的增值功能
- 测试结果分享图片生成
- 用户账号体系（保存历史测试）
- 社区功能（类型匹配/话题讨论）
- 详细职业报告购买
