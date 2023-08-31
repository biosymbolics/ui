'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';

import { Answer } from './answer';
import { Question } from './question';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const question = searchParams.question ?? '';

    return (
        <>
            <Typography gutterBottom level="h1">
                Ask SEC 10-K Docs
            </Typography>
            <Section variant="separated">
                <Question initial={question} />
            </Section>
            <Section variant="main">
                <Section variant="l1">
                    <Suspense fallback={<Skeleton height="80vh" />}>
                        <Answer question={question} />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
