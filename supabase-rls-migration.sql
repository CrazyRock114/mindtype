-- ============================================================
-- MindType RLS 安全策略 - 部署时在 Supabase SQL Editor 中执行
-- ============================================================
-- 作用：确保用户只能读写自己的数据，防止数据泄露
-- 执行位置：Supabase 控制台 → SQL Editor
-- ============================================================

-- 第一步：启用所有表的 RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mbti_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkin_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_industry_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- 第二步：创建安全策略（幂等，重复执行不会报错）

-- user_profiles
DROP POLICY IF EXISTS "user_profiles_用户读取自己的数据" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_用户插入自己的数据" ON user_profiles;
DROP POLICY IF EXISTS "user_profiles_用户更新自己的数据" ON user_profiles;
CREATE POLICY "user_profiles_用户读取自己的数据" ON user_profiles
  FOR SELECT USING ((SELECT auth.uid()) = id);
CREATE POLICY "user_profiles_用户插入自己的数据" ON user_profiles
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);
CREATE POLICY "user_profiles_用户更新自己的数据" ON user_profiles
  FOR UPDATE USING ((SELECT auth.uid()) = id) WITH CHECK ((SELECT auth.uid()) = id);

-- mbti_results
DROP POLICY IF EXISTS "mbti_results_用户读取自己的数据" ON mbti_results;
DROP POLICY IF EXISTS "mbti_results_用户插入自己的数据" ON mbti_results;
DROP POLICY IF EXISTS "mbti_results_用户更新自己的数据" ON mbti_results;
CREATE POLICY "mbti_results_用户读取自己的数据" ON mbti_results
  FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "mbti_results_用户插入自己的数据" ON mbti_results
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "mbti_results_用户更新自己的数据" ON mbti_results
  FOR UPDATE USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);

-- point_transactions
DROP POLICY IF EXISTS "point_transactions_用户读取自己的数据" ON point_transactions;
DROP POLICY IF EXISTS "point_transactions_用户插入自己的数据" ON point_transactions;
CREATE POLICY "point_transactions_用户读取自己的数据" ON point_transactions
  FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "point_transactions_用户插入自己的数据" ON point_transactions
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

-- checkin_records
DROP POLICY IF EXISTS "checkin_records_用户读取自己的数据" ON checkin_records;
DROP POLICY IF EXISTS "checkin_records_用户插入自己的数据" ON checkin_records;
CREATE POLICY "checkin_records_用户读取自己的数据" ON checkin_records
  FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "checkin_records_用户插入自己的数据" ON checkin_records
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

-- share_records
DROP POLICY IF EXISTS "share_records_用户读取自己的数据" ON share_records;
DROP POLICY IF EXISTS "share_records_用户插入自己的数据" ON share_records;
CREATE POLICY "share_records_用户读取自己的数据" ON share_records
  FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "share_records_用户插入自己的数据" ON share_records
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

-- user_industry_analyses
DROP POLICY IF EXISTS "user_industry_analyses_用户读取自己的数据" ON user_industry_analyses;
DROP POLICY IF EXISTS "user_industry_analyses_用户插入自己的数据" ON user_industry_analyses;
CREATE POLICY "user_industry_analyses_用户读取自己的数据" ON user_industry_analyses
  FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "user_industry_analyses_用户插入自己的数据" ON user_industry_analyses
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

-- ai_conversations
DROP POLICY IF EXISTS "ai_conversations_用户读取自己的数据" ON ai_conversations;
DROP POLICY IF EXISTS "ai_conversations_用户插入自己的数据" ON ai_conversations;
DROP POLICY IF EXISTS "ai_conversations_用户更新自己的数据" ON ai_conversations;
CREATE POLICY "ai_conversations_用户读取自己的数据" ON ai_conversations
  FOR SELECT USING ((SELECT auth.uid()) = user_id);
CREATE POLICY "ai_conversations_用户插入自己的数据" ON ai_conversations
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);
CREATE POLICY "ai_conversations_用户更新自己的数据" ON ai_conversations
  FOR UPDATE USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);
