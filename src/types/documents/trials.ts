/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { BaseSearchArgs, MappingObjectSchema } from './common';

const OutcomeSchema = z.object({
    id: z.number(),
    description: z.union([z.null(), z.string()]),
    name: z.string(),
    timeframe: z.string(),
});

export type Outcome = z.infer<typeof OutcomeSchema>;

export const TrialSchema = z.object({
    // blinding: z.string(),
    comparison_type: z.string(),
    design: z.string(),
    dropout_count: z.union([z.number(), z.null()]),
    dropout_percent: z.union([z.number(), z.null()]),
    duration: z.union([z.number(), z.null()]),
    end_date: z.union([z.string(), z.null()]),
    enrollment: z.union([z.number(), z.null()]),
    hypothesis_type: z.union([z.string(), z.null()]),
    id: z.string(),
    indications: z.union([z.array(MappingObjectSchema), z.null()]),
    interventions: z.union([z.array(MappingObjectSchema), z.null()]),
    masking: z.string(),
    max_timeframe: z.union([z.number(), z.null()]),
    outcomes: z.union([z.null(), z.array(OutcomeSchema)]),
    phase: z.string(),
    randomization: z.string(),
    reformulation_score: z.optional(z.number()),
    // score: z.number(),
    sponsor: z.union([MappingObjectSchema, z.null()]),
    start_date: z.union([z.string(), z.null()]),
    status: z.string(),
    termination_description: z.union([z.string(), z.null()]),
    termination_reason: z.union([z.string(), z.null()]),
    title: z.string(),
    url: z.string(),
});

export const TrialResponseSchema = z.array(TrialSchema);

export type Trial = z.infer<typeof TrialSchema>;
export type TrialResponse = z.infer<typeof TrialResponseSchema>;

export type TrialSearchArgs = BaseSearchArgs;
