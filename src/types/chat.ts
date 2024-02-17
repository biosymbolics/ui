import { z } from 'zod';

import { paramString } from './documents/common';

// one off schema for mock chat data map
export const InterventionDropoutReportSchema = z.array(
    z.object({
        intervention: z.string(),
        reason: z.string(),
        count: z.number(),
    })
);

export const MockChatParamsSchema = z.object({
    prompt: z.string(),
    messageKey: z.string(),
    conversationKey: z.string(),
});

export type MockChatParams = z.infer<typeof MockChatParamsSchema>;

export const MockChatMessageSchema = z.object({
    id: paramString,
    content: z.string(),
    sender: z.optional(z.string()),
    type: z.optional(z.string()),
});

export type MockChatMessage = z.infer<typeof MockChatMessageSchema>;
