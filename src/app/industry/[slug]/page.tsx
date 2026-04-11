'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles, Clock, TrendingUp, Users, Lock, Zap, ChevronRight, Loader2, Share2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { industries } from '@/lib/industry-data';
import { mbtiTypes } from '@/lib/mbti-data';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

interface IndustryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { user, profile, isLoading, refreshProfile } = useAuth();
  const industry = industries.find(i => i.id === slug);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisContent, setAnalysisContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalysis, setHasAnalysis] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);

  const ANALYSIS_COST = 20; // 分析费用

  useEffect(() => {
    if (user && profile?.mbtiType) {
      // 检查是否有该行业的分析记录
      checkExistingAnalysis();
    }
  }, [user, profile]);

  const checkExistingAnalysis = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_industry_analyses')
      .select('*')
      .eq('user_id', user.id)
      .eq('industry_id', slug)
      .maybeSingle();

    if (data) {
      setHasAnalysis(true);
      setAnalysisId(data.id);
      if (data.ai_interpretation) {
        setAnalysisContent(data.ai_interpretation);
        setShowAnalysis(true);
      }
    }
  };

  const startAnalysis = async () => {
    if (!user) {
      router.push('/auth');
      return;
    }

    if (!profile?.mbtiType) {
      router.push('/test');
      return;
    }

    if ((profile?.points || 0) < ANALYSIS_COST) {
      alert(`积分不足！需要${ANALYSIS_COST}积分，当前${profile?.points}积分`);
      return;
    }

    setIsAnalyzing(true);

    try {
      // 扣减积分
      await supabase
        .from('user_profiles')
        .update({
          points: (profile?.points || 0) - ANALYSIS_COST,
        })
        .eq('id', user.id);

      await supabase.from('point_transactions').insert({
        user_id: user.id,
        amount: -ANALYSIS_COST,
        type: 'spend',
        description: `获取${industry?.name}专属分析`,
      });

      // 获取最新测试结果
      const { data: latestResult } = await supabase
        .from('mbti_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('mbti_type', profile?.mbtiType)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      // 保存分析记录
      const { data: analysisRecord } = await supabase
        .from('user_industry_analyses')
        .insert({
          user_id: user.id,
          mbti_result_id: latestResult?.id,
          industry_id: slug,
          points_cost: ANALYSIS_COST,
        })
        .select()
        .single();

      if (analysisRecord) {
        setAnalysisId(analysisRecord.id);
      }

      // 调用AI分析
      const response = await fetch('/api/industry/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mbtiType: profile?.mbtiType,
          industryId: slug,
          industryName: industry?.name,
        }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let content = '';
      setShowAnalysis(true);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                content += parsed.content;
                setAnalysisContent(content);
              }
            } catch (e) {}
          }
        }
      }

      // 保存分析内容
      if (content) {
        await supabase
          .from('user_industry_analyses')
          .update({ ai_interpretation: content })
          .eq('id', analysisRecord?.id);

        setHasAnalysis(true);
      }

      await refreshProfile();
    } catch (error) {
      console.error('Analysis error:', error);
      alert('分析失败，请稍后重试');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/industry/${slug}`;
    const shareText = `${industry?.name}的热门MBTI人格类型分析`;

    if (navigator.share) {
      await navigator.share({
        title: shareText,
        text: shareText,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('链接已复制！');
    }
  };

  if (!industry) {
    notFound();
  }

  const popularTypesInfo = industry.popularTypes.map(type => mbtiTypes[type]).filter(Boolean);

  // 未登录用户的注册引导
  if (!isLoading && !user) {
    return (
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
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
            {industry.hotRank && industry.hotRank <= 10 && (
              <Badge className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500">
                热门行业 TOP {industry.hotRank}
              </Badge>
            )}
          </div>

          {/* Description */}
          <Card className="p-8 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-8">
            <h2 className="text-xl font-bold mb-4">行业概述</h2>
            <p className="text-muted-foreground leading-relaxed">{industry.description}</p>
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

          {/* Locked Features */}
          <Card className="p-8 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border-purple-500/30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">解锁专属分析</h2>
              <p className="text-muted-foreground mb-6">
                登录后获取你的专属MBTI人格在{industry.name}行业的深度分析
              </p>
              <div className="space-y-3">
                <Link href="/auth" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                    登录 / 注册
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  注册即送100积分，可用于解锁多项专属功能
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // 已登录但未测试
  if (!isLoading && user && !profile?.mbtiType) {
    return (
      <div className="min-h-screen py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/industry">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回行业专区
            </Button>
          </Link>

          <Card className="p-8 text-center">
            <div className="text-6xl mb-4">{industry.icon}</div>
            <h1 className="text-2xl font-bold mb-4">{industry.name}</h1>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">先完成MBTI测试</h2>
            <p className="text-muted-foreground mb-6">
              获取你的专属人格类型，开启{industry.name}专属分析
            </p>
            <Link href="/test">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                立即测试
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

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
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{industry.icon}</div>
          <h1 className="text-4xl font-bold mb-2">{industry.name}</h1>
          <p className="text-muted-foreground">{industry.nameEn}</p>
          {industry.hotRank && industry.hotRank <= 10 && (
            <Badge className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500">
              热门行业 TOP {industry.hotRank}
            </Badge>
          )}
        </div>

        {/* User MBTI Badge */}
        <div className="flex justify-center mb-8">
          <Link href={`/test/result?type=${profile?.mbtiType}`}>
            <Badge className="px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 text-lg cursor-pointer">
              你的MBTI：{profile?.mbtiType}
            </Badge>
          </Link>
        </div>

        {/* Description */}
        <Card className="p-8 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-6">
          <h2 className="text-xl font-bold mb-4">行业概述</h2>
          <p className="text-muted-foreground leading-relaxed">{industry.description}</p>
        </Card>

        {/* Features */}
        <Card className="p-8 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-6">
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
        <Card className="p-8 bg-card/60 backdrop-blur-sm border-purple-500/20 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold">热门人格类型</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {popularTypesInfo.map((typeInfo) => (
              <div
                key={typeInfo.type}
                className={`p-4 rounded-xl border ${
                  typeInfo.type === profile?.mbtiType
                    ? 'bg-purple-500/20 border-purple-500/50'
                    : 'bg-secondary/50 border-border'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold gradient-text">{typeInfo.type}</span>
                  <span className="text-sm text-muted-foreground">{typeInfo.name}</span>
                  {typeInfo.type === profile?.mbtiType && (
                    <Badge className="ml-auto bg-green-500/20 text-green-400">你</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{typeInfo.role}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Analysis Section */}
        <Card className="p-8 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-purple-500/20 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold">专属AI分析</h2>
          </div>

          {showAnalysis && analysisContent ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-green-500/20 text-green-400">已解锁</Badge>
                <span className="text-sm text-muted-foreground">消耗 {ANALYSIS_COST} 积分</span>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="whitespace-pre-wrap leading-relaxed text-sm">
                  {analysisContent}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(analysisContent);
                    alert('已复制到剪贴板');
                  }}
                  className="flex-1"
                >
                  复制分析
                </Button>
                <Button variant="outline" onClick={handleShare} className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  分享
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">解锁专属人格分析</h3>
              <p className="text-sm text-muted-foreground mb-4">
                基于你的{profile?.mbtiType}人格，获取在{industry.name}的深度发展建议
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-amber-400">{ANALYSIS_COST} 积分</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                当前积分：{profile?.points || 0}
              </p>
              <Button
                onClick={startAnalysis}
                disabled={isAnalyzing || (profile?.points || 0) < ANALYSIS_COST}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    立即解锁分析
                  </>
                )}
              </Button>
              {(profile?.points || 0) < ANALYSIS_COST && (
                <p className="text-xs text-amber-400 mt-2">
                  积分不足，请先签到或充值
                </p>
              )}
            </div>
          )}
        </Card>

        {/* More Actions */}
        <div className="flex gap-4">
          <Link href="/profile" className="flex-1">
            <Button variant="outline" className="w-full">
              个人中心
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Button variant="outline" onClick={handleShare} className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            分享行业
          </Button>
        </div>
      </div>
    </div>
  );
}
