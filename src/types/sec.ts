import { z } from 'zod';

const EventsSchema = z.array(
    z.object({
        date: z.string(),
        details: z.string(),
    })
);

const StockByDaySchema = z.object({
    date: z.string(),
    close: z.number(),
    open: z.number(),
    volume: z.number(),
});

export const EventsResponseSchema = z.object({
    events: EventsSchema,
    stock: z.array(StockByDaySchema),
});

export type EventsResponse = z.infer<typeof EventsResponseSchema>;
