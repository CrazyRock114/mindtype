'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Zap, Gift, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/hooks/useAuth';

const rechargePackages = [
  { id: 'basic', coins: 500, price: 6, bonus: 0, icon: Star, popular: false },
  { id: 'standard', coins: 1200, price: 12, bonus: 200, icon: Gift, popular: true },
  { id: 'premium', coins: 2800, price: 28, bonus: 800, icon: Zap, popular: false },
  { id: 'vip', coins: 5800, price: 58, bonus: 2000, icon: Crown, popular: false },
];

export default function RechargePage() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecharge = async () => {
    if (!selectedPackage || !user) return;

    const pkg = rechargePackages.find(p => p.id === selectedPackage);
    if (!pkg) return;

    setIsProcessing(true);

    try {
      // 模拟支付流程（实际项目中应调用支付接口）
      await new Promise(resolve => setTimeout(resolve, 1500));

      const totalCoins = pkg.coins + pkg.bonus;

      // 添加积分记录
      const client = supabase();
      if (client) {
        await client.from('point_transactions').insert({
          user_id: user.id,
          amount: totalCoins,
          type: 'recharge',
          description: `充值${pkg.coins}积分${pkg.bonus > 0 ? `（赠送${pkg.bonus}）` : ''}`,
        });

        // 更新用户积分
        await client
          .from('user_profiles')
          .update({
            points: (profile?.points || 0) + totalCoins,
          })
          .eq('id', user.id);
      }

      await refreshProfile();
      alert(`充值成功！获得${totalCoins}积分`);
      router.push('/profile');
    } catch (error) {
      console.error('Recharge error:', error);
      alert('充值失败，请稍后重试');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/profile">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回个人中心
          </Button>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400">积分充值</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">获取更多积分</h1>
          <p className="text-muted-foreground">
            当前余额：<span className="text-amber-400 font-bold">{profile?.points || 0}</span> 积分
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {rechargePackages.map((pkg) => {
            const Icon = pkg.icon;
            const isSelected = selectedPackage === pkg.id;
            const totalCoins = pkg.coins + pkg.bonus;

            return (
              <Card
                key={pkg.id}
                className={`relative p-6 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-purple-500/10 hover:border-purple-500/30'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-xs font-medium">
                    最受欢迎
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    pkg.popular ? 'bg-gradient-to-br from-purple-500 to-cyan-500' : 'bg-secondary'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold">{pkg.coins} 积分</div>
                    {pkg.bonus > 0 && (
                      <div className="text-xs text-green-400">+{pkg.bonus} 赠送</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-amber-400">¥{pkg.price}</div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500'
                      : 'border-muted-foreground'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Actions */}
        <Button
          onClick={handleRecharge}
          disabled={!selectedPackage || isProcessing}
          className="w-full h-14 bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-lg"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              支付中...
            </span>
          ) : selectedPackage ? (
            `立即支付 ¥${rechargePackages.find(p => p.id === selectedPackage)?.price}`
          ) : (
            '请选择套餐'
          )}
        </Button>

        {/* Notice */}
        <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
          <h4 className="font-medium mb-2">充值说明</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 积分可用于解锁高级AI分析功能</li>
            <li>• 充值成功后积分实时到账</li>
            <li>• 积分不可提现，不可转让</li>
            <li>• 如有退款需求请联系客服</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
