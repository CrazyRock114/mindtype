'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles, Clock, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { industries } from '@/lib/industry-data';
import { mbtiTypes } from '@/lib/mbti-data';

interface IndustryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { slug } = use(params);
  const industry = industries.find(i => i.id === slug);

  if (!industry) {
    notFound();
  }

  const popularTypesInfo = industry.popularTypes.map(type => mbtiTypes[type]).filter(Boolean);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link href="/industry">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回行业专区
          </Button>
        </Link>

        {/* Industry Hero */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{industry.icon}</div>
          <h1 className="text-4xl font-bold mb-2">{industry.name}</h1>
          <p className="text-muted-foreground">{industry.nameEn}</p>
        </div>

        {/* Description */}
        <Card className="p-8 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-8">
          <h2 className="text-xl font-bold mb-4">行业概述</h2>
          <p className="text-muted-foreground leading-relaxed">{industry.description}</p>
        </Card>

        {/* Features */}
        <Card className="p-8 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-8">
          <h2 className="text-xl font-bold mb-6">行业特点</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {industry.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-400 text-sm">{i + 1}</span>
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Popular Types */}
        <Card className="p-8 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold">热门人格类型</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {popularTypesInfo.map((typeInfo) => (
              <div
                key={typeInfo.type}
                className="p-4 bg-secondary/50 rounded-xl border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold gradient-text">{typeInfo.type}</span>
                  <span className="text-sm text-muted-foreground">{typeInfo.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{typeInfo.role}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Coming Soon Features */}
        <Card className="p-8 bg-gradient-to-br from-amber-500/10 to-purple-500/10 border-amber-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-amber-400">即将上线</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>该行业的专属MBTI职业分析报告</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span>针对不同人格的晋升路径建议</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>行业内优秀从业者的职业发展案例</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-amber-500/20">
            <p className="text-sm text-muted-foreground">
              订阅更新，第一时间获取该行业的深度分析
            </p>
            <div className="flex gap-3 mt-3">
              <input
                type="email"
                placeholder="输入邮箱订阅"
                className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm"
              />
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                订阅
              </Button>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link href="/test">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
              先完成MBTI测试
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
