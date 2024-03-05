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

const DropoutReasonSchema = z.object({
    count: z.number(),
    reason: z.string(),
});

export type DropoutReason = z.infer<typeof DropoutReasonSchema>;

export const TrialSchema = z.object({
    // blinding: z.string(),
    comparisonType: z.string(),
    design: z.string(),
    dropoutCount: z.union([z.number(), z.null()]),
    dropoutPercent: z.union([z.number(), z.null()]),
    dropoutReasons: z.union([z.array(DropoutReasonSchema), z.null()]),
    duration: z.union([z.number(), z.null()]),
    endDate: z.union([z.string(), z.null()]),
    enrollment: z.union([z.number(), z.null()]),
    hypothesisType: z.union([z.string(), z.null()]),
    id: z.string(),
    indications: z.array(MappingObjectSchema),
    interventions: z.array(MappingObjectSchema),
    masking: z.string(),
    maxTimeframe: z.union([z.number(), z.null()]),
    outcomes: z.union([z.null(), z.array(OutcomeSchema)]),
    phase: z.string(),
    randomization: z.string(),
    // score: z.number(),
    sponsor: z.union([MappingObjectSchema, z.null()]),
    startDate: z.union([z.string(), z.null()]),
    status: z.string(),
    terminationDescription: z.union([z.string(), z.null()]),
    terminationReason: z.union([z.string(), z.null()]),
    title: z.string(),
    url: z.string(),
});

export const TrialResponseSchema = z.array(TrialSchema);

export type Trial = z.infer<typeof TrialSchema>;
export type TrialResponse = z.infer<typeof TrialResponseSchema>;

export type TrialSearchArgs = BaseSearchArgs;
