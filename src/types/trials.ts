/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const TrialSchema = z.object({
    blinding: z.string(),
    comparison_type: z.string(),
    conditions: z.array(z.string()),
    design: z.string(),
    dropout_count: z.union([z.number(), z.null()]),
    dropout_percent: z.optional(z.number()),
    duration: z.union([z.number(), z.null()]),
    end_date: z.union([z.string(), z.null()]),
    enrollment: z.union([z.number(), z.null()]),
    hypothesis_type: z.union([z.string(), z.null()]),
    interventions: z.array(z.string()),
    max_timeframe: z.union([z.number(), z.null()]),
    nct_id: z.string(),
    phase: z.string(),
    primary_outcomes: z.array(z.string()),
    randomization: z.string(),
    reformulation_score: z.optional(z.number()),
    score: z.number(),
    sponsor: z.union([z.string(), z.null()]),
    sponsor_type: z.string(),
    start_date: z.union([z.string(), z.null()]),
    status: z.string(),
    termination_reason: z.union([z.string(), z.null()]),
    time_frames: z.array(z.string()),
    title: z.string(),
});

export const TrialResponseSchema = z.array(TrialSchema);

export type Trial = z.infer<typeof TrialSchema>;
export type TrialResponse = z.infer<typeof TrialResponseSchema>;

export type TrialSearchArgs = {
    queryType: string | null;
    terms: string[] | null;
};
