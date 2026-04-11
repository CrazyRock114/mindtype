import { relations } from "drizzle-orm/relations";
import { userProfiles, aiConversations, mbtiResults, pointTransactions, shareRecords, userIndustryAnalyses, checkinRecords } from "./schema";

export const aiConversationsRelations = relations(aiConversations, ({one}) => ({
	userProfile: one(userProfiles, {
		fields: [aiConversations.userId],
		references: [userProfiles.id]
	}),
	mbtiResult: one(mbtiResults, {
		fields: [aiConversations.mbtiResultId],
		references: [mbtiResults.id]
	}),
}));

export const userProfilesRelations = relations(userProfiles, ({many}) => ({
	aiConversations: many(aiConversations),
	mbtiResults: many(mbtiResults),
	pointTransactions: many(pointTransactions),
	shareRecords: many(shareRecords),
	userIndustryAnalyses: many(userIndustryAnalyses),
	checkinRecords: many(checkinRecords),
}));

export const mbtiResultsRelations = relations(mbtiResults, ({one, many}) => ({
	aiConversations: many(aiConversations),
	userProfile: one(userProfiles, {
		fields: [mbtiResults.userId],
		references: [userProfiles.id]
	}),
	userIndustryAnalyses: many(userIndustryAnalyses),
}));

export const pointTransactionsRelations = relations(pointTransactions, ({one}) => ({
	userProfile: one(userProfiles, {
		fields: [pointTransactions.userId],
		references: [userProfiles.id]
	}),
}));

export const shareRecordsRelations = relations(shareRecords, ({one}) => ({
	userProfile: one(userProfiles, {
		fields: [shareRecords.userId],
		references: [userProfiles.id]
	}),
}));

export const userIndustryAnalysesRelations = relations(userIndustryAnalyses, ({one}) => ({
	userProfile: one(userProfiles, {
		fields: [userIndustryAnalyses.userId],
		references: [userProfiles.id]
	}),
	mbtiResult: one(mbtiResults, {
		fields: [userIndustryAnalyses.mbtiResultId],
		references: [mbtiResults.id]
	}),
}));

export const checkinRecordsRelations = relations(checkinRecords, ({one}) => ({
	userProfile: one(userProfiles, {
		fields: [checkinRecords.userId],
		references: [userProfiles.id]
	}),
}));