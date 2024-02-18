import { z } from 'zod';

// one off schema for mock chat data map
export const InterventionDropoutReportSchema = z.array(
    z.object({
        intervention: z.string(),
        reason: z.string(),
        count: z.number(),
    })
);

export const MockChatMessageSchema = z.object({
    content: z.string(),
    messageId: z.number(),
    conversationId: z.string(),
    sender: z.optional(z.string()),
    type: z.optional(z.string()),
});

export type MockChatMessage = z.infer<typeof MockChatMessageSchema>;
