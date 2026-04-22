'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getFunTest, funTestList } from '@/lib/fun-tests';

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

    // Auto-advance after a short delay
    if (test && currentQuestion < test.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion((q) => q + 1);
      }, 300);
    } else if (test) {
      setIsComplete(true);
    }
  }, [currentQuestion, test]);

  // Handle completion
  useEffect(() => {
    if (isComplete && test && answers.length === test.questions.length) {
      // Save answers to localStorage for result page
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
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">加载中...</p>
        </div>
      </div>
    );
  }

  // Invalid test ID
  if (!test) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden px-4 md:px-6 pt-4 md:pt-24">
        <div className="max-w-2xl mx-auto text-center py-16 md:py-24">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-xl md:text-2xl font-bold mb-2">测试未找到</h1>
          <p className="text-muted-foreground mb-6">这个测试不存在或已被移除</p>
          <Link href="/fun-test">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500">
              返回测试列表
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const currentQ = test.questions[currentQuestion];
  const answeredCount = answers.filter((a) => a !== undefined).length;

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4 md:px-6 pt-4 md:pt-24">
      <div className="max-w-2xl mx-auto">
        {/* Header - hidden on mobile */}
        <div className="hidden md:block">
          <Link href="/fun-test">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回测试列表
            </Button>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-6 md:mb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-opacity-10 border rounded-full mb-4 md:mb-6`}
            style={{
              backgroundColor: 'var(--secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <Sparkles className={`w-3.5 h-3.5 md:w-4 md:h-4 ${test.accentColor}`} />
            <span className={`text-xs md:text-sm ${test.accentColor}`}>{test.subtitle}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
            <span className={`bg-gradient-to-r ${test.themeColor} bg-clip-text text-transparent`}>
              {test.title}
            </span>
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            {test.description}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-4 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm text-muted-foreground">
              问题 {currentQuestion + 1} / {test.questions.length}
            </span>
            <span className={`text-xs md:text-sm font-medium ${test.accentColor}`}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${test.themeColor} rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 md:gap-6 mb-4 md:mb-6 text-xs md:text-sm">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className={`${test.accentColor} font-semibold`}>{answeredCount}</span>
            <span className="text-muted-foreground">已作答</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="text-cyan-400 font-semibold">{test.questions.length - answeredCount}</span>
            <span className="text-muted-foreground">未作答</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className={`p-4 md:p-8 bg-card/80 backdrop-blur-sm ${test.borderColor}`}>
          {/* Question Emoji */}
          {currentQ.emoji && (
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, var(--secondary), transparent)` }}
            >
              <span className="text-2xl md:text-3xl">{currentQ.emoji}</span>
            </div>
          )}

          <h2 className="text-base md:text-xl font-bold text-center mb-4 md:mb-8">
            {currentQ.text}
          </h2>

          {/* Options */}
          <div className="space-y-2 md:space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = answers[currentQuestion] === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`w-full p-3 md:p-4 text-left rounded-xl border transition-all duration-200 group active:scale-[0.98] ${
                    isSelected
                      ? `${test.borderColor} bg-secondary`
                      : 'bg-secondary/50 border-transparent hover:border-opacity-30'
                  }`}
                  style={{
                    borderColor: isSelected ? undefined : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium flex-shrink-0 transition-colors ${
                      isSelected
                        ? `bg-gradient-to-r ${test.themeColor} text-white`
                        : 'bg-secondary group-hover:bg-secondary/80 text-muted-foreground'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="flex-1 text-sm md:text-base">{option.text}</span>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all ${
                      isSelected ? `${test.accentColor} translate-x-1` : 'text-muted-foreground'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Question Navigator */}
        <div className="mt-4 md:mt-6">
          <p className="text-xs md:text-sm text-muted-foreground mb-2">快速跳转：</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {test.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-xs transition-colors ${
                  index === currentQuestion
                    ? `bg-gradient-to-r ${test.themeColor} text-white`
                    : answers[index] !== undefined
                    ? 'bg-secondary/80 text-foreground'
                    : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Hint */}
        <p className="hidden md:block text-center text-sm text-muted-foreground mt-6">
          按键盘 1-4 快速选择
        </p>
      </div>
    </div>
  );
}
