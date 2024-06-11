'use server';

import { Suspense } from 'react';

import { Contents } from './contents';

/**
 * Fake chat page
 */
const ChatPage = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const { conversationId } = searchParams;
    return (
        <Suspense>
            <Contents conversationId={conversationId} />
        </Suspense>
    );
};

export default ChatPage;
