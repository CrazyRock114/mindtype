# 长期记忆系统技术实现方案

**文档版本：** v1.0  
**编写日期：** 2026年4月14日  
**目标：** 实现类似Replika的长期记忆能力，让AI咨询师记住用户的历史对话、偏好和成长轨迹

---

## 一、系统架构设计

### 1.1 整体架构图

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           用户层 (User Layer)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Web App   │  │   iOS App   │  │ Android App │  │   小程序     │   │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │
└─────────┼────────────────┼────────────────┼────────────────┼──────────┘
          │                │                │                │
          └────────────────┴────────────────┴────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────────────┐
│                        API Gateway Layer                               │
│         (Authentication / Rate Limit / Request Routing)                │
└─────────────────────────────┬─────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────────────┐
│                      Memory Service Layer                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Memory     │  │  Memory     │  │  Memory     │  │  Session    │   │
│  │  Extractor  │  │  Store      │  │  Retriever  │  │  Manager    │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────┬─────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────────────┐
│                       Vector Database Layer                            │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Pinecone / Weaviate / Chroma                  │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │   │
│  │  │  Facts      │  │  Preferences│  │  History    │              │   │
│  │  │  Collection │  │  Collection │  │  Collection │              │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼─────────────────────────────────────────┐
│                        LLM Service Layer                               │
│         (GPT-4o / Claude 3.5 Sonnet / Gemini Pro)                      │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 核心组件说明

| 组件 | 职责 | 技术选型 |
|------|------|----------|
| **Memory Extractor** | 从对话中提取关键信息 | GPT-4o + 结构化Prompt |
| **Memory Store** | 存储记忆到向量数据库 | Pinecone SDK |
| **Memory Retriever** | 根据上下文检索相关记忆 | 向量相似度搜索 + 重排序 |
| **Session Manager** | 管理用户会话状态 | Redis |

---

## 二、记忆模型设计

### 2.1 记忆分类体系

```typescript
// 记忆类型枚举
enum MemoryType {
  FACT = 'fact',              // 事实性信息
  PREFERENCE = 'preference',  // 用户偏好
  EVENT = 'event',            // 重要事件
  EMOTION = 'emotion',        // 情绪记录
  GOAL = 'goal',              // 目标/计划
  INSIGHT = 'insight',        // 洞察/顿悟
  RELATIONSHIP = 'relationship' // 人际关系
}

// 记忆重要性等级
enum ImportanceLevel {
  CRITICAL = 5,    // 核心身份特征（MBTI类型、职业等）
  HIGH = 4,        // 重要偏好（价值观、人生目标）
  MEDIUM = 3,      // 一般信息（喜好、习惯）
  LOW = 2,         // 临时信息（当前情绪、短期计划）
  EPHEMERAL = 1    // 瞬时信息（天气、当前位置）
}
```

### 2.2 记忆数据结构

```typescript
interface Memory {
  id: string;                    // 唯一标识 UUID
  userId: string;                // 用户ID
  type: MemoryType;              // 记忆类型
  content: string;               // 记忆内容（自然语言）
  contentVector: number[];       // 向量表示（1536维）
  importance: ImportanceLevel;   // 重要性等级
  source: string;                // 来源（对话ID、用户主动输入等）
  createdAt: Date;               // 创建时间
  updatedAt: Date;               // 更新时间
  lastAccessedAt: Date;          // 最后访问时间
  accessCount: number;           // 被检索次数
  tags: string[];                // 标签（用于过滤）
  
  // 上下文信息
  context: {
    conversationId: string;      // 所属对话ID
    mbtiType: string;            // 用户MBTI类型
    scene: string;               // 场景（事业/爱情/家庭/财运）
    emotion: string;             // 当时情绪状态
  };
  
  // 时间衰减
  decayFactor: number;           // 衰减系数（0-1）
  
  // 验证状态
  verified: boolean;             // 是否经用户确认
  confidence: number;            // 提取置信度（0-1）
}
```

### 2.3 记忆示例

```json
{
  "id": "mem_123456789",
  "userId": "user_987654321",
  "type": "fact",
  "content": "用户是一名软件工程师，目前在一家金融科技公司工作，工作3年",
  "contentVector": [0.023, -0.045, ...], // 1536维向量
  "importance": 5,
  "source": "conv_456",
  "createdAt": "2026-04-10T14:30:00Z",
  "updatedAt": "2026-04-10T14:30:00Z",
  "lastAccessedAt": "2026-04-14T10:20:00Z",
  "accessCount": 12,
  "tags": ["职业", "工作", "金融科技"],
  "context": {
    "conversationId": "conv_456",
    "mbtiType": "INTJ",
    "scene": "事业",
    "emotion": "焦虑"
  },
  "decayFactor": 0.95,
  "verified": true,
  "confidence": 0.92
}
```

---

## 三、核心功能实现

### 3.1 记忆提取（Memory Extraction）

#### **提取时机**
1. 对话结束时（用户主动结束或超时）
2. 对话进行中（每5-10轮触发一次增量提取）
3. 用户主动标记（"记住这个"）

#### **提取Prompt设计**

```javascript
const MEMORY_EXTRACTION_PROMPT = `
你是一个专业的记忆提取助手。请从以下对话中提取需要长期记忆的关键信息。

用户MBTI类型: {{mbtiType}}
对话场景: {{scene}}

对话内容:
{{conversation}}

请提取以下类型的信息（如果没有则不输出）：

1. **FACT（事实）**: 用户的基本信息、身份、职业、生活状态等
   - 示例: "用户25岁，是一名产品经理"

2. **PREFERENCE（偏好）**: 用户的喜好、价值观、选择倾向
   - 示例: "用户更喜欢远程工作，不喜欢办公室政治"

3. **EVENT（事件）**: 用户提到的重要事件、经历
   - 示例: "用户上周刚和男友分手"

4. **EMOTION（情绪）**: 用户的情绪模式和触发因素
   - 示例: "用户在面对 deadline 时会感到焦虑"

5. **GOAL（目标）**: 用户的目标、计划、愿望
   - 示例: "用户希望在3年内晋升为总监"

6. **INSIGHT（洞察）**: 用户在对话中获得的洞察或领悟
   - 示例: "用户意识到自己过于追求完美"

7. **RELATIONSHIP（关系）**: 用户的人际关系状况
   - 示例: "用户与直属上司关系紧张"

输出格式（JSON）：
{
  "memories": [
    {
      "type": "FACT",
      "content": "具体内容",
      "importance": 4,
      "confidence": 0.95
    }
  ]
}

注意：
- 只提取重要、稳定的信息，不要提取临时性的内容
- 重要性评分1-5，5为最重要（影响用户身份认同）
- 置信度评分0-1，基于信息明确程度
- 如果与已有记忆冲突，优先保留新版本
`;
```

#### **提取代码示例**

```typescript
async function extractMemories(
  conversation: Message[],
  userContext: UserContext
): Promise<Memory[]> {
  const prompt = MEMORY_EXTRACTION_PROMPT
    .replace('{{mbtiType}}', userContext.mbtiType)
    .replace('{{scene}}', userContext.currentScene)
    .replace('{{conversation}}', formatConversation(conversation));

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.3
  });

  const extracted = JSON.parse(response.choices[0].message.content);
  
  // 转换为Memory对象
  return extracted.memories.map(m => ({
    id: generateUUID(),
    userId: userContext.userId,
    type: m.type,
    content: m.content,
    contentVector: await generateEmbedding(m.content),
    importance: m.importance,
    source: conversation[0].conversationId,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastAccessedAt: new Date(),
    accessCount: 0,
    tags: extractTags(m.content),
    context: {
      conversationId: conversation[0].conversationId,
      mbtiType: userContext.mbtiType,
      scene: userContext.currentScene,
      emotion: userContext.currentEmotion
    },
    decayFactor: calculateDecayFactor(m.importance),
    verified: false,
    confidence: m.confidence
  }));
}
```

### 3.2 记忆存储（Memory Storage）

#### **向量生成**

```typescript
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: text,
    dimensions: 1536
  });
  return response.data[0].embedding;
}
```

#### **存储到Pinecone**

```typescript
async function storeMemories(memories: Memory[]): Promise<void> {
  const vectors = memories.map(m => ({
    id: m.id,
    values: m.contentVector,
    metadata: {
      userId: m.userId,
      type: m.type,
      content: m.content,
      importance: m.importance,
      tags: m.tags,
      createdAt: m.createdAt.toISOString(),
      mbtiType: m.context.mbtiType,
      scene: m.context.scene
    }
  }));

  await pinecone.index('memories').upsert(vectors);
  
  // 同步到关系型数据库（用于复杂查询）
  await db.memories.createMany({ data: memories });
}
```

### 3.3 记忆检索（Memory Retrieval）

#### **检索策略**

```typescript
interface RetrievalConfig {
  topK: number;              // 返回记忆数量
  recencyWeight: number;     // 时间衰减权重（0-1）
  importanceWeight: number;  // 重要性权重（0-1）
  relevanceWeight: number;   // 相关性权重（0-1）
  timeWindow?: number;       // 时间窗口（天），undefined表示全部
}

const DEFAULT_RETRIEVAL_CONFIG: RetrievalConfig = {
  topK: 5,
  recencyWeight: 0.3,
  importanceWeight: 0.3,
  relevanceWeight: 0.4
};
```

#### **检索流程**

```typescript
async function retrieveRelevantMemories(
  userId: string,
  query: string,
  currentContext: {
    mbtiType: string;
    scene: string;
    emotion: string;
  },
  config: RetrievalConfig = DEFAULT_RETRIEVAL_CONFIG
): Promise<Memory[]> {
  // 1. 生成查询向量
  const queryVector = await generateEmbedding(query);
  
  // 2. 向量相似度搜索（召回20个候选）
  const candidates = await pinecone.index('memories').query({
    vector: queryVector,
    filter: {
      userId: { $eq: userId }
    },
    topK: 20,
    includeMetadata: true
  });

  // 3. 计算综合得分并重排序
  const scoredMemories = candidates.matches.map(match => {
    const memory = match.metadata as Memory;
    
    // 相关性得分（向量相似度）
    const relevanceScore = match.score;
    
    // 重要性得分
    const importanceScore = memory.importance / 5;
    
    // 时间衰减得分
    const daysSinceAccess = (Date.now() - new Date(memory.lastAccessedAt).getTime()) / (1000 * 60 * 60 * 24);
    const recencyScore = Math.exp(-daysSinceAccess / 30) * memory.decayFactor;
    
    // 上下文匹配加分
    let contextBonus = 0;
    if (memory.context.mbtiType === currentContext.mbtiType) contextBonus += 0.1;
    if (memory.context.scene === currentContext.scene) contextBonus += 0.15;
    if (memory.context.emotion === currentContext.emotion) contextBonus += 0.1;
    
    // 综合得分
    const totalScore = 
      config.relevanceWeight * relevanceScore +
      config.importanceWeight * importanceScore +
      config.recencyWeight * recencyScore +
      contextBonus;

    return { memory, score: totalScore };
  });

  // 4. 按得分排序并返回TopK
  scoredMemories.sort((a, b) => b.score - a.score);
  
  const topMemories = scoredMemories.slice(0, config.topK).map(m => m.memory);
  
  // 5. 更新访问统计
  await updateAccessStats(topMemories.map(m => m.id));
  
  return topMemories;
}
```

### 3.4 记忆注入（Memory Injection）

#### **Prompt模板**

```javascript
const MEMORY_INJECTION_PROMPT = `
你是MindType的AI咨询师，一位基于MBTI理论的专业心理咨询顾问。

**用户基本信息：**
- MBTI类型: {{mbtiType}}
- 当前咨询场景: {{scene}}

**关于用户的关键记忆（请自然地在对话中引用）：**
{{memories}}

**当前对话：**
用户: {{userMessage}}

**回复要求：**
1. 如果相关记忆中有与用户当前问题相关的信息，请自然地提及（如"我记得你之前提到过..."）
2. 展现对用户长期情况的了解，建立信任感
3. 结合用户的MBTI类型给出个性化建议
4. 语气温暖专业，避免机械引用

请给出你的回复：
`;
```

#### **完整对话流程**

```typescript
async function handleChat(
  userId: string,
  message: string,
  context: ChatContext
): Promise<string> {
  // 1. 检索相关记忆
  const relevantMemories = await retrieveRelevantMemories(
    userId,
    message,
    {
      mbtiType: context.mbtiType,
      scene: context.scene,
      emotion: context.emotion
    }
  );

  // 2. 格式化记忆
  const memoryText = relevantMemories.length > 0
    ? relevantMemories.map(m => `- ${m.content}`).join('\n')
    : '暂无相关记忆';

  // 3. 构建完整Prompt
  const prompt = MEMORY_INJECTION_PROMPT
    .replace('{{mbtiType}}', context.mbtiType)
    .replace('{{scene}}', context.scene)
    .replace('{{memories}}', memoryText)
    .replace('{{userMessage}}', message);

  // 4. 调用LLM
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: prompt },
      ...context.history
    ],
    temperature: 0.7
  });

  const reply = response.choices[0].message.content;

  // 5. 保存对话（异步）
  saveConversation(userId, message, reply);

  return reply;
}
```

---

## 四、高级功能

### 4.1 记忆验证（User Verification）

用户首次使用或提取到新记忆时，请用户确认：

```typescript
async function verifyMemories(userId: string, memories: Memory[]): Promise<void> {
  // 筛选高置信度但未验证的记忆
  const unverified = memories.filter(m => m.confidence > 0.8 && !m.verified);
  
  if (unverified.length === 0) return;

  // 向用户展示并请求确认
  const message = `我注意到以下关于您的信息，请确认是否准确：
${unverified.map((m, i) => `${i + 1}. ${m.content}`).join('\n')}

如果准确，我会记住这些信息以便未来更好地帮助您。`;

  // 发送给用户（通过聊天界面）
  await sendMessageToUser(userId, message);
}
```

### 4.2 记忆摘要（Memory Summary）

定期为用户生成记忆摘要，用于快速了解：

```typescript
async function generateMemorySummary(userId: string): Promise<string> {
  // 获取用户所有高重要性记忆
  const memories = await db.memories.findMany({
    where: {
      userId,
      importance: { gte: 4 }
    },
    orderBy: { updatedAt: 'desc' },
    take: 20
  });

  const prompt = `
请根据以下关于用户的关键信息，生成一段200字以内的个人概况摘要：

${memories.map(m => `- ${m.content}`).join('\n')}

要求：
- 突出用户的MBTI特征
- 提及主要目标和挑战
- 语气积极温暖
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5
  });

  return response.choices[0].message.content;
}
```

### 4.3 记忆遗忘（Memory Decay）

模拟人类遗忘机制，低重要性记忆逐渐淡化：

```typescript
async function applyMemoryDecay(userId: string): Promise<void> {
  const memories = await db.memories.findMany({
    where: { userId }
  });

  for (const memory of memories) {
    // 根据时间衰减
    const daysSinceAccess = (Date.now() - new Date(memory.lastAccessedAt).getTime()) / (1000 * 60 * 60 * 24);
    const timeDecay = Math.pow(0.99, daysSinceAccess);
    
    // 重要性越高，衰减越慢
    const importanceFactor = memory.importance / 5;
    const newDecayFactor = memory.decayFactor * timeDecay * (0.5 + 0.5 * importanceFactor);

    // 如果衰减因子低于阈值，归档或删除
    if (newDecayFactor < 0.1 && memory.importance < 3) {
      await archiveMemory(memory.id);
    } else {
      await db.memories.update({
        where: { id: memory.id },
        data: { decayFactor: newDecayFactor }
      });
    }
  }
}
```

---

## 五、数据库设计

### 5.1 关系型数据库（PostgreSQL）

```sql
-- 记忆表
CREATE TABLE memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    importance INTEGER NOT NULL CHECK (importance >= 1 AND importance <= 5),
    source VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    access_count INTEGER DEFAULT 0,
    tags TEXT[],
    context_conversation_id VARCHAR(255),
    context_mbti_type VARCHAR(10),
    context_scene VARCHAR(50),
    context_emotion VARCHAR(50),
    decay_factor FLOAT DEFAULT 1.0,
    verified BOOLEAN DEFAULT FALSE,
    confidence FLOAT DEFAULT 0.5,
    
    CONSTRAINT valid_confidence CHECK (confidence >= 0 AND confidence <= 1)
);

-- 索引
CREATE INDEX idx_memories_user_id ON memories(user_id);
CREATE INDEX idx_memories_type ON memories(type);
CREATE INDEX idx_memories_importance ON memories(importance);
CREATE INDEX idx_memories_created_at ON memories(created_at);

-- 用户记忆概况表（缓存）
CREATE TABLE user_memory_profiles (
    user_id VARCHAR(255) PRIMARY KEY,
    mbti_type VARCHAR(10),
    summary TEXT,
    key_facts JSONB,
    total_memories INTEGER DEFAULT 0,
    last_summary_generated_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 记忆访问日志
CREATE TABLE memory_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_id UUID REFERENCES memories(id),
    user_id VARCHAR(255) NOT NULL,
    accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    query_text TEXT,
    relevance_score FLOAT
);
```

### 5.2 向量数据库（Pinecone）

```python
# Pinecone索引配置
index_config = {
    "name": "memories",
    "dimension": 1536,  # text-embedding-3-large
    "metric": "cosine",
    "spec": {
        "serverless": {
            "cloud": "aws",
            "region": "us-east-1"
        }
    }
}

# 向量元数据字段
metadata_fields = {
    "userId": "string",
    "type": "string", 
    "content": "string",
    "importance": "integer",
    "tags": "list",
    "createdAt": "string",
    "mbtiType": "string",
    "scene": "string"
}
```

---

## 六、API接口设计

### 6.1 RESTful API

```yaml
# 记忆管理 API

POST /api/v1/memories
请求体:
  {
    "content": "用户是一名软件工程师",
    "type": "FACT",
    "importance": 5,
    "tags": ["职业"]
  }
响应:
  {
    "id": "mem_123",
    "content": "用户是一名软件工程师",
    "createdAt": "2026-04-14T10:00:00Z"
  }

GET /api/v1/memories?type=FACT&importance=5&limit=10
响应:
  {
    "memories": [...],
    "total": 42
  }

GET /api/v1/memories/search?q=工作目标
响应:
  {
    "memories": [...],
    "scores": [0.95, 0.87, ...]
  }

DELETE /api/v1/memories/{id}

PUT /api/v1/memories/{id}/verify
请求体:
  {
    "verified": true
  }

GET /api/v1/users/{userId}/memory-profile
响应:
  {
    "mbtiType": "INTJ",
    "summary": "用户是一名...",
    "keyFacts": [...],
    "totalMemories": 47
  }
```

---

## 七、成本估算

### 7.1 月度成本（基于10万活跃用户）

| 项目 | 用量 | 单价 | 月成本 |
|------|------|------|--------|
| **OpenAI Embeddings** | 1000万次调用 | $0.13/1M tokens | ~$1,300 |
| **Pinecone存储** | 500GB | $0.033/GB/月 | ~$16.5 |
| **Pinecone查询** | 5000万次 | $0.096/1000次 | ~$4,800 |
| **PostgreSQL** | RDS db.r6g.xlarge | $0.437/小时 | ~$320 |
| **Redis** | ElastiCache cache.r6g.large | $0.219/小时 | ~$160 |
| **总计** | - | - | **~$6,600/月** |

### 7.2 单用户成本

- 月均成本：$6,600
- 活跃用户：100,000
- **单用户月均成本：$0.066**
- 按$4.99/月订阅价，毛利率：**~98.7%**

---

## 八、实施路线图

### Phase 1：基础版（2周）
- [ ] 搭建Pinecone向量数据库
- [ ] 实现基础记忆提取（对话结束时触发）
- [ ] 实现简单记忆检索（Top 3最相关）
- [ ] 记忆注入到Prompt

### Phase 2：增强版（1个月）
- [ ] 多类型记忆分类
- [ ] 重要性自动评分
- [ ] 记忆验证机制
- [ ] 记忆摘要生成

### Phase 3：完整版（2个月）
- [ ] 时间衰减机制
- [ ] 复杂检索策略（多权重排序）
- [ ] 用户记忆管理界面
- [ ] 记忆访问分析报表

---

## 九、注意事项

1. **隐私合规**
   - 用户有权查看、修改、删除自己的记忆
   - 记忆数据加密存储
   - 遵守GDPR/CCPA等法规

2. **性能优化**
   - 使用Redis缓存热点记忆
   - 异步处理记忆提取
   - 批量写入向量数据库

3. **容错处理**
   - 向量数据库故障时降级到关系型数据库搜索
   - 记忆提取失败不阻断对话流程
   - 定期备份记忆数据

---

*文档结束*
