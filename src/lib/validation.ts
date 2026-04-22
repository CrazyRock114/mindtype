/**
 * API 输入校验 Schema
 */

import { z } from 'zod';

export const ChatRequestSchema = z.object({
  mbtiType: z.string().min(1).max(10),
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().max(5000),
    })
  ).max(50),
});

export const InterpretRequestSchema = z.object({
  type: z.string().min(1).max(10),
  dimensions: z.object({
    EI: z.number().min(-100).max(100),
    SN: z.number().min(-100).max(100),
    TF: z.number().min(-100).max(100),
    JP: z.number().min(-100).max(100),
  }),
  answers: z.array(z.number().min(1).max(5)).max(50).optional(),
  answerSummary: z.string().max(5000).optional(),
});

export const IndustryAnalyzeSchema = z.object({
  mbtiType: z.string().min(1).max(10),
  industryId: z.string().min(1).max(50),
  industryName: z.string().min(1).max(100).optional(),
});
