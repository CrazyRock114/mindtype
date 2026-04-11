'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IndustryCard } from '@/components/IndustryCard';
import { industries } from '@/lib/industry-data';

export default function IndustryPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4 md:px-6 pt-4 md:pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header - hidden on mobile */}
        <div className="hidden md:block">
          <Link href="/">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4 md:mb-6">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
            <span className="text-xs md:text-sm text-amber-400">未来规划</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
            <span className="gradient-text">行业专区</span>
          </h1>
          <p className="text-xs md:text-base text-muted-foreground max-w-2xl mx-auto">
            针对不同行业领域的特点，提供专属的MBTI人格职业发展建议
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-4 md:p-6 mb-6 md:mb-12 text-center">
          <h3 className="font-bold text-purple-400 mb-1.5 md:mb-2 text-sm md:text-base">部分功能即将上线</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            我们正在为每个行业开发专属的MBTI职业分析功能，敬请期待！
          </p>
        </div>

        {/* Industry Grid - single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 md:mt-16 text-center">
          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
            先完成MBTI测试，了解自己的性格类型
          </p>
          <Link href="/test">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
              立即开始测试
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
