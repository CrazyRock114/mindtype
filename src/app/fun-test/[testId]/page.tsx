'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getFunTest } from '@/lib/fun-tests';

export default function FunTestPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;
  const test = getFunTest(testId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset when test changes
  useEffect(() => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
  }, [testId]);

  const handleSelect = useCallback((optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = optionIndex;
      return next;
    });

    // Auto-advance after user sees their selection
    if (test && currentQuestion < test.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((q) => q + 1);
      }, 500);
    } else if (test) {
      setTimeout(() => {
        setIsComplete(true);
      }, 400);
    }
  }, [currentQuestion, test]);

  // Handle completion
  useEffect(() => {
    if (isComplete && test && answers.length === test.questions.length) {
      const storageKey = `fun_test_${testId}_answers`;
      localStorage.setItem(storageKey, JSON.stringify(answers));
      router.push(`/fun-test/${testId}/result`);
    }
  }, [isComplete, test, testId, answers, router]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete) return;
      if (e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1;
        if (test && idx < test.questions[currentQuestion].options.length) {
          handleSelect(idx);
        }
      } else if (e.key === 'ArrowLeft' && currentQuestion > 0) {
        setCurrentQuestion((q) => q - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isComplete, test, handleSelect]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">加载中...</p>
        </div>
      </div>
    );
  }

  // Invalid test ID
  if (!test) {
    return (
      <div className="min-h-screen w-full px-4 pt-4 md:pt-24 pb-28">
        <div className="max-w-md mx-auto text-center py-20">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <h1 className="text-lg font-bold mb-1">测试未找到</h1>
          <p className="text-sm text-muted-foreground mb-5">这个测试不存在或已被移除</p>
          <Link href="/fun-test">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500">返回测试列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const currentQ = test.questions[currentQuestion];
  const answeredCount = answers.filter((a) => a !== undefined).length;

  return (
    <div className="min-h-screen w-full px-4 pt-4 md:pt-20 pb-28 md:pb-8">
      <div className="max-w-xl mx-auto">
        {/* Header - desktop only */}
        <div className="hidden md:block mb-6">
          <Link href="/fun-test">
            <Button variant="ghost" className="-ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回测试列表
            </Button>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 border ${test.borderColor} bg-secondary/30`}>
            <Sparkles className={`w-3 h-3 ${test.accentColor}`} />
            <span className={`text-xs ${test.accentColor}`}>{test.subtitle}</span>
          </div>
          <h1 className={`text-xl md:text-3xl font-bold bg-gradient-to-r ${test.themeColor} bg-clip-text text-transparent`}>
            {test.title}
          </h1>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-muted-foreground">
              第 {currentQuestion + 1} / {test.questions.length} 题
            </span>
            <span className={`text-xs font-medium ${test.accentColor}`}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${test.themeColor} rounded-full transition-all duration-400`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
            <span><span className={`${test.accentColor} font-semibold`}>{answeredCount}</span> 已答</span>
            <span><span className="text-cyan-400 font-semibold">{test.questions.length - answeredCount}</span> 未答</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className={`p-4 md:p-6 bg-card/80 backdrop-blur-sm ${test.borderColor}`}>
          {currentQ.emoji && (
            <div className="text-center mb-3">
              <span className="text-3xl md:text-4xl">{currentQ.emoji}</span>
            </div>
          )}

          <h2 className="text-base md:text-lg font-bold text-center mb-5 leading-relaxed">
            {currentQ.text}
          </h2>

          {/* Options - larger touch targets for mobile */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, index) => {
              const isSelected = answers[currentQuestion] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`w-full p-4 md:p-5 text-left rounded-xl border-2 transition-all duration-200 group min-h-[56px] active:scale-[0.98] ${
                    isSelected
                      ? `${test.borderColor} bg-secondary/80 shadow-lg`
                      : 'bg-secondary/30 border-transparent hover:bg-secondary/60 hover:border-border/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                      isSelected
                        ? `bg-gradient-to-r ${test.themeColor} text-white`
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="flex-1 text-sm md:text-base leading-snug">{option.text}</span>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all ${
                      isSelected ? `${test.accentColor}` : 'text-muted-foreground/40'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Question Navigator - compact */}
        <div className="mt-5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {test.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-xs md:text-sm transition-colors ${
                  index === currentQuestion
                    ? `bg-gradient-to-r ${test.themeColor} text-white font-bold`
                    : answers[index] !== undefined
                    ? 'bg-secondary/80 text-foreground'
                    : 'bg-secondary/30 text-muted-foreground'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop hint */}
        <p className="hidden md:block text-center text-xs text-muted-foreground mt-5">
          按键盘 1-4 快速选择
        </p>
      </div>
    </div>
  );
}
