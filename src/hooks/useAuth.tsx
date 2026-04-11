'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  signUp: (email: string, password: string, username: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// 检查Supabase是否已配置
function getSupabaseUrl(): string {
  // 优先使用Coze平台注入的环境变量
  if (typeof window !== 'undefined') {
    // 客户端：使用NEXT_PUBLIC_前缀
    return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  }
  // 服务端
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

// 延迟初始化的supabase客户端
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    const available = isSupabaseAvailable();
    setConfigured(available);

    if (!available) {
      setIsLoading(false);
      return;
    }

    const client = getSupabaseClient();
    if (!client) {
      setIsLoading(false);
      return;
    }

    // 获取初始session
    client.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        void fetchProfile(client, sess.user.id);
      }
      setIsLoading(false);
    });

    // 监听auth变化
    const { data: { subscription } } = client.auth.onAuthStateChange(
      async (event, sess) => {
        setSession(sess);
        setUser(sess?.user ?? null);
        if (sess?.user) {
          await fetchProfile(client, sess.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (client: SupabaseClient, userId: string) => {
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
        // 创建新用户profile
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
  };

  const refreshProfile = async () => {
    if (user) {
      const client = getSupabaseClient();
      if (client) {
        await fetchProfile(client, user.id);
      }
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
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

  const signIn = async (email: string, password: string) => {
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

  const signOut = async () => {
    const client = getSupabaseClient();
    if (client) {
      await client.auth.signOut();
    }
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('Not logged in') };

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
