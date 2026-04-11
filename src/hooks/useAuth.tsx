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
  return process.env.COZE_SUPABASE_URL
    || process.env.NEXT_PUBLIC_SUPABASE_URL
    || '';
}

function getSupabaseAnonKey(): string {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  }
  return process.env.COZE_SUPABASE_ANON_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    || '';
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
};

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
}

// ============ AuthProvider ============

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [usingLocalStorage, setUsingLocalStorage] = useState(false);

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
  }, []);

  // 从数据库获取用户资料
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

  // ============ 注册 ============
  const signUp = async (email: string, password: string, username: string) => {
    if (usingLocalStorage) {
      // LocalStorage 模式的注册
      try {
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
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // ============ 登录 ============
  const signIn = async (email: string, password: string) => {
    if (usingLocalStorage) {
      // LocalStorage 模式的登录：查找已注册的用户
      try {
        const existingUser = getLocalUser();
        if (existingUser && existingUser.email === email) {
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
        }
        // 如果用户不存在，自动注册
        return signUp(email, password, email.split('@')[0]);
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
      return { error };
    } catch (error) {
      return { error: error as Error };
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
