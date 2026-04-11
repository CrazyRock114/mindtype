import { pgTable, foreignKey, uuid, text, jsonb, integer, timestamp, serial, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const aiConversations = pgTable("ai_conversations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	mbtiResultId: uuid("mbti_result_id"),
	industryId: text("industry_id"),
	messages: jsonb().default([]).notNull(),
	pointsCost: integer("points_cost").default(0).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userProfiles.id],
			name: "ai_conversations_user_id_user_profiles_id_fk"
		}),
	foreignKey({
			columns: [table.mbtiResultId],
			foreignColumns: [mbtiResults.id],
			name: "ai_conversations_mbti_result_id_mbti_results_id_fk"
		}),
]);

export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const mbtiResults = pgTable("mbti_results", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	mbtiType: text("mbti_type").notNull(),
	dimensions: jsonb().notNull(),
	answers: jsonb().notNull(),
	interpretation: text(),
	isShared: boolean("is_shared").default(false),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userProfiles.id],
			name: "mbti_results_user_id_user_profiles_id_fk"
		}),
]);

export const pointTransactions = pgTable("point_transactions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	amount: integer().notNull(),
	type: text().notNull(),
	description: text(),
	relatedId: uuid("related_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userProfiles.id],
			name: "point_transactions_user_id_user_profiles_id_fk"
		}),
]);

export const shareRecords = pgTable("share_records", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	shareType: text("share_type").notNull(),
	platform: text(),
	pointsEarned: integer("points_earned").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userProfiles.id],
			name: "share_records_user_id_user_profiles_id_fk"
		}),
]);

export const userIndustryAnalyses = pgTable("user_industry_analyses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	mbtiResultId: uuid("mbti_result_id"),
	industryId: text("industry_id").notNull(),
	analysis: text(),
	aiInterpretation: text("ai_interpretation"),
	pointsCost: integer("points_cost").default(0).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userProfiles.id],
			name: "user_industry_analyses_user_id_user_profiles_id_fk"
		}),
	foreignKey({
			columns: [table.mbtiResultId],
			foreignColumns: [mbtiResults.id],
			name: "user_industry_analyses_mbti_result_id_mbti_results_id_fk"
		}),
]);

export const userProfiles = pgTable("user_profiles", {
	id: uuid().default(sql`auth.uid()`).primaryKey().notNull(),
	username: text(),
	avatarUrl: text("avatar_url"),
	bio: text(),
	mbtiType: text("mbti_type"),
	points: integer().default(0).notNull(),
	totalTests: integer("total_tests").default(0).notNull(),
	consecutiveCheckins: integer("consecutive_checkins").default(0).notNull(),
	lastCheckinDate: timestamp("last_checkin_date", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const checkinRecords = pgTable("checkin_records", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id"),
	checkinDate: timestamp("checkin_date", { withTimezone: true, mode: 'string' }).defaultNow(),
	pointsEarned: integer("points_earned").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [userProfiles.id],
			name: "checkin_records_user_id_user_profiles_id_fk"
		}),
]);
