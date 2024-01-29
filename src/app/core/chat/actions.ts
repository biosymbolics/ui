'use server';

import { cache } from 'react';

import { CHAT_URL } from '@/constants';

/**
 * Chat
 * @param question
 * @param questionType
 */
export const chat = cache(async (question: string): Promise<string> => {
    if (question.length === 0) {
        return '';
    }
    const res = await fetch(
        `${CHAT_URL}?question=${encodeURIComponent(question)}`
    );
    if (!res.ok) {
        throw new Error(`Failed to chat: ${res.status} ${res.statusText}`);
    }
    return res.text();
});
