import { cache } from 'react';

import { ASK_SEC_API_URL } from '@/constants';
import { getFetchOptions } from '@/utils/actions';
import { EventsResponse, EventsResponseSchema } from '@/types/sec';

export const getEvents = cache(
    async (ticker: string): Promise<EventsResponse | null> => {
        if (ticker.length === 0) {
            return null;
        }
        const res = await getFetchOptions(
            `${ASK_SEC_API_URL}?question=${encodeURIComponent(
                ticker
            )}&question_type=events`,
            EventsResponseSchema
        );
        return res;
    }
);
