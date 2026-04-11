'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Share2, RefreshCw, MessageCircle, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AIResponse } from '@/components/AIResponse';
import { ChatInterface } from '@/components/ChatInterface';
import { mbtiTypes, mbtiQuestions, calculateMBTI } from '@/lib/mbti-data';
import { useAIChat } from '@/hooks/useAIChat';
import { Suspense } from 'react';

function ResultContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'INTJ';
  const typeInfo = mbtiTypes[type] || mbtiTypes.INTJ;

  // Try to restore test answers from localStorage for AI interpretation
  const [savedAnswers, setSavedAnswers] = useState<number[] | null>(null);
  const [savedDimensions, setSavedDimensions] = useState<{ EI: number; SN: number; TF: number; JP: number } | null>(null);
  const [hasRealTest, setHasRealTest] = useState(false);

  // AI interpretation state
  const [interpretation, setInterpretation] = useState('');
  const [isInterpreting, setIsInterpreting] = useState(false);
  const [hasRequestedAI, setHasRequestedAI] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'interpretation' | 'chat'>('info');

  const { messages, isLoading: isChatLoading, sendMessage, clearMessages } = useAIChat({ mbtiType: type });

  // Load saved test data from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mbti_test_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.result && parsed.result.type === type && parsed.result.answers) {
          setSavedAnswers(parsed.result.answers);
          setSavedDimensions(parsed.result.dimensions);
          setHasRealTest(true);
          return;
        }
      }
      // Also check for completed test result
      const resultSaved = localStorage.getItem('mbti_test_result');
      if (resultSaved) {
        const parsed = JSON.parse(resultSaved);
        if (parsed.type === type && parsed.answers) {
          setSavedAnswers(parsed.answers);
          setSavedDimensions(parsed.dimensions);
          setHasRealTest(true);
          return;
        }
      }
    } catch {
      // Ignore
    }
  }, [type]);

  // Save test result for result page when coming from test
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mbti_test_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.result && parsed.result.type === type) {
          localStorage.setItem('mbti_test_result', JSON.stringify(parsed.result));
        }
      }
    } catch {
      // Ignore
    }
  }, [type]);

  // Build answer summary for AI prompt
  const buildAnswerSummary = useCallback((): string => {
    if (!savedAnswers || savedAnswers.length === 0) return '';

    const lines: string[] = [];
    mbtiQuestions.forEach((q, i) => {
      const answer = savedAnswers[i];
      if (answer !== undefined && answer !== null) {
        const choice = answer >= 3 ? q.textA : q.textB;
        const strength = answer === 3 ? '（中立偏' + (answer >= 3 ? 'A' : 'B') + '）' : answer >= 4 ? '（较强烈）' : '（非常强烈）';
        lines.push(`Q${i + 1}: ${choice} ${strength}`);
      }
    });
    return lines.join('\n');
  }, [savedAnswers]);

  // Fetch AI interpretation (only when user explicitly requests)
  const fetchInterpretation = useCallback(async () => {
    if (isInterpreting) return;

    setHasRequestedAI(true);
    setIsInterpreting(true);
    setInterpretation('');
    setActiveTab('interpretation');

    try {
      // Use real dimensions if available, otherwise fallback
      const dimensions = savedDimensions || calculateMBTI(Array(28).fill(3)).dimensions;

      // Build answer details
      const answerSummary = buildAnswerSummary();

      const response = await fetch('/api/mbti/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          dimensions,
          answers: savedAnswers || [],
          answerSummary,
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
              } catch {
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
      setIsInterpreting(false);
    }
  }, [type, savedAnswers, savedDimensions, isInterpreting, buildAnswerSummary]);

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

  // Dimension display
  const dimensions = savedDimensions || { EI: 0, SN: 0, TF: 0, JP: 0 };
  const dimensionLabels = [
    { key: 'EI', left: '外向(E)', right: '内向(I)', value: dimensions.EI },
    { key: 'SN', left: '实感(S)', right: '直觉(N)', value: dimensions.SN },
    { key: 'TF', left: '思考(T)', right: '情感(F)', value: dimensions.TF },
    { key: 'JP', left: '判断(J)', right: '知觉(P)', value: dimensions.JP },
  ];

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

          {/* Source indicator */}
          {hasRealTest ? (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              基于你的28道测试题目结果
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-400">
              <BookOpen className="w-3 h-3" />
              类型概览（未完成测试）
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-center mt-8">
            {!hasRealTest && (
              <Link href="/test">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  完成测试获取专属解读
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              分享结果
            </Button>
            {hasRealTest && (
              <Link href="/test">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重新测试
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Dimension Bars */}
        <Card className="p-6 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-8">
          <h3 className="font-bold mb-6">维度分析</h3>
          <div className="space-y-5">
            {dimensionLabels.map((dim) => {
              const percentage = Math.abs(dim.value);
              const isLeft = dim.value > 0;
              return (
                <div key={dim.key}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={isLeft ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                      {dim.left}
                    </span>
                    <span className="text-xs text-muted-foreground">{percentage}%</span>
                    <span className={!isLeft ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                      {dim.right}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isLeft
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 float-left'
                          : 'bg-gradient-to-l from-cyan-500 to-purple-500 float-right'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Traits */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-green-500/5 border-green-500/20">
            <h3 className="font-bold text-green-400 mb-4">性格优势</h3>
            <ul className="space-y-2">
              {typeInfo.strengths.map((strength, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">&#10003;</span>
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

        {/* Career Section */}
        <div className="mb-8">
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
        <Card className="p-6 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-8">
          <h3 className="font-bold mb-4">人际关系模式</h3>
          <p className="text-muted-foreground leading-relaxed">
            {typeInfo.relationships}
          </p>
        </Card>

        {/* AI Deep Interpretation Section */}
        <div className="mt-12 border-t border-border pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">AI 深度解读</h2>
            <p className="text-muted-foreground">
              {hasRealTest
                ? '基于你28道题目的具体选择，AI为你生成专属性格分析'
                : '完成MBTI测试后，AI将根据你的具体选择生成深度解读'}
            </p>
          </div>

          {!hasRequestedAI ? (
            <div className="text-center">
              <Button
                size="lg"
                onClick={fetchInterpretation}
                disabled={!hasRealTest}
                className={`px-8 py-6 text-lg ${
                  hasRealTest
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90'
                    : ''
                }`}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {hasRealTest ? '获取AI深度解读' : '请先完成测试'}
              </Button>
              {hasRealTest && (
                <p className="text-xs text-muted-foreground mt-3">
                  解读将基于你每道题的具体选择生成，约需10-20秒
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Tabs for interpretation and chat */}
              <div className="flex gap-2 mb-6 border-b border-border">
                <button
                  onClick={() => setActiveTab('interpretation')}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                    activeTab === 'interpretation' ? 'text-purple-400' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  AI 解读
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
                    isLoading={isInterpreting}
                    onRetry={fetchInterpretation}
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
            </>
          )}
        </div>
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
