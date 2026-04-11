# MindType - MBTI AI 测试网站

## 项目概述

一个融合专业心理学测试与AI智能解读的MBTI平台，包含：
- 正规MBTI测试 + AI深度解读
- SBTI趣味恶搞引流测试
- AI智能对话问答
- 行业专区（20个行业，含用户专属分析）
- 用户系统（注册/登录/个人中心）
- 积分体系（签到/分享/充值）

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI组件**: shadcn/ui
- **Styling**: Tailwind CSS 4
- **AI集成**: coze-coding-dev-sdk (LLM流式输出)
- **数据库**: Supabase (Auth + Database + RLS)

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
│   ├── auth/page.tsx        # 登录/注册页面
│   ├── profile/
│   │   ├── page.tsx        # 个人中心
│   │   └── recharge/page.tsx # 积分充值
│   ├── industry/
│   │   ├── page.tsx        # 行业总览
│   │   └── [slug]/page.tsx # 各行业详情
│   └── api/
│       ├── mbti/interpret/route.ts # AI解读API (SSE流式)
│       ├── chat/route.ts    # AI对话API (SSE流式)
│       └── industry/analyze/route.ts # 行业专属分析API
├── components/
│   ├── NavBar.tsx           # 导航栏
│   ├── StarBackground.tsx    # 星星背景动画
│   ├── QuestionCard.tsx      # 测试题目卡片
│   ├── AIResponse.tsx        # AI响应展示 (打字机效果)
│   ├── ChatInterface.tsx     # AI对话界面
│   ├── IndustryCard.tsx      # 行业卡片
│   ├── SBITCertificate.tsx  # SBTI恶搞证书
│   └── MBTIGrid.tsx         # 16种人格展示
├── hooks/
│   ├── useTestStore.tsx      # 测试状态管理
│   ├── useAIChat.ts          # AI对话hook
│   └── useAuth.tsx           # 用户认证Context
├── lib/
│   ├── mbti-data.ts         # MBTI数据 + 计分逻辑
│   ├── sbti-data.ts         # SBTI数据
│   ├── industry-data.ts      # 行业数据 (20个行业)
│   └── utils.ts              # 工具函数
├── storage/
│   └── database/
│       └── shared/
│           └── schema.ts     # Supabase数据库Schema
└── types/
    └── index.ts              # 类型定义
```

## 页面路由

| 路由 | 说明 |
|------|------|
| `/` | 首页 - 双入口引导 |
| `/sbti` | SBTI趣味测试 |
| `/test` | MBTI正经测试 |
| `/test/result?type=XXX` | 测试结果页 |
| `/auth` | 登录/注册页面 |
| `/profile` | 个人中心（签到/积分/历史） |
| `/profile/recharge` | 积分充值页面 |
| `/industry` | 行业专区（20个行业） |
| `/industry/[slug]` | 各行业详情页（含专属分析入口） |

## 核心功能

### 1. MBTI测试
- 28道核心题目，覆盖E/I、S/N、T/F、J/P四维度
- 滑块选择支持（1-5分）
- 键盘快捷键操作（← → 或 1-5）
- localStorage进度保存
- 保存测试结果到数据库

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

### 5. 行业专区（20个行业）
- 热门行业TOP10：科技互联网、金融投行、咨询管理、市场营销、教育培训、医疗健康、法律合规、媒体传播、房地产建筑、制造业
- 新兴行业：设计创意、游戏电竞、新能源、生物医药、AI人工智能、文化娱乐、电商零售、现代农业、旅游出行、体育运动
- 用户专属AI分析功能（消耗积分）

### 6. 用户系统
- Supabase Auth 邮箱注册/登录
- 用户资料管理（用户名、MBTI类型）
- 个人中心页面

### 7. 积分体系
- 新用户注册赠送100积分
- 每日签到：基础10积分 + 连续签到加成（最高+7）
- 分享测试结果：+10积分
- 行业专属分析：-20积分

## 环境变量配置

环境变量通过 `coze_workload_identity` SDK 自动获取，同时写入 `.env.local` 供 Next.js 开发服务器使用。

```bash
# 服务端 + 客户端（NEXT_PUBLIC_ 前缀供浏览器访问）
COZE_SUPABASE_URL=https://xxx.supabase2.aidap-global.cn-beijing.volces.com
COZE_SUPABASE_ANON_KEY=eyJ...
COZE_SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase2.aidap-global.cn-beijing.volces.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Supabase 客户端

- **服务端**: 使用 `src/storage/database/supabase-client.ts` 中的 `getSupabaseClient()`（支持 `coze_workload_identity` 自动加载环境变量）
- **客户端**: 使用 `src/hooks/useAuth.tsx` 中的 `supabase()` 函数（延迟初始化，支持 LocalStorage Fallback）

## 数据库Schema (Supabase)

执行 `coze-coding-ai db upgrade` 同步Schema，包含以下表：

| 表名 | 说明 |
|------|------|
| `user_profiles` | 用户资料（积分、连续签到等） |
| `mbti_results` | MBTI测试结果 |
| `point_transactions` | 积分交易记录 |
| `user_industry_analyses` | 用户行业分析记录 |

## 开发命令

```bash
pnpm install     # 安装依赖
pnpm dev         # 开发环境 (端口5000)
pnpm lint        # ESLint检查
pnpm ts-check    # TypeScript检查
pnpm build       # 生产构建
```

## 注意事项

1. **AI功能**: 使用coze-coding-dev-sdk，必须在服务端调用
2. **SSE流式**: 所有AI接口均使用Server-Sent Events，前端需使用fetch + body.getReader()
3. **状态管理**: 测试进度使用localStorage持久化
4. **组件规范**: 遵循shadcn/ui风格，深色主题设计
5. **数据库**: 首次使用需配置Supabase环境变量并执行 `coze-coding-ai db upgrade`
