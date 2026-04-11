'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp, isUsingLocalStorage } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  // 前端表单校验
  const validateForm = (): string | null => {
    if (!formData.email.trim()) {
      return '请输入邮箱地址';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return '邮箱格式不正确，请检查后重试';
    }
    if (!formData.password) {
      return '请输入密码';
    }
    if (formData.password.length < 6) {
      return '密码长度不能少于6位';
    }
    if (!isLogin && !formData.username.trim()) {
      return '请输入用户名';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // 前端校验
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('登录成功，正在跳转...');
          setTimeout(() => router.push('/'), 500);
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.username);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('注册成功，正在跳转...');
          setTimeout(() => router.push('/'), 500);
        }
      }
    } catch {
      setError('操作失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 切换登录/注册时清除状态
  const handleTabSwitch = (login: boolean) => {
    setIsLogin(login);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center px-4 md:px-6 py-8 md:py-12">
      <div className="w-full max-w-md">
        {/* Header - hidden on mobile */}
        <div className="hidden md:block">
          <Link href="/">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>

        <Card className="p-5 md:p-8 bg-card/80 backdrop-blur-sm border-purple-500/20">
          <div className="text-center mb-5 md:mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-1.5 md:mb-2">
              {isLogin ? '欢迎回来' : '创建账户'}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {isLogin ? '登录以继续使用完整功能' : '注册并获得100积分奖励'}
            </p>
          </div>

          {/* Tab Switch */}
          {isUsingLocalStorage && (
            <div className="mb-4 md:mb-6 p-2.5 md:p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs md:text-sm text-amber-400">
              当前为演示模式（数据保存在本地浏览器），注册/登录功能可正常使用。
            </div>
          )}
          <div className="flex mb-5 md:mb-8 bg-secondary rounded-lg p-1">
            <button
              onClick={() => handleTabSwitch(true)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                isLogin ? 'bg-purple-500 text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => handleTabSwitch(false)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                !isLogin ? 'bg-purple-500 text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              注册
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-xs md:text-sm text-red-400 flex items-start gap-2 md:gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-xs md:text-sm text-green-400 flex items-start gap-2 md:gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            {!isLogin && (
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-xs md:text-sm font-medium">用户名</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="输入用户名"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-10 h-10 md:h-auto"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-xs md:text-sm font-medium">邮箱</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (error) setError(null); }}
                  className="pl-10 h-10 md:h-auto"
                />
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-xs md:text-sm font-medium">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => { setFormData({ ...formData, password: e.target.value }); if (error) setError(null); }}
                  className="pl-10 pr-10 h-10 md:h-auto"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground touch-target"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
                </button>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground">密码至少6位</p>
            </div>

            {isLogin && (
              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-xs md:text-sm text-purple-400 hover:underline">
                  忘记密码？
                </Link>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 md:h-auto bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 text-sm md:text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  处理中...
                </span>
              ) : (isLogin ? '登录' : '注册')}
            </Button>
          </form>

          {!isLogin && (
            <p className="mt-4 md:mt-6 text-center text-[10px] md:text-sm text-muted-foreground">
              注册即表示同意我们的{' '}
              <Link href="/terms" className="text-purple-400 hover:underline">
                服务条款
              </Link>{' '}
              和{' '}
              <Link href="/privacy" className="text-purple-400 hover:underline">
                隐私政策
              </Link>
            </p>
          )}
        </Card>

        {/* Benefits */}
        {!isLogin && (
          <div className="mt-4 md:mt-8 grid grid-cols-3 gap-2 md:gap-4 text-center">
            <div className="p-3 md:p-4 bg-secondary/50 rounded-lg">
              <div className="text-lg md:text-2xl mb-0.5 md:mb-1">100</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">注册积分</div>
            </div>
            <div className="p-3 md:p-4 bg-secondary/50 rounded-lg">
              <div className="text-lg md:text-2xl mb-0.5 md:mb-1">5</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">每日签到积分</div>
            </div>
            <div className="p-3 md:p-4 bg-secondary/50 rounded-lg">
              <div className="text-lg md:text-2xl mb-0.5 md:mb-1">10</div>
              <div className="text-[10px] md:text-xs text-muted-foreground">分享积分</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
