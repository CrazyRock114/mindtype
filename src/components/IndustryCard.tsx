'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Industry } from '@/types';

interface IndustryCardProps {
  industry: Industry;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`relative overflow-hidden p-4 md:p-6 bg-card/60 backdrop-blur-sm border-purple-500/10 transition-all duration-300 cursor-pointer active:scale-[0.98] ${
        isHovered ? 'border-purple-500/30 scale-[1.02] glow-purple' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Coming Soon Badge */}
      {industry.comingSoon && (
        <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] md:text-xs font-medium rounded-full flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3" />
          即将上线
        </div>
      )}

      {/* Icon + Title row on mobile, stacked on desktop */}
      <div className="flex md:flex-col items-start md:items-center gap-3 md:gap-0 mb-3 md:mb-4">
        <div className="text-3xl md:text-5xl md:mb-4">{industry.icon}</div>
        <div className="flex-1 md:text-center">
          <h3 className="text-base md:text-xl font-bold">{industry.name}</h3>
          <p className="text-xs md:text-sm text-muted-foreground md:mt-2">{industry.description}</p>
        </div>
      </div>

      {/* Popular Types */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
        {industry.popularTypes.map((type) => (
          <span
            key={type}
            className="px-1.5 py-0.5 md:px-2 md:py-1 bg-secondary/80 rounded text-[10px] md:text-xs font-mono text-purple-400"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Features - compact on mobile */}
      <ul className="space-y-0.5 md:space-y-1 text-xs md:text-sm text-muted-foreground mb-3 md:mb-6">
        {industry.features.slice(0, 2).map((feature, index) => (
          <li key={index} className="flex items-start gap-1.5 md:gap-2">
            <span className="text-purple-500 mt-0.5">•</span>
            <span className="line-clamp-1">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Action */}
      {industry.comingSoon ? (
        <Button variant="outline" className="w-full opacity-50 cursor-not-allowed text-xs md:text-sm" disabled size="sm">
          敬请期待
        </Button>
      ) : (
        <Link href={`/industry/${industry.id}`}>
          <Button variant="outline" className="w-full group border-purple-500/30 hover:border-purple-500 text-xs md:text-sm" size="sm">
            查看详情
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      )}
    </Card>
  );
}
