'use server';

import { Suspense } from 'react';

import { Contents } from './contents';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const { conversationKey } = searchParams;
    return (
        <Suspense>
            <Contents conversationKey={conversationKey} />
        </Suspense>
    );
};

export default Page;
