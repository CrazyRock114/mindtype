import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, Message } from 'coze-coding-dev-sdk';

const config = new Config();
const client = new LLMClient(config);

const mbtiAnalysisPrompt = `你是MindType的专业MBTI职业发展顾问。请基于用户的MBTI人格类型和目标行业，提供专业、深入且实用的职业发展分析。

请从以下几个维度进行分析：

1. **人格与行业匹配度** (0-100分)
   - 分析该MBTI类型在目标行业的天然优势
   - 指出可能遇到的挑战

2. **职业路径建议**
   - 推荐3-5个适合该人格的细分岗位
   - 每个岗位的发展前景和建议

3. **技能提升方向**
   - 该人格在行业中的核心竞争力
   - 需要弥补的短板

4. **职场生存指南**
   - 如何发挥优势
   - 如何规避风险

5. **长期发展规划**
   - 5年、10年的职业目标建议
   - 可能的转型方向

请用温暖、专业、有洞察力的语气撰写，保持内容简洁有力，避免废话。`;

export async function POST(request: NextRequest) {
  try {
    const { mbtiType, industryId, industryName } = await request.json();

    if (!mbtiType || !industryId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const mbtiInfo = getMBTIInfo(mbtiType);
    const industryInfo = getIndustryInfo(industryId);

    const userMessage = `我想了解我的${mbtiType}（${mbtiInfo.name}）人格在${industryName}行业的发展前景和建议。\n\n我的MBTI特质：${mbtiInfo.description}\n\n目标行业特点：${industryInfo}`;

    const allMessages: Message[] = [
      { role: 'system', content: mbtiAnalysisPrompt },
      { role: 'user', content: userMessage },
    ];

    // Create readable stream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          for await (const chunk of client.stream(allMessages, {
            temperature: 0.7,
          })) {
            if (chunk.content) {
              const data = JSON.stringify({ content: chunk.content });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }

          // Add done signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('LLM error:', error);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function getMBTIInfo(type: string) {
  const infoMap: Record<string, { name: string; description: string }> = {
    INTJ: {
      name: '建筑师',
      description: '独立思考、战略眼光、追求完美，喜欢解决复杂问题，有强烈的目标导向。',
    },
    INTP: {
      name: '逻辑学家',
      description: '好奇心强、逻辑清晰、善于分析，喜欢理论探索，追求知识和理解。',
    },
    ENTJ: {
      name: '指挥官',
      description: '果断自信、领导力强、善于决策，喜欢挑战和竞争，追求效率和成果。',
    },
    ENTP: {
      name: '辩论家',
      description: '思维敏捷、创意无限、善于辩论，喜欢探索可能性，享受智识刺激。',
    },
    INFJ: {
      name: '提倡者',
      description: '理想主义、洞察力强、同理心深，关注他人成长，追求意义和价值。',
    },
    INFP: {
      name: '调停者',
      description: '价值观坚定、创意丰富、善于表达，忠于内心信念，追求自我实现。',
    },
    ENFJ: {
      name: '主人公',
      description: '魅力十足、感染力强、善于激励他人，天生的领导者和教育者。',
    },
    ENFP: {
      name: '竞选者',
      description: '热情洋溢、想象力丰富、社交能力强，充满激情，喜欢可能性。',
    },
    ISTJ: {
      name: '物流师',
      description: '责任感强、注重细节、脚踏实地，可靠务实，重视传统和规则。',
    },
    ISFJ: {
      name: '守护者',
      description: '忠诚可靠、乐于助人、注重细节，默默付出，重视人际关系。',
    },
    ESTJ: {
      name: '总经理',
      description: '执行力强、组织能力强、注重效率，善于管理和协调，重视秩序。',
    },
    ESFJ: {
      name: '执政官',
      description: '热情友好、善于社交、乐于助人，重视和谐与合作，善于照顾他人。',
    },
    ISTP: {
      name: '鉴赏家',
      description: '务实冷静、动手能力强、善于分析，喜欢探索事物原理，享受当下。',
    },
    ISFP: {
      name: '探险家',
      description: '艺术气息、灵活适应、注重美感，忠于自我价值观，享受自由。',
    },
    ESTP: {
      name: '企业家',
      description: '大胆务实、行动力强、善于社交，喜欢冒险和刺激，享受当下。',
    },
    ESFP: {
      name: '表演者',
      description: '活泼开朗、魅力四射、善于表现，喜欢成为焦点，享受生活乐趣。',
    },
  };

  return infoMap[type] || { name: type, description: '独特的人格特质' };
}

function getIndustryInfo(industryId: string): string {
  const industryMap: Record<string, string> = {
    tech: '科技互联网行业以技术创新为核心，节奏快、变化大，强调效率和执行力，需要持续学习和适应能力。',
    finance: '金融行业高压高回报，注重风险控制和合规性，需要严谨的逻辑思维和强大的心理素质。',
    consulting: '咨询行业以解决问题为导向，接触各行业各领域，要求强大的分析和沟通能力。',
    marketing: '市场营销行业以创意和洞察为核心，需要敏锐的市场嗅觉和出色的表达能力。',
    education: '教育培训行业传递知识与价值观，需要耐心、同理心和持续学习的能力。',
    health: '医疗健康行业关乎生命健康，专业性强，需要高度的责任心和同理心。',
    law: '法律行业以公平正义为准绳，专业门槛高，需要严谨的逻辑和强大的记忆力。',
    media: '媒体传播行业以内容为核心，节奏快、敏感度高，需要敏锐的洞察力和表达能力。',
    realestate: '房地产行业规模大、周期性强，需要强大的谈判能力和抗压能力。',
    manufacturing: '制造业注重流程和规范，稳定可靠，需要踏实认真的工作态度。',
    design: '设计创意行业以美学和创意为核心，需要独特的审美和持续灵感。',
    gaming: '游戏电竞行业年轻有活力，技术迭代快，需要热情和创新能力。',
    newenergy: '新能源行业处于快速发展期，政策支持强，需要技术储备和学习能力。',
    biotech: '生物医药行业高门槛高回报，研发周期长，需要深厚的专业积累。',
    aicloud: 'AI人工智能是前沿科技领域，技术创新密集，需要持续学习和创新精神。',
    culture: '文化娱乐行业以内容创意为核心，商业与艺术结合，需要独特的洞察力。',
    ecommerce: '电商零售以用户体验为核心，数据驱动决策，需要敏锐的市场洞察。',
    agriculture: '现代农业与科技融合，政策支持强，需要脚踏实地和长期主义。',
    tourism: '旅游出行行业体验经济时代，疫情后复苏强劲，需要服务意识和全球化视野。',
    sports: '体育运动行业健康意识提升，政策支持体育产业，需要热情和专业结合。',
  };

  return industryMap[industryId] || '一个充满机遇和挑战的行业。';
}
