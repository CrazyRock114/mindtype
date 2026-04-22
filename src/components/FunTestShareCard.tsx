'use client';

import { forwardRef } from 'react';
import { Sparkles, Brain } from 'lucide-react';
import type { FunTest, FunResult, CalculationResult } from '@/lib/fun-tests';

interface FunTestShareCardProps {
  test: FunTest;
  result: FunResult;
  calcResult: CalculationResult;
  secondaryResult?: FunResult | null;
}

const rarityLabels: Record<string, string> = {
  SSR: '传说级',
  SR: '史诗级',
  R: '稀有级',
  N: '普通级',
};

/**
 * 375 x 667 px = 9:16 竖版分享卡片
 * 核心设计：每个结果有一个"视觉形象" —— emoji 组合构成的有趣画面
 */
export const FunTestShareCard = forwardRef<HTMLDivElement, FunTestShareCardProps>(
  ({ test, result, calcResult, secondaryResult }, ref) => {
    const rarityLabel = rarityLabels[result.rarity || 'N'] || '普通级';

    const sortedScores = Object.entries(calcResult.allScores).sort((a, b) => b[1] - a[1]);
    const rank = sortedScores.findIndex(([id]) => id === result.id) + 1;
    const totalResults = sortedScores.length;
    const beatPercent = (100 - ((rank - 1) / totalResults) * 100).toFixed(0);

    // Persona scene: use configured scene or fallback to single emoji
    const scene = result.personaScene;
    const mainEmoji = scene?.main || result.emoji;
    const companions = scene?.companions || [];
    const layout = scene?.layout || 'orbit';

    // Companion positions based on layout
    const getCompanionStyle = (index: number, total: number): React.CSSProperties => {
      if (layout === 'stack') {
        return {
          position: 'absolute' as const,
          bottom: `${-8 - index * 18}px`,
          right: `${-10 + index * 8}px`,
          fontSize: `${28 - index * 4}px`,
          opacity: 0.85 - index * 0.15,
          transform: `rotate(${-10 + index * 8}deg)`,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          zIndex: 10 - index,
        };
      }
      if (layout === 'row') {
        const spacing = 50;
        const startX = -((total - 1) * spacing) / 2;
        return {
          position: 'absolute' as const,
          bottom: '-28px',
          left: '50%',
          marginLeft: `${startX + index * spacing - 16}px`,
          fontSize: '28px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          zIndex: 10,
        };
      }
      if (layout === 'scatter') {
        const positions = [
          { top: '-20px', right: '-20px', deg: 15 },
          { bottom: '-10px', left: '-15px', deg: -12 },
          { top: '10px', left: '-25px', deg: 8 },
          { bottom: '20px', right: '-25px', deg: -20 },
        ];
        const pos = positions[index % positions.length];
        return {
          position: 'absolute' as const,
          top: pos.top,
          right: pos.right,
          bottom: pos.bottom,
          left: pos.left,
          fontSize: `${24 + (index % 2) * 8}px`,
          transform: `rotate(${pos.deg}deg)`,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          opacity: 0.9,
          zIndex: 10,
        };
      }
      // orbit (default)
      const angle = (index / Math.max(total, 1)) * 360 - 90;
      const radius = 52;
      const rad = (angle * Math.PI) / 180;
      return {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        marginTop: `${Math.sin(rad) * radius - 14}px`,
        marginLeft: `${Math.cos(rad) * radius - 14}px`,
        fontSize: '26px',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
        zIndex: 10,
      };
    };

    return (
      <div
        ref={ref}
        className="relative w-[375px] h-[667px] flex-shrink-0 overflow-hidden rounded-none select-none"
        style={{ fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif" }}
      >
        {/* ===== Background Layers ===== */}
        <div className={`absolute inset-0 bg-gradient-to-br ${result.bgGradient} opacity-95`} />

        {/* Animated radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 25%, rgba(255,255,255,0.15) 0%, transparent 55%)',
          }}
        />

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '18px 18px',
          }}
        />

        {/* Floating blobs */}
        <div className="absolute top-6 right-4 w-28 h-28 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-36 left-2 w-36 h-36 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 right-0 w-20 h-40 bg-white/3 blur-2xl rotate-12" />

        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/10 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/10 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/10 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/10 rounded-br-lg" />

        {/* Floating stars */}
        {[
          { t: 8, l: 15, s: 10, r: 0 },
          { t: 15, l: 85, s: 14, r: 15 },
          { t: 35, l: 8, s: 8, r: -10 },
          { t: 55, l: 90, s: 12, r: 25 },
          { t: 72, l: 12, s: 9, r: -5 },
          { t: 85, l: 80, s: 11, r: 10 },
          { t: 45, l: 5, s: 7, r: 30 },
          { t: 25, l: 92, s: 10, r: -20 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute text-white/15"
            style={{
              top: `${star.t}%`,
              left: `${star.l}%`,
              fontSize: `${star.s}px`,
              transform: `rotate(${star.r}deg)`,
            }}
          >
            ✦
          </div>
        ))}

        {/* ===== Content ===== */}
        <div className="relative z-10 h-full flex flex-col px-7 pt-7 pb-6">
          {/* Top test badge */}
          <div className="flex items-center justify-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-3 h-3 text-white/70" />
              <span className="text-[11px] text-white/80 font-medium tracking-wide">{test.title}</span>
            </div>
          </div>

          {/* Rarity + rank badge */}
          <div className="flex items-center justify-center mb-4">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${
                result.rarity === 'SSR'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : result.rarity === 'SR'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  : result.rarity === 'R'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  : 'bg-white/10 text-white/60 border-white/10'
              }`}
            >
              <span>{result.rarity || 'N'}</span>
              <span className="w-px h-2.5 bg-white/20" />
              <span>{rarityLabel}</span>
              <span className="w-px h-2.5 bg-white/20" />
              <span className="text-white/40 font-normal">击败{beatPercent}%的人</span>
            </div>
          </div>

          {/* ===== VISUAL PERSONA SCENE ===== */}
          <div className="flex justify-center mb-4">
            <div className="relative" style={{ width: '120px', height: '120px' }}>
              {/* Glow behind */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-white/8 blur-2xl" />
              </div>

              {/* Ring decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[110px] h-[110px] rounded-full border border-white/8" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90px] h-[90px] rounded-full border border-white/5" />
              </div>

              {/* Main emoji */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-6xl block"
                  style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}
                >
                  {mainEmoji}
                </span>
              </div>

              {/* Companion emojis */}
              {companions.map((emoji, i) => (
                <span key={i} style={getCompanionStyle(i, companions.length)}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Result title */}
          <div className="text-center mb-1">
            <h2 className="text-[26px] font-black text-white leading-tight tracking-tight drop-shadow-lg">
              {result.title}
            </h2>
          </div>

          {/* Subtitle */}
          <div className="text-center mb-4">
            <p className="text-[12px] text-white/55 font-medium tracking-wider">{result.subtitle}</p>
          </div>

          {/* Meme Quote — KEY VIRAL ELEMENT */}
          <div className="relative mb-4">
            <div className="absolute -top-1.5 left-3 text-3xl text-white/10 font-serif leading-none">"</div>
            <div className="relative px-4 py-3.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10">
              <p className="text-[14px] text-white/90 leading-relaxed text-center font-medium">
                {result.memeQuote}
              </p>
            </div>
            <div className="absolute -bottom-1.5 right-3 text-3xl text-white/10 font-serif leading-none rotate-180">"</div>
          </div>

          {/* Traits */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {result.traits.slice(0, 3).map((trait, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/10 text-white/80 border border-white/10"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* MBTI Hint */}
          {result.mbtiHint && (
            <div className="flex items-center justify-center gap-1.5 mb-3">
              <Brain className="w-3 h-3 text-white/35" />
              <span className="text-[10px] text-white/45">
                正经MBTI推测：
                <span className="text-white/70 font-semibold">{result.mbtiHint}</span>
              </span>
            </div>
          )}

          {/* Secondary result */}
          {secondaryResult && secondaryResult.id !== result.id && (
            <div className="text-center mb-2">
              <p className="text-[9px] text-white/25 mb-1 tracking-wider">隐藏人格</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                <span className="text-base">{secondaryResult.emoji}</span>
                <span className="text-[10px] text-white/45">{secondaryResult.title}</span>
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1 min-h-[20px]" />

          {/* Bottom CTA / Brand */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-3">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-[11px] text-white/80 font-medium">扫码测测你的{test.title}</span>
            </div>

            <div className="flex items-center justify-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
              <span className="text-[9px] text-white/25 tracking-wider">MindType · AI性格测试</span>
            </div>
          </div>
        </div>

        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }}
        />
      </div>
    );
  }
);

FunTestShareCard.displayName = 'FunTestShareCard';
