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
      className={`relative overflow-hidden p-6 bg-card/60 backdrop-blur-sm border-purple-500/10 transition-all duration-300 cursor-pointer ${
        isHovered ? 'border-purple-500/30 scale-[1.02] glow-purple' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Coming Soon Badge */}
      {industry.comingSoon && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          即将上线
        </div>
      )}

      {/* Icon */}
      <div className="text-5xl mb-4">{industry.icon}</div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-2">{industry.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>

      {/* Popular Types */}
      <div className="flex flex-wrap gap-2 mb-4">
        {industry.popularTypes.map((type) => (
          <span
            key={type}
            className="px-2 py-1 bg-secondary/80 rounded text-xs font-mono text-purple-400"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Features */}
      <ul className="space-y-1 text-sm text-muted-foreground mb-6">
        {industry.features.slice(0, 2).map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-purple-500">•</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Action */}
      {industry.comingSoon ? (
        <Button variant="outline" className="w-full opacity-50 cursor-not-allowed" disabled>
          敬请期待
        </Button>
      ) : (
        <Link href={`/industry/${industry.id}`}>
          <Button variant="outline" className="w-full group border-purple-500/30 hover:border-purple-500">
            查看详情
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      )}
    </Card>
  );
}
