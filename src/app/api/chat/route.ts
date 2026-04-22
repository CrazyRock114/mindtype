import { NextRequest, NextResponse } from 'next/server';
import { streamDeepSeek, streamToContentChunks } from '@/lib/deepseek';

export async function POST(request: NextRequest) {
  try {
    const { mbtiType, messages } = await request.json();

    // Create ReadableStream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          // Build conversation history
          const conversationHistory = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content,
          }));

          const lastUserMessage = messages[messages.length - 1]?.content || '';

          const systemPrompt = `你是用户的MBTI性格顾问专家。用户的人格类型是 ${mbtiType}。

请根据这个类型为用户提供个性化建议：
- 可以回答关于职业规划、人际关系、个人成长、自我认知等问题
- 如果用户问题超出范围（如医疗、法律等专业领域），可以礼貌地引导回到性格相关话题
- 保持对话连贯性，记住之前的对话内容
- 回答要专业但亲切，像一位了解用户的朋友

请用自然的对话方式回答，不要过于格式化。`;

          const allMessages = [
            { role: 'system' as const, content: systemPrompt },
            ...conversationHistory,
            { role: 'user' as const, content: lastUserMessage }
          ];

          const responseStream = await streamDeepSeek(allMessages, {
            temperature: 0.8,
          });

          for await (const chunk of streamToContentChunks(responseStream)) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          }

          // Add done signal
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error) {
          console.error('LLM stream error:', error);
          const errorMessage = '抱歉，AI暂时无法回复，请稍后再试。';
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
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
