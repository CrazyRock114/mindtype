'use client';

import { useState, useEffect } from 'react';
import { Download, Share2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SBTIType } from '@/types';

interface SBITCertificateProps {
  type: SBTIType;
  onReset: () => void;
}

export function SBITCertificate({ type, onReset }: SBITCertificateProps) {
  const [name, setName] = useState('');
  const [showShare, setShowShare] = useState(false);
  const [certId, setCertId] = useState('');
  const [certDate, setCertDate] = useState('');

  useEffect(() => {
    setCertId(Date.now().toString(36).toUpperCase());
    setCertDate(new Date().toLocaleDateString('zh-CN'));
  }, []);

  const handleDownload = () => {
    // In a real app, this would generate and download an image
    alert('证书生成功能即将上线！');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `我是${type.title}！`,
        text: type.description,
        url: window.location.href
      });
    } else {
      setShowShare(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-amber-900/20 via-purple-900/20 to-pink-900/20 border-2 border-amber-500/30 p-4 md:p-8">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-10 h-10 md:w-16 md:h-16 border-t-4 border-l-4 border-amber-500 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-10 h-10 md:w-16 md:h-16 border-t-4 border-r-4 border-amber-500 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-10 h-10 md:w-16 md:h-16 border-b-4 border-l-4 border-amber-500 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-10 h-10 md:w-16 md:h-16 border-b-4 border-r-4 border-amber-500 rounded-br-lg" />

        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <p className="text-amber-500/80 text-[10px] md:text-sm tracking-widest mb-1 md:mb-2">OFFICIAL SBTI CERTIFICATE</p>
          <h2 className="text-xl md:text-3xl font-serif font-bold text-amber-500">超能脑洞类型指示器</h2>
          <p className="text-amber-500/60 text-[10px] md:text-sm mt-0.5 md:mt-1">Super Brain Type Indicator</p>
        </div>

        {/* Certification Text */}
        <div className="text-center space-y-4 md:space-y-6">
          <p className="text-xs md:text-base text-muted-foreground">This certifies that</p>
          
          <div className="space-y-1 md:space-y-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="在此输入你的名字"
              className="text-center text-lg md:text-2xl font-serif bg-transparent border-amber-500/30 focus:border-amber-500"
              maxLength={20}
            />
          </div>

          <p className="text-xs md:text-base text-muted-foreground">has been officially diagnosed as</p>

          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 p-[2px] rounded-lg">
            <div className="bg-background rounded-lg p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold gradient-text mb-1 md:mb-2">{type.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">SBTI Type: {type.type}</p>
            </div>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground italic max-w-md mx-auto">
            &ldquo;{type.description}&rdquo;
          </p>

          {/* Traits */}
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
            {type.traits.map((trait) => (
              <span
                key={trait}
                className="px-2 py-0.5 md:px-3 md:py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs md:text-sm"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-4 md:mt-8 text-[10px] md:text-xs text-muted-foreground">
          <div>
            <p>Certificate ID: SBTI-{certId}</p>
            <p>Date: {certDate}</p>
          </div>
          <div className="text-right">
            <p>官方认证</p>
            <p>SBTI Committee</p>
          </div>
        </div>

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
          <span className="text-6xl md:text-9xl font-bold transform -rotate-45">SBTI</span>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={handleDownload}
          className="flex-1 border-amber-500/30 hover:border-amber-500"
        >
          <Download className="w-4 h-4 mr-2" />
          下载证书
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          className="flex-1 border-amber-500/30 hover:border-amber-500"
        >
          <Share2 className="w-4 h-4 mr-2" />
          分享结果
        </Button>
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-muted-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          再测一次
        </Button>
      </div>

      {/* Share Modal */}
      {showShare && (
        <Card className="p-4 bg-card/95 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground mb-3">复制以下内容分享：</p>
          <code className="block p-3 bg-secondary rounded text-sm break-all">
            我是{type.title}！{type.description} 快来测试你的SBTI：{window.location.href}
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => {
              navigator.clipboard.writeText(`我是${type.title}！${type.description} 快来测试你的SBTI：${window.location.href}`);
              setShowShare(false);
            }}
          >
            复制
          </Button>
        </Card>
      )}

      {/* CTA */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-muted-foreground mb-4">
          想要了解真实的自己？
        </p>
        <a
          href="/test"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          测试真正的MBTI
          <span className="text-xl">→</span>
        </a>
      </div>
    </div>
  );
}
