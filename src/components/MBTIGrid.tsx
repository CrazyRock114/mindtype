'use client';

import { mbtiTypes } from '@/lib/mbti-data';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export function MBTIGrid() {
  const types = Object.values(mbtiTypes);
  const rows = [
    ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
    ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
    ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
    ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {rows.map((row, rowIndex) => (
        row.map((type) => {
          const info = mbtiTypes[type];
          return (
            <Link key={type} href={`/test/result?type=${type}`}>
              <Card
                className="group p-3 md:p-4 bg-card/40 hover:bg-card/80 border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="text-center">
                  <div className="flex justify-center gap-0.5 mb-1">
                    {type.split('').map((letter, i) => (
                      <span
                        key={i}
                        className={`text-lg md:text-xl font-bold ${
                          i === 0 ? 'type-E' :
                          i === 1 ? 'type-I' :
                          i === 2 ? 'type-T' : 'type-P'
                        }`}
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {info.name}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })
      ))}
    </div>
  );
}
