/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const MappingObjectSchema = z.object({
    name: z.string(),
    canonical_name: z.union([z.string(), z.null()]),
    instance_rollup: z.union([z.string(), z.null()]),
});

export type MappingObject = z.infer<typeof MappingObjectSchema>;
