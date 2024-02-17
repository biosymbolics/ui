'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';

import { CHAT_URL } from '@/constants';
import {
    MockChatParams,
    MockChatMessage,
    MockChatMessageSchema,
} from '@/types/chat';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/api';
import { formatKeys } from '@/utils/object';

/**
 * Chat
 */
export const chat = cache(
    async (args: MockChatParams): Promise<MockChatMessage> => {
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${CHAT_URL}?${queryArgs}`,
            MockChatMessageSchema,
            (response) => formatKeys(response, camelCase)
        );

        return res;
    }
);
