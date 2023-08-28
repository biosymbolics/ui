import { cache } from 'react';

import { ASK_SEC_API_URL } from '@/constants';

/**
 * Ask question of SEC 10K docs
 * @param terms
 */
export const askSec = cache(async (question: string): Promise<string> => {
    if (question.length === 0) {
        return '';
    }
    const res = await fetch(
        `${ASK_SEC_API_URL}?question=${encodeURIComponent(question)}`
    );
    if (!res.ok) {
        throw new Error(`Failed to ask sec: ${res.status} ${res.statusText}`);
    }
    return res.text();
});
