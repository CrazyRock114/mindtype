'use client';

import { useState, useCallback } from 'react';
import { ChevronRight, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MBTIQuestion } from '@/types';

interface QuestionCardProps {
  question: MBTIQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  canGoBack: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedValue,
  onSelect,
  onNext,
  onPrev,
  onSkip,
  canGoBack
}: QuestionCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = useCallback((value: number) => {
    setIsAnimating(true);
    onSelect(value);
    setTimeout(() => setIsAnimating(false), 200);
  }, [onSelect]);

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-4 md:mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs md:text-sm text-muted-foreground">
            {questionNumber} / {totalQuestions}
          </span>
          <span className="text-xs md:text-sm font-medium text-purple-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 md:h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Dimension Badge */}
      <div className="flex gap-2 mb-3 md:mb-4">
        <span className={`px-2.5 py-1 md:px-3 rounded-full text-[10px] md:text-xs font-medium ${
          question.dimension === 'EI' ? 'type-bg-E type-E' :
          question.dimension === 'SN' ? 'type-bg-S type-S' :
          question.dimension === 'TF' ? 'type-bg-T type-T' :
          'type-bg-J type-J'
        }`}>
          {question.dimension === 'EI' ? '外向/内向' :
           question.dimension === 'SN' ? '实感/直觉' :
           question.dimension === 'TF' ? '思考/情感' : '判断/知觉'}
        </span>
      </div>

      {/* Question Card */}
      <Card
        className={`p-4 md:p-8 bg-card/80 backdrop-blur-sm border-purple-500/20 transition-all duration-200 ${
          isAnimating ? 'scale-[1.02]' : ''
        }`}
      >
        <div className="text-center mb-6 md:mb-10">
          <p className="text-base md:text-xl lg:text-2xl font-medium leading-relaxed">
            {question.textA}
          </p>
          <p className="text-sm md:text-lg text-muted-foreground mt-3 md:mt-6 mb-3 md:mb-8">
            VS
          </p>
          <p className="text-base md:text-xl lg:text-2xl font-medium leading-relaxed">
            {question.textB}
          </p>
        </div>

        {/* Selection Options */}
        <div className="relative">
          {/* Slider Track container */}
          <div className="absolute top-1/2 left-6 right-6 md:left-7 md:right-7 h-1.5 md:h-2 -translate-y-1/2 overflow-hidden">
            <div className="absolute inset-0 bg-secondary rounded-full" />
            {selectedValue !== null && selectedValue !== 3 && (
              <div
                className="absolute h-full rounded-full transition-all duration-300"
                style={{
                  left: selectedValue < 3 ? `${(selectedValue - 1) / 4 * 100}%` : '50%',
                  width: `${Math.abs(selectedValue - 3) / 4 * 100}%`,
                  background: selectedValue < 3
                    ? 'linear-gradient(to right, #8b5cf6, #a78bfa)'
                    : 'linear-gradient(to right, #67e8f9, #06b6d4)',
                }}
              />
            )}
          </div>

          {/* Selection Buttons */}
          <div className="relative flex justify-between items-center">
            {[
              { value: 1, label: '完全同意A' },
              { value: 2, label: '比较同意A' },
              { value: 3, label: '中立' },
              { value: 4, label: '比较同意B' },
              { value: 5, label: '完全同意B' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleSelect(value)}
                className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-semibold text-xs md:text-sm transition-all duration-200 touch-target ${
                  selectedValue === value
                    ? 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white scale-110 md:scale-110 glow-purple'
                    : 'bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground active:scale-95'
                }`}
                aria-label={label}
              >
                {value}
              </button>
            ))}
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-3 md:mt-4 text-[10px] md:text-xs text-muted-foreground">
            <span className="text-left max-w-[30%] truncate">{question.textA.substring(0, 10)}...</span>
            <span className="text-right max-w-[30%] truncate">{question.textB.substring(0, 10)}...</span>
          </div>
        </div>
      </Card>

      {/* Navigation - sticky bottom on mobile */}
      <div className="flex justify-between items-center mt-4 md:mt-8">
        <Button
          variant="ghost"
          onClick={onPrev}
          disabled={!canGoBack}
          className="gap-1 md:gap-2 h-10 md:h-auto text-sm md:text-base"
          size="sm"
        >
          <SkipBack className="w-3.5 h-3.5 md:w-4 md:h-4" />
          上一题
        </Button>

        <Button
          variant="outline"
          onClick={onSkip}
          className="text-muted-foreground border-dashed text-sm md:text-base h-10 md:h-auto"
          size="sm"
        >
          稍后作答
          <SkipForward className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1" />
        </Button>

        <Button
          onClick={onNext}
          disabled={selectedValue === null}
          className="gap-1 md:gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-sm md:text-base h-10 md:h-auto"
          size="sm"
        >
          {questionNumber === totalQuestions ? '查看结果' : '下一题'}
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </Button>
      </div>

      {/* Keyboard Hint - hidden on mobile */}
      <p className="hidden md:block text-center text-xs text-muted-foreground mt-4">
        使用键盘 ← → 选择，或按 1-5 快速选择
      </p>
    </div>
  );
}
