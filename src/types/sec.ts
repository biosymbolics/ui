/* eslint-disable @typescript-eslint/naming-convention */
import { z } from 'zod';

export const EventsResponseSchema = z.array(
    z.object({
        date: z.string(),
        details: z.string(),
    })
);

export type EventsResponse = z.infer<typeof EventsResponseSchema>;
