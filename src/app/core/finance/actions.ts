import { cache } from 'react';

import { CHAT_URL } from '@/constants';
import { doFetch } from '@/utils/actions';
import { EventsResponse, EventsResponseSchema } from '@/types/sec';

export const getEvents = cache(
    async (ticker: string): Promise<EventsResponse | null> => {
        if (ticker.length === 0) {
            return null;
        }
        const res = await doFetch(
            `${CHAT_URL}?question=${encodeURIComponent(
                ticker
            )}&question_type=events`,
            EventsResponseSchema
        );
        return res;
    }
);
