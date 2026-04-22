'use client';

import Link from 'next/link';
import { Brain, Sparkles, MessageCircle, Briefcase, ArrowRight, ChevronDown, Clock, HelpCircle } from 'lucide-react';
import { funTestList, categoryLabels } from '@/lib/fun-tests';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MBTIGrid } from '@/components/MBTIGrid';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section - Mobile-first compact */}
      <section className="relative min-h-[100dvh] flex items-center justify-center px-4 md:px-6 pt-16 md:pt-0 overflow-hidden">
        {/* Gradient Orbs - smaller on mobile, contained */}
        <div className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 md:mb-8">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
            <span className="text-xs md:text-sm text-purple-400">AI驱动的性格分析新时代</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
            <span className="gradient-text">探索你的性格密码</span>
          </h1>

          <p className="text-base md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            通过科学的MBTI测试，结合先进的人工智能，为你呈现深度的性格解读
          </p>

          {/* Dual Entry Buttons - stacked on mobile, side by side on desktop */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-10 md:mb-16 px-4">
            <Link href="/test" className="block">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 group h-auto">
                <Brain className="w-5 h-5 mr-2" />
                正经MBTI测试
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/sbti" className="block">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-pink-500/30 hover:border-pink-500 hover:bg-pink-500/10 h-auto">
                <Sparkles className="w-5 h-5 mr-2 text-pink-400" />
                趣味SBTI测试
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Features Section - Mobile single column */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">为什么选择 MindType？</h2>
            <p className="text-sm md:text-base text-muted-foreground">我们提供的不只是测试，更是深度的自我认知</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <Card className="p-5 md:p-8 bg-card/60 backdrop-blur-sm border-purple-500/10 card-hover">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mb-4 md:mb-6">
                <Brain className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">AI智能解读</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                基于你的测试结果，AI实时生成专业、个性化的性格分析报告，深入挖掘你的性格特质
              </p>
            </Card>

            <Card className="p-5 md:p-8 bg-card/60 backdrop-blur-sm border-purple-500/10 card-hover">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-4 md:mb-6">
                <MessageCircle className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">智能问答交流</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                针对测试结果，与AI进行多轮深度对话，解答关于职业发展、人际关系等困惑
              </p>
            </Card>

            <Card className="p-5 md:p-8 bg-card/60 backdrop-blur-sm border-purple-500/10 card-hover">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-amber-500 to-pink-500 flex items-center justify-center mb-4 md:mb-6">
                <Briefcase className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">行业专区</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                针对不同行业领域的职业特点，提供专属的MBTI人格职业发展建议
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* MBTI Types Section */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">探索16种人格类型</h2>
            <p className="text-sm md:text-base text-muted-foreground">每种人格都有其独特的魅力与潜能</p>
          </div>

          <MBTIGrid />

          <div className="text-center mt-8 md:mt-12">
            <Link href="/test">
              <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                开始测试，发现你的类型
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fun Test Matrix Section */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              <span className="gradient-text">趣味测试矩阵</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              12种搞怪测试，测出你的隐藏人格
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {funTestList.map((test) => (
              <Link key={test.id} href={`/fun-test/${test.id}`} className="block group">
                <Card className={`p-4 md:p-6 bg-card/60 backdrop-blur-sm ${test.borderColor} card-hover h-full flex flex-col`}>
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${test.themeColor} flex items-center justify-center text-xl md:text-2xl flex-shrink-0`}>
                      {test.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm md:text-base mb-0.5 group-hover:text-purple-400 transition-colors truncate">
                        {test.title}
                      </h3>
                      <p className="text-[10px] md:text-xs text-muted-foreground">
                        {categoryLabels[test.category] || test.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2 mb-3">
                    {test.description}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] md:text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      {test.questionCount}题
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {test.estimatedTime}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link href="/fun-test">
              <Button variant="outline" className="border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10">
                查看全部测试
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - compact on mobile */}
      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-6 md:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-900/30 to-cyan-900/30 border border-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl md:rounded-3xl" />
            <div className="relative">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">准备好探索真实的自己了吗？</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
                15分钟的测试，可能改变你对自己的认知
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link href="/test">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                    立即开始测试
                  </Button>
                </Link>
                <Link href="/industry">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    了解行业专区
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - compact on mobile */}
      <footer className="py-8 md:py-12 px-4 md:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center md:gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Brain className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold gradient-text">MindType</span>
            </div>
            <div className="flex gap-6 text-xs md:text-sm text-muted-foreground">
              <Link href="/test" className="hover:text-foreground transition-colors">MBTI测试</Link>
              <Link href="/fun-test" className="hover:text-foreground transition-colors">趣味测试</Link>
              <Link href="/industry" className="hover:text-foreground transition-colors">行业专区</Link>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date().getFullYear()} MindType. 用AI探索自我。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
