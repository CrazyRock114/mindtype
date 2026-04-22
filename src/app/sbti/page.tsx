'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SBITCertificate } from '@/components/SBITCertificate';
import { sbtiQuestions, sbtiTypes, calculateSBTI } from '@/lib/sbti-data';

export default function SBTIPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [resultType, setResultType] = useState<string | null>(null);

  const handleSelect = useCallback((optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < sbtiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const type = calculateSBTI(newAnswers);
      setResultType(type);
      setIsComplete(true);
    }
  }, [answers, currentQuestion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete) return;
      if (e.key >= '1' && e.key <= '4') {
        handleSelect(parseInt(e.key) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isComplete, handleSelect]);

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setResultType(null);
  };

  const progress = ((currentQuestion + 1) / sbtiQuestions.length) * 100;
  const currentQ = sbtiQuestions[currentQuestion];

  return (
    <div className="min-h-screen w-full px-4 md:px-6 pt-4 md:pt-24">
      <div className="max-w-2xl mx-auto">
        {/* Header - hidden on mobile (bottom tab) */}
        <div className="hidden md:block">
          <Link href="/">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>

        {!isComplete ? (
          <>
            {/* Title */}
            <div className="text-center mb-6 md:mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4 md:mb-6">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-pink-400" />
                <span className="text-xs md:text-sm text-pink-400">超能脑洞类型指示器</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  SBTI 趣味测试
                </span>
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                不用太认真，只是个有趣的测试而已
              </p>
            </div>

            {/* Progress */}
            <div className="mb-4 md:mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs md:text-sm text-muted-foreground">
                  问题 {currentQuestion + 1} / {sbtiQuestions.length}
                </span>
                <span className="text-xs md:text-sm font-medium text-pink-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <Card className="p-4 md:p-8 bg-card/80 backdrop-blur-sm border-pink-500/20">
              {/* Question Icon */}
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-2xl md:text-3xl">
                  {currentQuestion === 0 ? '🐨' :
                   currentQuestion === 1 ? '📱' :
                   currentQuestion === 2 ? '😴' :
                   currentQuestion === 3 ? '👋' :
                   currentQuestion === 4 ? '⏰' :
                   currentQuestion === 5 ? '💰' :
                   currentQuestion === 6 ? '🍽️' : '📱'}
                </span>
              </div>

              <h2 className="text-base md:text-xl font-bold text-center mb-4 md:mb-8">
                {currentQ.text}
              </h2>

              {/* Options */}
              <div className="space-y-2 md:space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className="w-full p-3 md:p-4 text-left bg-secondary/50 hover:bg-secondary rounded-xl border border-transparent hover:border-pink-500/30 active:scale-[0.98] transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pink-500/10 group-hover:bg-pink-500/20 flex items-center justify-center text-xs md:text-sm font-medium text-pink-400 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="flex-1 text-sm md:text-base">{option.text}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-pink-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Hint - hidden on mobile */}
            <p className="hidden md:block text-center text-sm text-muted-foreground mt-6">
              按键盘 1-4 快速选择
            </p>
          </>
        ) : (
          /* Result */
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4 md:mb-6">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
              <span className="text-xs md:text-sm text-amber-400">恭喜！你的SBTI结果出来了</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="gradient-text">你是哪种类型？</span>
            </h1>
          </div>
        )}

        {/* Certificate */}
        {isComplete && resultType && sbtiTypes[resultType] && (
          <div className="mt-6 md:mt-8">
            <SBITCertificate
              type={sbtiTypes[resultType]}
              onReset={handleReset}
            />
          </div>
        )}
      </div>
    </div>
  );
}
