import { pgTable, serial, timestamp, uuid, text, integer, boolean, jsonb } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

// 健康检查表
export const healthCheck = pgTable("health_check", {
  id: serial().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

// 用户档案表（扩展Supabase Auth）
export const userProfiles = pgTable("user_profiles", {
  id: uuid("id").primaryKey().default(sql`auth.uid()`),
  username: text("username"),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  mbtiType: text("mbti_type"),
  points: integer("points").default(0).notNull(),
  totalTests: integer("total_tests").default(0).notNull(),
  consecutiveCheckins: integer("consecutive_checkins").default(0).notNull(),
  lastCheckinDate: timestamp("last_checkin_date", { withTimezone: true, mode: 'string' }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
  // 索引
  sql`CREATE INDEX IF NOT EXISTS idx_user_profiles_mbti ON ${table} (${table}.mbti_type)`,
  sql`CREATE INDEX IF NOT EXISTS idx_user_profiles_points ON ${table} (${table}.points DESC)`,
]);

// MBTI测试结果表
export const mbtiResults = pgTable("mbti_results", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => userProfiles.id),
  mbtiType: text("mbti_type").notNull(),
  dimensions: jsonb("dimensions").notNull(),
  answers: jsonb("answers").notNull(),
  interpretation: text("interpretation"),
  isShared: boolean("is_shared").default(false),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
  sql`CREATE INDEX IF NOT EXISTS idx_mbti_results_user ON ${table} (${table}.user_id)`,
  sql`CREATE INDEX IF NOT EXISTS idx_mbti_results_type ON ${table} (${table}.mbti_type)`,
]);

// 积分记录表
export const pointTransactions = pgTable("point_transactions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => userProfiles.id),
  amount: integer("amount").notNull(),
  type: text("type").notNull(), // checkin, share, recharge, spend
  description: text("description"),
  relatedId: uuid("related_id"), // 关联的测试ID等
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
  sql`CREATE INDEX IF NOT EXISTS idx_point_trans_user ON ${table} (${table}.user_id)`,
  sql`CREATE INDEX IF NOT EXISTS idx_point_trans_created ON ${table} (${table}.created_at DESC)`,
]);

// 用户-行业专属分析表
export const userIndustryAnalyses = pgTable("user_industry_analyses", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => userProfiles.id),
  mbtiResultId: uuid("mbti_result_id").references(() => mbtiResults.id),
  industryId: text("industry_id").notNull(),
  analysis: text("analysis"),
  aiInterpretation: text("ai_interpretation"),
  pointsCost: integer("points_cost").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
  sql`CREATE INDEX IF NOT EXISTS idx_user_industry_user ON ${table} (${table}.user_id)`,
  sql`CREATE INDEX IF NOT EXISTS idx_user_industry_industry ON ${table} (${table}.industry_id)`,
]);

// 用户AI对话历史表
export const aiConversations = pgTable("ai_conversations", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => userProfiles.id),
  mbtiResultId: uuid("mbti_result_id").references(() => mbtiResults.id),
  industryId: text("industry_id"), // 可选，针对特定行业
  messages: jsonb("messages").notNull().default(sql`'[]'::jsonb`),
  pointsCost: integer("points_cost").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
  sql`CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON ${table} (${table}.user_id)`,
]);

// 签到记录表
export const checkinRecords = pgTable("checkin_records", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => userProfiles.id),
  checkinDate: timestamp("checkin_date", { withTimezone: true, mode: 'string' }).defaultNow(),
  pointsEarned: integer("points_earned").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
  sql`CREATE INDEX IF NOT EXISTS idx_checkin_user ON ${table} (${table}.user_id)`,
  sql`CREATE INDEX IF NOT EXISTS idx_checkin_date ON ${table} (${table}.checkin_date DESC)`,
]);

// 分享记录表
export const shareRecords = pgTable("share_records", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid("user_id").references(() => userProfiles.id),
  shareType: text("share_type").notNull(), // test_result, industry, invite
  platform: text("platform"), // wechat, weibo, link
  pointsEarned: integer("points_earned").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
  sql`CREATE INDEX IF NOT EXISTS idx_share_user ON ${table} (${table}.user_id)`,
]);
