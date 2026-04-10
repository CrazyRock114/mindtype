'use client';

import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIResponseProps {
  content: string;
  isLoading?: boolean;
  onRetry?: () => void;
}

export function AIResponse({ content, isLoading, onRetry }: AIResponseProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!content) return;

    setDisplayedContent('');
    setIsComplete(false);

    let index = 0;
    const timer = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent(content.substring(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [content]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading && !displayedContent) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <span className="text-sm text-muted-foreground">AI 性格解读</span>
        </div>
        {isComplete && (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8">
              {copied ? (
                <Check className="w-4 h-4 mr-1 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-1" />
              )}
              {copied ? '已复制' : '复制'}
            </Button>
            {onRetry && (
              <Button variant="ghost" size="sm" onClick={onRetry} className="h-8">
                重新生成
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-secondary/50 rounded-xl p-6 border border-border">
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-wrap leading-relaxed">
            {displayedContent}
            {!isComplete && (
              <span className="inline-block w-2 h-5 bg-purple-500 ml-1 animate-typing-cursor" />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
