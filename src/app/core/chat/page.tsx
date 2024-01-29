'use server';

import { Suspense } from 'react';

import { Contents } from './contents';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const chatId = searchParams.chatId ?? 'belowCash';
    return (
        <Suspense>
            <Contents chatId={chatId} />
        </Suspense>
    );
};

export default Page;
