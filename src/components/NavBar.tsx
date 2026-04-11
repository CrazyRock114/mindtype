'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Brain, User, LogOut, Coins, Home, TestTube2, Sparkles, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, isLoading, signOut } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  // Mobile bottom tab items
  const mobileTabs = [
    { href: '/', label: '首页', icon: Home },
    { href: '/test', label: '测试', icon: TestTube2 },
    { href: '/sbti', label: '趣味', icon: Sparkles },
    { href: '/industry', label: '行业', icon: Briefcase },
    { href: user ? '/profile' : '/auth', label: user ? '我的' : '登录', icon: user ? User : User },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Desktop nav links
  const desktopLinks = [
    { href: '/', label: '首页' },
    { href: '/test', label: 'MBTI测试' },
    { href: '/sbti', label: '趣味测试' },
    { href: '/industry', label: '行业专区' },
  ];

  return (
    <>
      {/* ===== Desktop Top Navigation ===== */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">MindType</span>
          </Link>

          <div className="flex items-center gap-8">
            {desktopLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors relative group ${
                  isActive(link.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-purple-500 transition-all duration-300 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}

            <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
              ) : user ? (
                <>
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      <span className="max-w-[80px] truncate">{profile?.username || '我的'}</span>
                      {profile && profile.points > 0 && (
                        <span className="flex items-center gap-0.5 text-xs text-amber-400">
                          <Coins className="w-3 h-3" />
                          {profile.points}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Link href="/auth">
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90">
                    <User className="w-4 h-4 mr-1" />
                    登录
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Mobile Bottom Tab Bar ===== */}
      <div className="mobile-tab-bar md:hidden glass-strong no-select">
        <div className="flex items-center justify-around h-16">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                  active ? 'text-purple-400' : 'text-muted-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-[10px] ${active ? 'font-semibold' : ''}`}>{tab.label}</span>
                {/* Points badge for logged-in users on "我的" tab */}
                {tab.href === '/profile' && profile && profile.points > 0 && (
                  <span className="absolute -mt-8 ml-6 flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-500/20 rounded-full text-[9px] text-amber-400 font-medium">
                    <Coins className="w-2.5 h-2.5" />
                    {profile.points}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
