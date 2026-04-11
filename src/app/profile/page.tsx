'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Coins,
  Calendar,
  TestTube2,
  ChevronRight,
  LogOut,
  Share2,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/hooks/useAuth';

interface TestRecord {
  id: string;
  mbti_type: string;
  created_at: string;
}

interface PointRecord {
  id: string;
  amount: number;
  description: string;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, isLoading, signOut, refreshProfile } = useAuth();
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [canCheckin, setCanCheckin] = useState(false);
  const [recentTests, setRecentTests] = useState<TestRecord[]>([]);
  const [pointHistory, setPointHistory] = useState<PointRecord[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (profile) {
      // 检查是否可以签到
      if (profile.lastCheckinDate) {
        const lastCheckin = new Date(profile.lastCheckinDate);
        const today = new Date();
        const isSameDay = lastCheckin.toDateString() === today.toDateString();
        setCanCheckin(!isSameDay);
      } else {
        setCanCheckin(true);
      }

      // 获取最近的测试
      void fetchRecentTests();
      // 获取积分历史
      void fetchPointHistory();
    }
  }, [profile]);

  const fetchRecentTests = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('mbti_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) {
      setRecentTests(data);
    }
  };

  const fetchPointHistory = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('point_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setPointHistory(data);
    }
  };

  const handleCheckin = async () => {
    if (!user || !canCheckin) return;
    setCheckinLoading(true);

    try {
      const pointsEarned = 5 + Math.min(profile?.consecutiveCheckins || 0, 5); // 连续签到加成

      // 添加签到记录
      await supabase.from('checkin_records').insert({
        user_id: user.id,
        points_earned: pointsEarned,
      });

      // 添加积分记录
      await supabase.from('point_transactions').insert({
        user_id: user.id,
        amount: pointsEarned,
        type: 'checkin',
        description: `每日签到${profile?.consecutiveCheckins ? `（连续${profile.consecutiveCheckins + 1}天）` : ''}`,
      });

      // 更新用户积分和连续签到
      await supabase
        .from('user_profiles')
        .update({
          points: (profile?.points || 0) + pointsEarned,
          consecutive_checkins: (profile?.consecutiveCheckins || 0) + 1,
          last_checkin_date: new Date().toISOString(),
        })
        .eq('id', user.id);

      await refreshProfile();
      await fetchPointHistory();
      setCanCheckin(false);
    } catch (error) {
      console.error('Checkin error:', error);
    } finally {
      setCheckinLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/test/result?type=${profile?.mbtiType || 'INTJ'}`;
    const shareText = `我的MBTI人格类型是${profile?.mbtiType || '未知'}，快来测试你的！`;

    if (navigator.share) {
      await navigator.share({
        title: '分享我的MBTI测试结果',
        text: shareText,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert('链接已复制到剪贴板！');
    }

    // 记录分享
    if (user) {
      await supabase.from('share_records').insert({
        user_id: user.id,
        share_type: 'test_result',
        platform: 'link',
        points_earned: 10,
      });

      await supabase.from('point_transactions').insert({
        user_id: user.id,
        amount: 10,
        type: 'share',
        description: '分享测试结果',
      });

      await supabase
        .from('user_profiles')
        .update({
          points: (profile?.points || 0) + 10,
        })
        .eq('id', user.id);

      await refreshProfile();
      await fetchPointHistory();
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">个人中心</h1>
          <Button variant="ghost" onClick={handleSignOut} className="text-muted-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            退出登录
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-purple-500/20 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-3xl font-bold">
              {profile?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{profile?.username || '新用户'}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              {profile?.mbtiType && (
                <Link href={`/test/result?type=${profile.mbtiType}`}>
                  <Badge className="mt-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 cursor-pointer">
                    {profile.mbtiType}
                  </Badge>
                </Link>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-2xl font-bold text-amber-400">
                <Coins className="w-6 h-6" />
                {profile?.points || 0}
              </div>
              <p className="text-xs text-muted-foreground">可用积分</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Button
            onClick={handleCheckin}
            disabled={!canCheckin || checkinLoading}
            className={`h-auto py-4 flex-col gap-2 ${canCheckin ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-secondary'}`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-sm">{canCheckin ? '每日签到' : '已签到'}</span>
            {canCheckin && <span className="text-xs opacity-80">+5~10积分</span>}
          </Button>

          <Button
            onClick={handleShare}
            className="h-auto py-4 flex-col gap-2 bg-gradient-to-br from-blue-500 to-cyan-500"
          >
            <Share2 className="w-6 h-6" />
            <span className="text-sm">分享</span>
            <span className="text-xs opacity-80">+10积分</span>
          </Button>

          <Link href="/profile/recharge" className="block">
            <Button className="h-auto py-4 flex-col gap-2 w-full bg-gradient-to-br from-amber-500 to-orange-500">
              <Zap className="w-6 h-6" />
              <span className="text-sm">充值</span>
              <span className="text-xs opacity-80">获取更多积分</span>
            </Button>
          </Link>

          <Link href="/profile/history" className="block">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 w-full">
              <ChevronRight className="w-6 h-6" />
              <span className="text-sm">积分明细</span>
              <span className="text-xs opacity-80">查看记录</span>
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center bg-card/60">
            <div className="text-2xl font-bold text-purple-400">{profile?.totalTests || 0}</div>
            <div className="text-xs text-muted-foreground">测试次数</div>
          </Card>
          <Card className="p-4 text-center bg-card/60">
            <div className="text-2xl font-bold text-green-400">{profile?.consecutiveCheckins || 0}</div>
            <div className="text-xs text-muted-foreground">连续签到</div>
          </Card>
          <Card className="p-4 text-center bg-card/60">
            <div className="text-2xl font-bold text-amber-400">{profile?.points || 0}</div>
            <div className="text-xs text-muted-foreground">总积分</div>
          </Card>
        </div>

        {/* Recent Tests */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-purple-500/20 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <TestTube2 className="w-5 h-5 text-purple-400" />
              我的测试
            </h3>
            <Link href="/test">
              <Button variant="ghost" size="sm">
                新测试
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {recentTests.length === 0 ? (
            <div className="text-center py-8">
              <TestTube2 className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">还没有测试记录</p>
              <Link href="/test">
                <Button className="mt-4 bg-gradient-to-r from-purple-500 to-cyan-500">
                  开始测试
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTests.map((test) => (
                <Link
                  key={test.id}
                  href={`/test/result?type=${test.mbti_type}`}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold gradient-text">{test.mbti_type}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(test.created_at).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </Card>

        {/* Point History */}
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-purple-500/20">
          <h3 className="font-bold flex items-center gap-2 mb-4">
            <Coins className="w-5 h-5 text-amber-400" />
            积分明细
          </h3>

          {pointHistory.length === 0 ? (
            <div className="text-center py-8">
              <Coins className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">还没有积分记录</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {pointHistory.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                >
                  <div>
                    <p className="text-sm">{record.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(record.created_at).toLocaleString('zh-CN')}
                    </p>
                  </div>
                  <span className={`font-bold ${record.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {record.amount > 0 ? '+' : ''}{record.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
