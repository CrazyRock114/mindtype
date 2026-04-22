'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { createClient, User, Session, SupabaseClient } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  username: string | null;
  avatarUrl: string | null;
  bio: string | null;
  mbtiType: string | null;
  points: number;
  totalTests: number;
  consecutiveCheckins: number;
  lastCheckinDate: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isSupabaseConfigured: boolean;
  isUsingLocalStorage: boolean; // 是否使用本地存储模式
  signUp: (email: string, password: string, username: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ============ Supabase 配置检测 ============

function getSupabaseUrl(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  }
  return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

function getSupabaseAnonKey(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  }
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

function isSupabaseAvailable(): boolean {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  return !!(url && key && url !== 'https://your-project.supabase.co' && key !== 'your-anon-key');
}

// ============ 延迟初始化的 Supabase 客户端 ============

let _supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (_supabaseClient) return _supabaseClient;
  if (!isSupabaseAvailable()) return null;

  try {
    _supabaseClient = createClient(getSupabaseUrl(), getSupabaseAnonKey());
    return _supabaseClient;
  } catch {
    return null;
  }
}

// ============ LocalStorage 模式（Fallback） ============
// 当 Supabase 未配置时，使用 localStorage 模拟用户系统

const LS_KEYS = {
  USER: 'mindtype_local_user',
  PROFILE: 'mindtype_local_profile',
  PASSWORD_HASH: 'mindtype_local_pwhash',
};

/**
 * 使用 Web Crypto API 对密码进行 SHA-256 哈希
 * 注意：仅用于本地演示模式，不构成生产级安全
 */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface LocalUser {
  id: string;
  email: string;
  username: string | null;
  created_at: string;
}

function getLocalUser(): LocalUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(LS_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function getLocalProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(LS_KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveLocalUser(user: LocalUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEYS.USER, JSON.stringify(user));
}

function saveLocalProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEYS.PROFILE, JSON.stringify(profile));
}

function clearLocalAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LS_KEYS.USER);
  localStorage.removeItem(LS_KEYS.PROFILE);
  localStorage.removeItem(LS_KEYS.PASSWORD_HASH);
}

// ============ AuthProvider ============

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [usingLocalStorage, setUsingLocalStorage] = useState(false);

  // 从数据库获取用户资料（在 useEffect 之前声明，避免引用问题）
  const fetchProfileFromDB = useCallback(async (client: SupabaseClient, userId: string) => {
    try {
      const { data, error } = await client
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          id: data.id,
          username: data.username,
          avatarUrl: data.avatar_url,
          bio: data.bio,
          mbtiType: data.mbti_type,
          points: data.points || 0,
          totalTests: data.total_tests || 0,
          consecutiveCheckins: data.consecutive_checkins || 0,
          lastCheckinDate: data.last_checkin_date,
        });
      } else {
        const { data: newProfile, error: createError } = await client
          .from('user_profiles')
          .insert({
            id: userId,
            username: null,
            points: 100,
            total_tests: 0,
            consecutive_checkins: 0,
          })
          .select()
          .single();

        if (!createError && newProfile) {
          setProfile({
            id: newProfile.id,
            username: null,
            avatarUrl: null,
            bio: null,
            mbtiType: null,
            points: 100,
            totalTests: 0,
            consecutiveCheckins: 0,
            lastCheckinDate: null,
          });
        }
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  }, []);

  useEffect(() => {
    const available = isSupabaseAvailable();
    setConfigured(available);

    if (!available) {
      // 使用 LocalStorage 模式
      setUsingLocalStorage(true);
      const localUser = getLocalUser();
      const localProfile = getLocalProfile();
      if (localUser && localProfile) {
        // 将本地用户转换为兼容格式
        setUser({
          id: localUser.id,
          email: localUser.email,
          aud: 'authenticated',
          role: 'authenticated',
          app_metadata: {},
          user_metadata: { username: localUser.username },
        } as unknown as User);
        setProfile(localProfile);
      }
      setIsLoading(false);
      return;
    }

    // Supabase 模式
    const client = getSupabaseClient();
    if (!client) {
      setIsLoading(false);
      return;
    }

    client.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        void fetchProfileFromDB(client, sess.user.id);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = client.auth.onAuthStateChange(
      async (event, sess) => {
        setSession(sess);
        setUser(sess?.user ?? null);
        if (sess?.user) {
          await fetchProfileFromDB(client, sess.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfileFromDB]);

  const refreshProfile = useCallback(async () => {
    if (usingLocalStorage) {
      const p = getLocalProfile();
      if (p) setProfile(p);
      return;
    }

    if (user) {
      const client = getSupabaseClient();
      if (client) {
        await fetchProfileFromDB(client, user.id);
      }
    }
  }, [user, usingLocalStorage, fetchProfileFromDB]);

  // ============ 翻译 Supabase 错误消息 ============
  const translateErrorMessage = (err: Error | null): Error | null => {
    if (!err) return null;
    const msg = err.message || '';
    const lowerMsg = msg.toLowerCase();

    const errorMap: Record<string, string> = {
      'invalid login credentials': '邮箱或密码错误，请检查后重试',
      'invalid credentials': '邮箱或密码错误，请检查后重试',
      'email not confirmed': '邮箱尚未验证，请查收验证邮件后重试',
      'user already registered': '该邮箱已被注册，请直接登录',
      'password should be at least': '密码长度不能少于6位',
      'unable to validate email address': '邮箱格式不正确，请检查后重试',
      'signup is disabled': '注册功能暂未开放',
      'email rate limit exceeded': '请求过于频繁，请稍后再试',
      'request timeout': '请求超时，请检查网络后重试',
      'network requestfailed': '网络连接失败，请检查网络后重试',
      'too many requests': '请求过于频繁，请稍后再试',
      'user not found': '该账号不存在，请检查邮箱或先注册',
      'session not found': '会话已过期，请重新登录',
    };

    for (const [key, value] of Object.entries(errorMap)) {
      if (lowerMsg.includes(key)) {
        return new Error(value);
      }
    }

    // 如果没有匹配到已知的错误类型，返回通用中文提示
    return new Error(msg || '操作失败，请稍后重试');
  };

  // ============ 注册 ============
  const signUp = async (email: string, password: string, username: string) => {
    if (usingLocalStorage) {
      // LocalStorage 模式的注册
      try {
        // 检查是否已存在该邮箱的用户
        const existingUser = getLocalUser();
        if (existingUser && existingUser.email === email) {
          return { error: new Error('该邮箱已被注册，请直接登录') };
        }

        const id = `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        const now = new Date().toISOString();

        const newUser: LocalUser = { id, email, username, created_at: now };
        const newProfile: UserProfile = {
          id,
          username,
          avatarUrl: null,
          bio: null,
          mbtiType: null,
          points: 100,
          totalTests: 0,
          consecutiveCheckins: 0,
          lastCheckinDate: null,
        };

        // 保存密码哈希（不再明文存储）
        if (typeof window !== 'undefined') {
          const passwordHash = await hashPassword(password);
          localStorage.setItem(LS_KEYS.PASSWORD_HASH, passwordHash);
        }

        saveLocalUser(newUser);
        saveLocalProfile(newProfile);

        setUser({
          id,
          email,
          aud: 'authenticated',
          role: 'authenticated',
          app_metadata: {},
          user_metadata: { username },
        } as unknown as User);
        setProfile(newProfile);

        return { error: null };
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
    }

    const client = getSupabaseClient();
    if (!client) {
      return { error: new Error('用户系统未配置，请联系管理员') };
    }

    try {
      const { error } = await client.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });
      return { error: translateErrorMessage(error) };
    } catch (error) {
      return { error: translateErrorMessage(error as Error) };
    }
  };

  // ============ 登录 ============
  const signIn = async (email: string, password: string) => {
    if (usingLocalStorage) {
      // LocalStorage 模式的登录：验证邮箱和密码
      try {
        const existingUser = getLocalUser();
        if (!existingUser || existingUser.email !== email) {
          return { error: new Error('该账号不存在，请检查邮箱或先注册') };
        }

        // 验证密码
        if (typeof window !== 'undefined') {
          const savedHash = localStorage.getItem(LS_KEYS.PASSWORD_HASH);
          if (savedHash !== null) {
            const inputHash = await hashPassword(password);
            if (inputHash !== savedHash) {
              return { error: new Error('密码错误，请检查后重试') };
            }
          }
        }

        const existingProfile = getLocalProfile();
        if (existingProfile) {
          setUser({
            id: existingUser.id,
            email: existingUser.email,
            aud: 'authenticated',
            role: 'authenticated',
            app_metadata: {},
            user_metadata: { username: existingUser.username },
          } as unknown as User);
          setProfile(existingProfile);
          return { error: null };
        }
        return { error: new Error('登录失败，请稍后重试') };
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
    }

    const client = getSupabaseClient();
    if (!client) {
      return { error: new Error('用户系统未配置，请联系管理员') };
    }

    try {
      const { error } = await client.auth.signInWithPassword({ email, password });
      return { error: translateErrorMessage(error) };
    } catch (error) {
      return { error: translateErrorMessage(error as Error) };
    }
  };

  // ============ 登出 ============
  const signOut = async () => {
    if (usingLocalStorage) {
      clearLocalAuth();
      setUser(null);
      setProfile(null);
      return;
    }

    const client = getSupabaseClient();
    if (client) {
      await client.auth.signOut();
    }
    setProfile(null);
  };

  // ============ 更新资料 ============
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('请先登录') };

    if (usingLocalStorage) {
      try {
        const current = getLocalProfile();
        if (current) {
          const updated = { ...current, ...updates };
          saveLocalProfile(updated);
          setProfile(updated);
        }
        return { error: null };
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
    }

    const client = getSupabaseClient();
    if (!client) {
      return { error: new Error('用户系统未配置') };
    }

    try {
      const dbUpdates: Record<string, unknown> = {};
      if (updates.username !== undefined) dbUpdates.username = updates.username;
      if (updates.avatarUrl !== undefined) dbUpdates.avatar_url = updates.avatarUrl;
      if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
      if (updates.mbtiType !== undefined) dbUpdates.mbti_type = updates.mbtiType;

      const { error } = await client
        .from('user_profiles')
        .update({ ...dbUpdates, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (!error) {
        await refreshProfile();
      }

      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isSupabaseConfigured: configured,
        isUsingLocalStorage: usingLocalStorage,
        signUp,
        signIn,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 获取Supabase客户端（供其他组件使用）
export function supabase(): SupabaseClient | null {
  return getSupabaseClient();
}
