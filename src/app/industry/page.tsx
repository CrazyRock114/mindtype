'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IndustryCard } from '@/components/IndustryCard';
import { industries } from '@/lib/industry-data';

export default function IndustryPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Link href="/">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400">未来规划</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">行业专区</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            针对不同行业领域的特点，提供专属的MBTI人格职业发展建议
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-6 mb-12 text-center">
          <h3 className="font-bold text-purple-400 mb-2">部分功能即将上线</h3>
          <p className="text-sm text-muted-foreground">
            我们正在为每个行业开发专属的MBTI职业分析功能，敬请期待！
          </p>
        </div>

        {/* Industry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
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
