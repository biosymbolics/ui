'use server';

import { Suspense } from 'react';

import { Contents } from './contents';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const { conversationId } = searchParams;
    return (
        <Suspense>
            <Contents conversationId={conversationId} />
        </Suspense>
    );
};

export default Page;
