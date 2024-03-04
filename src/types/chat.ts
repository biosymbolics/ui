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
    description: z.optional(z.union([z.null(), z.string()])),
    messageId: z.number(),
    conversationId: z.string(),
    sender: z.optional(z.string()),
    type: z.optional(z.string()),
});

export type MockChatMessage = z.infer<typeof MockChatMessageSchema>;

export const TopDocsByYearSchema = z.object({
    avgRelevance: z.number({ coerce: true }),
    count: z.number(),
    ids: z.array(z.string()),
    // scores: z.array(z.number()),
    titles: z.array(z.union([z.string(), z.null()])),
    totalInvestment: z.number({ coerce: true }),
    totalRelevance: z.number({ coerce: true }),
    totalTraction: z.number({ coerce: true }),
    year: z.number(),
});
export const SubConceptSchema = z.object({
    name: z.string(),
    description: z.string(),
    report: z.array(TopDocsByYearSchema),
});

export type SubConcept = z.infer<typeof SubConceptSchema>;
export const ConceptDecompositionReportSchema = z.array(SubConceptSchema);
export type ConceptDecompositionReport = z.infer<
    typeof ConceptDecompositionReportSchema
>;

export type TopDocsByYear = z.infer<typeof TopDocsByYearSchema>;
