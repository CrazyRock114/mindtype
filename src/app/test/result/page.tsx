'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AIResponse } from '@/components/AIResponse';
import { ChatInterface } from '@/components/ChatInterface';
import { mbtiTypes } from '@/lib/mbti-data';
import { useAIChat } from '@/hooks/useAIChat';
import { Suspense } from 'react';

function ResultContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'INTJ';
  const typeInfo = mbtiTypes[type] || mbtiTypes.INTJ;

  const [interpretation, setInterpretation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'interpretation' | 'chat'>('interpretation');

  const { messages, isLoading: isChatLoading, sendMessage, clearMessages } = useAIChat({ mbtiType: type });

  // Fetch interpretation
  useEffect(() => {
    const fetchInterpretation = async () => {
      setIsLoading(true);
      setInterpretation('');

      try {
        const response = await fetch('/api/mbti/interpret', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type,
            dimensions: { EI: 50, SN: -30, TF: 70, JP: 40 }, // Default dimensions
            answers: [],
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch interpretation');

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;

          if (value) {
            const chunk = decoder.decode(value, { stream: !done });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  continue;
                }
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    setInterpretation(prev => prev + parsed.content);
                  }
                } catch (e) {
                  // Ignore parse errors
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Interpretation error:', error);
        setInterpretation('抱歉，AI解读生成失败。请稍后再试。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterpretation();
  }, [type]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `我是${typeInfo.name}人格！`,
        text: `${typeInfo.description} 了解你的MBTI类型：`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板！');
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/test">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回测试
          </Button>
        </Link>

        {/* Result Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-4">你的MBTI人格类型是</p>
          <div className="flex justify-center gap-1 mb-4">
            {type.split('').map((letter, i) => (
              <span
                key={i}
                className={`text-6xl md:text-7xl font-bold animate-bounce-in ${
                  i === 0 ? 'type-E' :
                  i === 1 ? 'type-I' :
                  i === 2 ? 'type-T' : 'type-P'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-2">{typeInfo.name}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {typeInfo.role}
          </p>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            {typeInfo.description}
          </p>

          {/* Actions */}
          <div className="flex gap-4 justify-center mt-8">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              分享结果
            </Button>
            <Link href="/test">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                重新测试
              </Button>
            </Link>
          </div>
        </div>

        {/* Traits */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 bg-green-500/5 border-green-500/20">
            <h3 className="font-bold text-green-400 mb-4">性格优势</h3>
            <ul className="space-y-2">
              {typeInfo.strengths.map((strength, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6 bg-amber-500/5 border-amber-500/20">
            <h3 className="font-bold text-amber-400 mb-4">潜在盲点</h3>
            <ul className="space-y-2">
              {typeInfo.weaknesses.map((weakness, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-amber-500">!</span>
                  {weakness}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('interpretation')}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'interpretation' ? 'text-purple-400' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            AI 深度解读
            {activeTab === 'interpretation' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'chat' ? 'text-purple-400' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageCircle className="w-4 h-4 inline mr-1" />
            AI 对话
            {activeTab === 'chat' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'interpretation' ? (
          <Card className="p-6 bg-card/60 backdrop-blur-sm border-purple-500/20">
            <AIResponse
              content={interpretation}
              isLoading={isLoading}
              onRetry={() => {
                setInterpretation('');
                window.location.reload();
              }}
            />
          </Card>
        ) : (
          <Card className="p-4 bg-card/60 backdrop-blur-sm border-purple-500/20 h-[500px]">
            <ChatInterface
              messages={messages}
              onSend={sendMessage}
              onClear={clearMessages}
              isLoading={isChatLoading}
            />
          </Card>
        )}

        {/* Career Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">适合的职业方向</h2>
          <div className="flex flex-wrap gap-3">
            {typeInfo.careers.map((career, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-secondary/80 rounded-full text-sm font-medium"
              >
                {career}
              </span>
            ))}
          </div>
        </div>

        {/* Relationship */}
        <Card className="mt-8 p-6 bg-card/60 backdrop-blur-sm border-purple-500/20">
          <h3 className="font-bold mb-4">人际关系模式</h3>
          <p className="text-muted-foreground leading-relaxed">
            {typeInfo.relationships}
          </p>
        </Card>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
