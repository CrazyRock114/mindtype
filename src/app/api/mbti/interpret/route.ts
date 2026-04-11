import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config } from 'coze-coding-dev-sdk';

const config = new Config();
const client = new LLMClient(config);

export async function POST(request: NextRequest) {
  try {
    const { type, dimensions, answers, answerSummary } = await request.json();

    // Build dimension description
    const dimensionDesc = `这个类型的四个维度倾向：
- E/I 维度：${dimensions.EI > 0 ? '外向(E)' : '内向(I)'}倾向（${Math.abs(dimensions.EI)}%）
- S/N 维度：${dimensions.SN > 0 ? '实感(S)' : '直觉(N)'}倾向（${Math.abs(dimensions.SN)}%）
- T/F 维度：${dimensions.TF > 0 ? '思考(T)' : '情感(F)'}倾向（${Math.abs(dimensions.TF)}%）
- J/P 维度：${dimensions.JP > 0 ? '判断(J)' : '知觉(P)'}倾向（${Math.abs(dimensions.JP)}%）`;

    // Build answer context if available
    const answerContext = answerSummary
      ? `\n\n以下是用户在28道测试题中的具体选择（每题1-5分，3为中立，1/2偏向B选项，4/5偏向A选项）：\n${answerSummary}\n\n请结合上述具体选择来分析用户的性格特点，特别关注：\n1. 在哪些题目上倾向非常强烈（1分或5分），说明该方面的性格特征极为突出\n2. 在哪些题目上选择了中立（3分），说明在该方面有较好的平衡\n3. 用户的整体选择模式体现出的独特性格组合`
      : (answers && answers.length > 0)
        ? `\n\n用户完成了${answers.length}道测试题，各题答案为：${answers.join(', ')}（1-5分，3为中立）`
        : '';

    const systemPrompt = `你是专业的MBTI性格分析师。用户刚刚完成了MBTI测试，类型是 ${type}。
请根据这个类型的特点，结合测试过程中的选择倾向，生成一份个性化、专业且温暖的解读报告。

${dimensionDesc}
${answerContext}

请生成一份完整的性格解读报告，包含以下部分，用分段的方式呈现：

【性格核心特质】
（结合用户的具体选择，描述这个类型最显著的性格特征，重点分析用户在强烈倾向题目上表现出的特质，约200字）

【优势与潜能】
（分析这个类型的主要优势，结合用户的选择指出最突出的优势，约150字）

【潜在盲点与成长建议】
（指出可能的短板和成长方向，结合用户在中立选择的维度给出平衡建议，约150字）

【人际关系模式】
（描述在社交和亲密关系中的特点，约100字）

【职业发展建议】
（适合的职业类型和发挥优势的方法，结合性格特点给出具体建议，约150字）

语气要专业但亲切，像一位了解用户的朋友在分析。注意分段输出，每段开头用【】标注。务必结合用户的具体选择来分析，不要只做泛泛的类型描述。`;

    // Create ReadableStream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          const messages = [
            { role: 'system' as const, content: systemPrompt },
            { role: 'user' as const, content: '请为我生成性格解读报告' }
          ];

          for await (const chunk of client.stream(messages, {
            temperature: 0.7,
          })) {
            if (chunk.content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk.content })}\n\n`));
            }
          }

          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error) {
          console.error('LLM stream error:', error);
          const errorMessage = '抱歉，AI解读生成失败，请稍后再试。';
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: errorMessage })}\n\n`));
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Interpret API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate interpretation' },
      { status: 500 }
    );
  }
}
