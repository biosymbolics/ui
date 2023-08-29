import { cache } from 'react';

import { ASK_SEC_API_URL } from '@/constants';

/**
 * Ask question of SEC 10K docs
 * @param terms
 */
export const askSec = cache(
    async (
        question: string,
        questionType: string = 'source'
    ): Promise<string> => {
        if (question.length === 0) {
            return '';
        }
        const res = await fetch(
            `${ASK_SEC_API_URL}?question=${encodeURIComponent(
                question
            )}&question_type=${questionType}`
        );
        if (!res.ok) {
            throw new Error(
                `Failed to ask sec: ${res.status} ${res.statusText}`
            );
        }
        return res.text();
    }
);
