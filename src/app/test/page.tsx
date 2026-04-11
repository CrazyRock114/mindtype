'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestionCard } from '@/components/QuestionCard';
import { mbtiQuestions, calculateMBTI } from '@/lib/mbti-data';
import { TestProvider, useTest } from '@/hooks/useTestStore';

function TestContent() {
  const router = useRouter();
  const { state, selectAnswer, nextQuestion, prevQuestion, skipQuestion, setResult } = useTest();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = useCallback(() => {
    // Fill unanswered with neutral (3)
    const filledAnswers = state.answers.map(a => a ?? 3);
    const result = calculateMBTI(filledAnswers);
    setResult({
      type: result.type,
      dimensions: result.dimensions,
      answers: filledAnswers,
      timestamp: Date.now(),
    });
  }, [state.answers, setResult]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === '5') {
        if (state.answers[state.currentQuestion] !== null) {
          if (state.currentQuestion === mbtiQuestions.length - 1) {
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
  }, [state.currentQuestion, state.answers, nextQuestion, prevQuestion, selectAnswer, handleSubmit]);

  // Redirect to result when complete
  useEffect(() => {
    if (state.isComplete && state.result) {
      // Save test result to localStorage for result page to read
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

  const currentQ = mbtiQuestions[state.currentQuestion];
  const answeredCount = state.answers.filter(a => a !== null).length;

  return (
    <div className="min-h-screen py-24 px-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">MBTI 性格测试</span>
        </h1>
        <p className="text-muted-foreground">
          共 {mbtiQuestions.length} 道题目，预计用时 5-10 分钟
        </p>

        {/* Stats */}
        <div className="flex gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-semibold">{answeredCount}</span>
            <span className="text-muted-foreground">已作答</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">{mbtiQuestions.length - answeredCount}</span>
            <span className="text-muted-foreground">未作答</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={currentQ}
        questionNumber={state.currentQuestion + 1}
        totalQuestions={mbtiQuestions.length}
        selectedValue={state.answers[state.currentQuestion]}
        onSelect={selectAnswer}
        onNext={() => {
          if (state.currentQuestion === mbtiQuestions.length - 1) {
            handleSubmit();
          } else {
            nextQuestion();
          }
        }}
        onPrev={prevQuestion}
        onSkip={skipQuestion}
        canGoBack={state.currentQuestion > 0}
      />

      {/* Unanswered Questions Quick Jump */}
      {state.answers.some(a => a === null) && (
        <div className="max-w-2xl mx-auto mt-12">
          <p className="text-sm text-muted-foreground mb-3">快速跳转到未作答题目：</p>
          <div className="flex flex-wrap gap-2">
            {state.answers.map((answer, index) => (
              answer === null && (
                <button
                  key={index}
                  onClick={() => {
                    // Navigate to this question by updating state
                    const event = new CustomEvent('jumpToQuestion', { detail: index });
                    window.dispatchEvent(event);
                  }}
                  className="w-8 h-8 rounded-lg bg-secondary/50 hover:bg-secondary flex items-center justify-center text-sm transition-colors"
                >
                  {index + 1}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TestPage() {
  return (
    <TestProvider>
      <TestContent />
    </TestProvider>
  );
}
