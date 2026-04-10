# MindType - MBTI AI 测试网站

## 项目概述

一个融合专业心理学测试与AI智能解读的MBTI平台，包含：
- 正规MBTI测试 + AI深度解读
- SBTI趣味恶搞引流测试
- AI智能对话问答
- 行业专区（未来职业规划服务入口）

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI组件**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **AI集成**: coze-coding-dev-sdk (LLM流式输出)

## 目录结构

```
src/
├── app/
│   ├── layout.tsx           # 根布局
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式 + 自定义动画
│   ├── sbti/page.tsx       # SBTI趣味测试
│   ├── test/page.tsx        # MBTI测试
│   ├── test/result/page.tsx # 测试结果页
│   ├── industry/page.tsx    # 行业总览
│   ├── industry/[slug]/page.tsx # 各行业详情
│   └── api/
│       ├── mbti/interpret/route.ts # AI解读API (SSE流式)
│       └── chat/route.ts    # AI对话API (SSE流式)
├── components/
│   ├── NavBar.tsx           # 导航栏
│   ├── StarBackground.tsx  # 星星背景动画
│   ├── QuestionCard.tsx     # 测试题目卡片
│   ├── AIResponse.tsx       # AI响应展示 (打字机效果)
│   ├── ChatInterface.tsx    # AI对话界面
│   ├── IndustryCard.tsx      # 行业卡片
│   ├── SBITCertificate.tsx  # SBTI恶搞证书
│   └── MBTIGrid.tsx         # 16种人格展示
├── hooks/
│   ├── useTestStore.tsx     # 测试状态管理
│   └── useAIChat.ts         # AI对话hook
├── lib/
│   ├── mbti-data.ts        # MBTI数据 + 计分逻辑
│   ├── sbti-data.ts         # SBTI数据
│   ├── industry-data.ts      # 行业数据
│   └── utils.ts             # 工具函数
└── types/
    └── index.ts             # 类型定义
```

## 页面路由

| 路由 | 说明 |
|------|------|
| `/` | 首页 - 双入口引导 |
| `/sbti` | SBTI趣味测试 |
| `/test` | MBTI正经测试 |
| `/test/result?type=XXX` | 测试结果页 |
| `/industry` | 行业专区 |
| `/industry/[slug]` | 各行业详情页 |

## 核心功能

### 1. MBTI测试
- 28道核心题目，覆盖E/I、S/N、T/F、J/P四维度
- 滑块选择支持（1-5分）
- 键盘快捷键操作（← → 或 1-5）
- localStorage进度保存

### 2. AI解读 (SSE流式)
- API: `POST /api/mbti/interpret`
- 流式输出，打字机效果
- 分段展示：性格特质、优势、盲点、人际关系、职业建议

### 3. AI对话 (SSE流式)
- API: `POST /api/chat`
- 支持多轮对话
- 预设快捷问题
- 打字机效果展示回复

### 4. SBTI趣味测试
- 8道趣味题目
- 恶搞人格类型（宅神、摸鱼狂人等）
- 生成"官方恶搞证书"

### 5. 行业专区
- 科技、金融、设计、教育等6大行业
- 预留职业规划服务扩展接口

## 开发命令

```bash
pnpm install     # 安装依赖
pnpm dev        # 开发环境 (端口5000)
pnpm build      # 生产构建
pnpm lint       # ESLint检查
```

## 环境变量

项目使用预置环境变量，无需额外配置：
- `DEPLOY_RUN_PORT`: 5000
- `COZE_PROJECT_DOMAIN_DEFAULT`: 访问域名

## 注意事项

1. **AI功能**: 使用coze-coding-dev-sdk，必须在服务端调用
2. **SSE流式**: 所有AI接口均使用Server-Sent Events，前端需使用fetch + body.getReader()
3. **状态管理**: 测试进度使用localStorage持久化
4. **组件规范**: 遵循shadcn/ui风格，深色主题设计
