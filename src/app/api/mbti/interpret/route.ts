import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';

const config = new Config();
const client = new LLMClient(config);

export async function POST(request: NextRequest) {
  try {
    const { type, dimensions, answers } = await request.json();

    // Create ReadableStream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          const systemPrompt = `你是专业的MBTI性格分析师。用户刚刚完成了MBTI测试，类型是 ${type}。
请根据这个类型的特点，结合测试过程中的选择倾向，生成一份个性化、专业且温暖的解读报告。

这个类型的四个维度倾向：
- E/I 维度：${dimensions.EI > 0 ? '外向(E)' : '内向(I)'}倾向（${Math.abs(dimensions.EI)}%）
- S/N 维度：${dimensions.SN > 0 ? '实感(S)' : '直觉(N)'}倾向（${Math.abs(dimensions.SN)}%）
- T/F 维度：${dimensions.TF > 0 ? '思考(T)' : '情感(F)'}倾向（${Math.abs(dimensions.TF)}%）
- J/P 维度：${dimensions.JP > 0 ? '判断(J)' : '知觉(P)'}倾向（${Math.abs(dimensions.JP)}%）

请生成一份完整的性格解读报告，包含以下部分，用分段的方式呈现：

【性格核心特质】
（描述这个类型最显著的性格特征，约150字）

【优势与潜能】
（分析这个类型的主要优势，约100字）

【潜在盲点与成长建议】
（指出可能的短板和成长方向，约100字）

【人际关系模式】
（描述在社交和亲密关系中的特点，约80字）

【职业发展建议】
（适合的职业类型和发挥优势的方法，约100字）

语气要专业但亲切，像一位了解用户的朋友在分析。注意分段输出，每段开头用【】标注。`;

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

          // Add done signal
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
