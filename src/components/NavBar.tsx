'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Brain, User, LogOut, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, isLoading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/test', label: 'MBTI测试' },
    { href: '/sbti', label: '趣味测试' },
    { href: '/industry', label: '行业专区' },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block">MindType</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}

          {/* Auth Section */}
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong mt-2 mx-4 rounded-xl p-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-border pt-4">
              {isLoading ? null : user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    {profile?.username || '个人中心'}
                    {profile && profile.points > 0 && (
                      <span className="flex items-center gap-0.5 text-xs text-amber-400 ml-auto">
                        <Coins className="w-3 h-3" />
                        {profile.points}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-base text-muted-foreground hover:text-foreground transition-colors py-2 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    退出登录
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center gap-2 text-base text-purple-400 hover:text-purple-300 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  登录 / 注册
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
