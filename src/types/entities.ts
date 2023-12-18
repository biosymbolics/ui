/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

import { PatentSchema } from './patents';
import { TrialSchema } from './trials';

export const EntitySchema = z.object({
    activity: z.array(z.number()),
    last_status: z.union([z.string(), z.null()]),
    last_updated: z.union([z.string(), z.null()]),
    name: z.string(),
    max_phase: z.union([z.string(), z.null()]),
    last_priority_year: z.union([z.number(), z.null()]),
    patents: z.array(PatentSchema),
    patent_count: z.number(),
    record_count: z.number(),
    trials: z.array(TrialSchema),
    trial_count: z.number(),
});

export const EntityResponseSchema = z.array(EntitySchema);

export type Entity = z.infer<typeof EntitySchema>;
export type EntityResponse = z.infer<typeof EntityResponseSchema>;

export type EntitySearchArgs = {
    queryType: string | null;
    terms: string[] | null;
};
