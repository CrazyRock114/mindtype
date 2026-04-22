'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Brain, Zap, Target, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestionCard } from '@/components/QuestionCard';
import { TestProvider, useTest } from '@/hooks/useTestStore';
import { mbtiQuestions, calculateMBTI } from '@/lib/mbti-data';
import {
  mbtiQuickQuestions,
  mbtiPreciseQuestions,
  calculateMBTIFromQuestions,
} from '@/lib/mbti-tiered-data';

const tiers = [
  {
    id: 'quick' as const,
    name: '极速版',
    description: '16题 · 约3分钟',
    detail: '适合首次体验或时间有限',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    questions: mbtiQuickQuestions,
  },
  {
    id: 'standard' as const,
    name: '标准版',
    description: '28题 · 约8分钟',
    detail: '均衡深度与效率',
    icon: Brain,
    color: 'from-purple-500 to-cyan-500',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    questions: mbtiQuestions,
  },
  {
    id: 'precise' as const,
    name: '精准版',
    description: '48题 · 约15分钟',
    detail: '最全面的深度分析',
    icon: Target,
    color: 'from-emerald-500 to-teal-500',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    questions: mbtiPreciseQuestions,
  },
];

function TestTaking({ tier, onBack }: { tier: (typeof tiers)[number]; onBack: () => void }) {
  const router = useRouter();
  const { state, selectAnswer, nextQuestion, prevQuestion, skipQuestion, setResult } = useTest();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const questions = tier.questions;

  const handleSubmit = useCallback(() => {
    const filledAnswers = state.answers.map((a) => a ?? 3);
    const result =
      tier.id === 'standard'
        ? calculateMBTI(filledAnswers)
        : calculateMBTIFromQuestions(questions, filledAnswers);

    setResult({
      type: result.type,
      dimensions: result.dimensions,
      answers: filledAnswers,
      timestamp: Date.now(),
    });
  }, [state.answers, tier, questions, setResult]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === '5') {
        if (state.answers[state.currentQuestion] !== null) {
          if (state.currentQuestion === questions.length - 1) {
            handleSubmit();
          } else {
            nextQuestion();
          }
        }
      } else if (e.key === 'ArrowLeft') {
        prevQuestion();
      } else if (e.key >= '1' && e.key <= '5') {
        selectAnswer(parseInt(e.key));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.currentQuestion, state.answers, nextQuestion, prevQuestion, selectAnswer, handleSubmit, questions.length]);

  useEffect(() => {
    if (state.isComplete && state.result) {
      localStorage.setItem('mbti_test_result', JSON.stringify(state.result));
      router.push(`/test/result?type=${state.result.type}`);
    }
  }, [state.isComplete, state.result, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[state.currentQuestion];
  const answeredCount = state.answers.filter((a) => a !== null).length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4 md:px-6 pt-4 md:pt-24">
      <div className="max-w-2xl mx-auto mb-4 md:mb-12">
        <div className="hidden md:block">
          <Button variant="ghost" className="mb-8 -ml-4" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回选择
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-2 md:mb-4">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
            <tier.icon className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">
            <span className="gradient-text">{tier.name} MBTI测试</span>
          </h1>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground">
          共 {questions.length} 题，{tier.description.split('·')[1]?.trim() || '预计 5-10 分钟'}
        </p>

        <div className="flex gap-4 md:gap-6 mt-3 md:mt-6 text-xs md:text-sm">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-purple-400 font-semibold">{answeredCount}</span>
            <span className="text-muted-foreground">已作答</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-cyan-400 font-semibold">{questions.length - answeredCount}</span>
            <span className="text-muted-foreground">未作答</span>
          </div>
        </div>
      </div>

      <QuestionCard
        question={currentQ}
        questionNumber={state.currentQuestion + 1}
        totalQuestions={questions.length}
        selectedValue={state.answers[state.currentQuestion]}
        onSelect={selectAnswer}
        onNext={() => {
          if (state.currentQuestion === questions.length - 1) {
            handleSubmit();
          } else {
            nextQuestion();
          }
        }}
        onPrev={prevQuestion}
        onSkip={skipQuestion}
        canGoBack={state.currentQuestion > 0}
      />

      {state.answers.some((a) => a === null) && (
        <div className="max-w-2xl mx-auto mt-6 md:mt-12">
          <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">快速跳转未作答：</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {state.answers.map((answer, index) =>
              answer === null ? (
                <button
                  key={index}
                  onClick={() => {
                    const event = new CustomEvent('jumpToQuestion', { detail: index });
                    window.dispatchEvent(event);
                  }}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-secondary/50 hover:bg-secondary flex items-center justify-center text-xs transition-colors"
                >
                  {index + 1}
                </button>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TierSelector({ onSelect }: { onSelect: (tier: (typeof tiers)[number]) => void }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4 md:px-6 pt-4 md:pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="hidden md:block">
          <Link href="/">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            <span className="gradient-text">选择测试版本</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            根据你的时间和需求，选择最适合的测试版本
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <button
                key={tier.id}
                onClick={() => onSelect(tier)}
                className={`text-left p-5 md:p-6 rounded-xl border ${tier.borderColor} bg-card/60 backdrop-blur-sm card-hover transition-all group`}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">
                  {tier.name}
                </h3>
                <p className={`text-sm font-medium ${tier.textColor} mb-2`}>
                  {tier.description}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {tier.detail}
                </p>
                <div className="mt-4 flex items-center text-xs text-muted-foreground group-hover:text-purple-400 transition-colors">
                  开始测试
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl bg-secondary/30 border border-border text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            不确定选哪个？推荐从「标准版」开始。如果你已经熟悉MBTI，可以尝试「精准版」获得更深入的分析。
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  const [selectedTier, setSelectedTier] = useState<(typeof tiers)[number] | null>(null);

  if (!selectedTier) {
    return <TierSelector onSelect={setSelectedTier} />;
  }

  return (
    <TestProvider questionCount={selectedTier.questions.length}>
      <TestTaking tier={selectedTier} onBack={() => setSelectedTier(null)} />
    </TestProvider>
  );
}
