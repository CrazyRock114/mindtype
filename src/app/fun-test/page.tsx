'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Clock, HelpCircle, TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { funTestList, categoryLabels } from '@/lib/fun-tests';

export default function FunTestLandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(funTestList.map((t) => t.category));
    return Array.from(set);
  }, []);

  const filteredTests = useMemo(() => {
    return funTestList.filter((test) => {
      const matchesSearch =
        !searchQuery ||
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const testsByCategory = useMemo(() => {
    const map: Record<string, typeof funTestList> = {};
    filteredTests.forEach((test) => {
      if (!map[test.category]) map[test.category] = [];
      map[test.category].push(test);
    });
    return map;
  }, [filteredTests]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4 md:px-6 pt-4 md:pt-24 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4 md:mb-6">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
            <span className="text-xs md:text-sm text-purple-400">12种趣味测试，测出你的隐藏人格</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className="gradient-text">趣味测试矩阵</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            从发疯文学到欧美Meme，从韩综到二次元——总有一款适合你
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索测试..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : ''}
            >
              <Filter className="w-3.5 h-3.5 mr-1" />
              全部
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className={selectedCategory === cat ? 'bg-gradient-to-r from-purple-500 to-cyan-500 whitespace-nowrap' : 'whitespace-nowrap'}
              >
                {categoryLabels[cat] || cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Test Grid */}
        {Object.entries(testsByCategory).map(([category, tests]) => (
          <div key={category} className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <span className="text-lg md:text-xl font-bold">
                {categoryLabels[category] || category}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">
                ({tests.length}个测试)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {tests.map((test) => (
                <Link key={test.id} href={`/fun-test/${test.id}`} className="block group">
                  <Card className={`p-4 md:p-6 bg-card/60 backdrop-blur-sm ${test.borderColor} card-hover h-full flex flex-col`}>
                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${test.themeColor} flex items-center justify-center text-2xl md:text-3xl flex-shrink-0`}>
                        {test.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base md:text-lg mb-0.5 md:mb-1 group-hover:text-purple-400 transition-colors truncate">
                          {test.title}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">
                          {test.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4 flex-1 line-clamp-2">
                      {test.description}
                    </p>
                    <div className="flex items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        {test.questionCount}题
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {test.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {Object.keys(test.results).length}种结果
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {filteredTests.length === 0 && (
          <div className="text-center py-16 md:py-24">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">没有找到匹配的测试</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            >
              清除筛选
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
