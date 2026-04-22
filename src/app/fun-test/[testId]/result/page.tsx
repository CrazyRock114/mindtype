'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  RefreshCw,
  Brain,
  Sparkles,
  Copy,
  Check,
  Quote,
  Tag,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getFunTest, saveTestRecord, rarityColors } from '@/lib/fun-tests';
import type { CalculationResult } from '@/lib/fun-tests';

export default function FunTestResultPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params.testId as string;
  const test = getFunTest(testId);

  const [calcResult, setCalcResult] = useState<CalculationResult | null>(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load answers and calculate result
  useEffect(() => {
    if (!test) return;
    try {
      const storageKey = `fun_test_${testId}_answers`;
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const answers: number[] = JSON.parse(raw);
        const result = test.calculate(answers);
        setCalcResult(result);
        saveTestRecord(testId, result.primary);
      } else {
        // No answers found - redirect to test
        router.push(`/fun-test/${testId}`);
      }
    } catch {
      router.push(`/fun-test/${testId}`);
    }
  }, [test, testId, router]);

  const primaryResult = useMemo(() => {
    if (!test || !calcResult) return null;
    return test.results[calcResult.primary];
  }, [test, calcResult]);

  const secondaryResult = useMemo(() => {
    if (!test || !calcResult) return null;
    return test.results[calcResult.secondary];
  }, [test, calcResult]);

  const handleShare = async () => {
    if (!test || !primaryResult) return;
    const url = `${window.location.origin}/fun-test/${testId}`;
    const text = `我的${test.title}结果是：${primaryResult.title}\n${primaryResult.memeQuote}\n\n快来测测你的！`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${test.title} - ${primaryResult.title}`,
          text,
          url,
        });
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/fun-test/${testId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleRetake = () => {
    localStorage.removeItem(`fun_test_${testId}_answers`);
    router.push(`/fun-test/${testId}`);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">计算结果中...</p>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen w-full px-4 md:px-6 pt-4 md:pt-24">
        <div className="max-w-2xl mx-auto text-center py-16 md:py-24">
          <h1 className="text-xl md:text-2xl font-bold mb-2">测试未找到</h1>
          <p className="text-muted-foreground mb-6">这个测试不存在或已被移除</p>
          <Link href="/fun-test">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500">返回测试列表</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!calcResult || !primaryResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">分析结果中...</p>
        </div>
      </div>
    );
  }

  const rarity = primaryResult.rarity || 'N';
  const rarityClass = rarityColors[rarity] || rarityColors['N'];

  return (
    <div className="min-h-screen w-full px-4 md:px-6 pt-4 md:pt-24 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <div className="hidden md:block">
          <Link href="/fun-test">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回测试列表
            </Button>
          </Link>
        </div>

        {/* Result Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 ${rarityClass}`}>
            <Star className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-medium">{rarity} 稀有度</span>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
            你的{test.title}结果是
          </p>

          <div className="flex justify-center mb-2 md:mb-4">
            <span className="text-5xl md:text-7xl animate-bounce-in">{primaryResult.emoji}</span>
          </div>

          <h1 className={`text-3xl md:text-5xl font-bold mb-1 md:mb-2 ${primaryResult.color}`}>
            {primaryResult.title}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground font-mono tracking-wider">
            {primaryResult.subtitle}
          </p>
        </div>

        {/* Main Result Card */}
        <Card className={`p-5 md:p-8 bg-gradient-to-br ${primaryResult.bgGradient} bg-opacity-10 backdrop-blur-sm border-white/10 mb-4 md:mb-6`}>
          <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6">
            {primaryResult.description}
          </p>

          {/* Traits */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {primaryResult.traits.map((trait, i) => (
              <span
                key={i}
                className="px-2.5 py-1 md:px-3 md:py-1.5 bg-white/10 rounded-full text-xs md:text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Meme Quote */}
          <div className="p-3 md:p-4 bg-black/20 rounded-xl">
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 md:w-5 md:h-5 text-white/60 flex-shrink-0 mt-0.5" />
              <p className="text-sm md:text-base italic text-white/80">{primaryResult.memeQuote}</p>
            </div>
          </div>
        </Card>

        {/* MBTI Hint */}
        {primaryResult.mbtiHint && (
          <Card className="p-4 md:p-6 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-4 md:mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-sm md:text-base">正经MBTI推测</h3>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              根据你的选择，你的正经MBTI可能是 <span className="text-purple-400 font-semibold">{primaryResult.mbtiHint}</span>
            </p>
          </Card>
        )}

        {/* Score Breakdown */}
        <Card className="p-4 md:p-6 bg-card/60 backdrop-blur-sm border-border mb-4 md:mb-6">
          <h3 className="font-bold text-sm md:text-base mb-3 md:mb-4">得分分布</h3>
          <div className="space-y-2 md:space-y-3">
            {Object.entries(calcResult.allScores)
              .sort((a, b) => b[1] - a[1])
              .map(([resultId, score]) => {
                const result = test.results[resultId];
                if (!result) return null;
                const maxScore = Math.max(...Object.values(calcResult.allScores));
                const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
                const isPrimary = resultId === calcResult.primary;
                return (
                  <div key={resultId} className="flex items-center gap-2 md:gap-3">
                    <span className="text-base md:text-lg flex-shrink-0">{result.emoji}</span>
                    <span className={`text-xs md:text-sm font-medium w-16 md:w-24 flex-shrink-0 ${isPrimary ? result.color : 'text-muted-foreground'}`}>
                      {result.title}
                    </span>
                    <div className="flex-1 h-2 md:h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isPrimary ? `bg-gradient-to-r ${result.bgGradient}` : 'bg-muted-foreground/30'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right flex-shrink-0">{score}分</span>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* Secondary Result */}
        {secondaryResult && secondaryResult.id !== primaryResult.id && (
          <Card className="p-4 md:p-6 bg-card/40 backdrop-blur-sm border-border mb-4 md:mb-6">
            <p className="text-xs md:text-sm text-muted-foreground mb-2">次要人格</p>
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl">{secondaryResult.emoji}</span>
              <div>
                <p className={`font-bold ${secondaryResult.color}`}>{secondaryResult.title}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{secondaryResult.subtitle}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8">
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full sm:w-auto gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? '已复制' : '分享结果'}
          </Button>
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full sm:w-auto gap-2"
          >
            <Copy className="w-4 h-4" />
            复制链接
          </Button>
          <Button
            onClick={handleRetake}
            variant="outline"
            className="w-full sm:w-auto gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            再测一次
          </Button>
        </div>

        {/* CTA: Try正经MBTI */}
        <div className="text-center p-5 md:p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/20">
          <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mx-auto mb-3 md:mb-4" />
          <h2 className="text-lg md:text-xl font-bold mb-2">想知道更准确的自己？</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            趣味测试仅供娱乐，正经MBTI测试给你更专业的分析
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/test" className="block">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 gap-2">
                <Brain className="w-4 h-4" />
                测测正经MBTI
              </Button>
            </Link>
            <Link href="/fun-test" className="block">
              <Button variant="outline" className="w-full sm:w-auto">
                探索更多测试
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
