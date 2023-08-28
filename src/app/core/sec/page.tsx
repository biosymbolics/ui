'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';

import { Section } from '@/components/layout/section';

import { Answer } from './answer';
import { Question } from './question';

export const Page = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const question = searchParams.question ?? '';

    return (
        <>
            <Section variant="separated">
                <Question initial={question} />
            </Section>
            <Section variant="main">
                <Suspense fallback={<Skeleton height="80vh" />}>
                    <Answer question={question} />
                </Suspense>
            </Section>
        </>
    );
};

export default Page;
