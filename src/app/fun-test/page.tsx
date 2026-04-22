'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Clock, HelpCircle, TrendingUp, X } from 'lucide-react';
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
        test.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="min-h-screen w-full px-4 md:px-6 pt-4 md:pt-24 pb-28 md:pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-purple-400">12种趣味测试</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">趣味测试矩阵</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            从发疯文学到欧美Meme，从韩综到二次元
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="搜索测试名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 bg-secondary/50 border-border h-11"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills - horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-6 -mx-4 px-4 md:mx-0 md:px-0">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/20'
                : 'bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground mb-4">
          共 {filteredTests.length} 个测试
        </div>

        {/* Test Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredTests.map((test) => (
            <Link key={test.id} href={`/fun-test/${test.id}`} className="block group">
              <Card className="p-4 md:p-5 bg-card/60 backdrop-blur-sm border-border hover:border-purple-500/40 transition-all duration-200 h-full active:scale-[0.98]">
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Emoji icon */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${test.themeColor} flex items-center justify-center text-2xl md:text-3xl flex-shrink-0 shadow-lg`}>
                    {test.emoji}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm md:text-base truncate group-hover:text-purple-400 transition-colors">
                        {test.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-2">
                      {test.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed mb-3 line-clamp-2">
                      {test.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] md:text-xs text-muted-foreground/60">
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {test.questionCount}题
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {test.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {Object.keys(test.results).length}种结果
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm mb-4">没有找到匹配的测试</p>
            <Button
              variant="outline"
              size="sm"
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
