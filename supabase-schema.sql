-- MindType Database Schema
-- Run this in Supabase Dashboard -> SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT auth.uid() PRIMARY KEY NOT NULL,
  username TEXT,
  avatar_url TEXT,
  bio TEXT,
  mbti_type TEXT,
  points INTEGER DEFAULT 0 NOT NULL,
  total_tests INTEGER DEFAULT 0 NOT NULL,
  consecutive_checkins INTEGER DEFAULT 0 NOT NULL,
  last_checkin_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see/update their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. MBTI Results Table
CREATE TABLE IF NOT EXISTS mbti_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  mbti_type TEXT NOT NULL,
  dimensions JSONB NOT NULL,
  answers JSONB NOT NULL,
  interpretation TEXT,
  is_shared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE mbti_results ENABLE ROW LEVEL SECURITY;

-- RLS Policy
CREATE POLICY "Users can view own results" ON mbti_results
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own results" ON mbti_results
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own results" ON mbti_results
  FOR UPDATE USING (auth.uid() = user_id);

-- 3. Point Transactions Table
CREATE TABLE IF NOT EXISTS point_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  related_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON point_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON point_transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Check-in Records Table
CREATE TABLE IF NOT EXISTS checkin_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  checkin_date TIMESTAMPTZ DEFAULT NOW(),
  points_earned INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE checkin_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own checkins" ON checkin_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own checkins" ON checkin_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Share Records Table
CREATE TABLE IF NOT EXISTS share_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  share_type TEXT NOT NULL,
  platform TEXT,
  points_earned INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE share_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own shares" ON share_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own shares" ON share_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. User Industry Analyses Table
CREATE TABLE IF NOT EXISTS user_industry_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  mbti_result_id UUID REFERENCES mbti_results(id) ON DELETE SET NULL,
  industry_id TEXT NOT NULL,
  analysis TEXT,
  ai_interpretation TEXT,
  points_cost INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_industry_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses" ON user_industry_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON user_industry_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7. AI Conversations Table
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  mbti_result_id UUID REFERENCES mbti_results(id) ON DELETE SET NULL,
  industry_id TEXT,
  messages JSONB DEFAULT '[]' NOT NULL,
  points_cost INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations" ON ai_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations" ON ai_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON ai_conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Enable anonymous access for public reads (optional)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

print('MindType database schema created successfully!');
