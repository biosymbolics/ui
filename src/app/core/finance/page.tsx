'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';

import { Answer } from './answer';
import { Choose } from './choose';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const ticker = searchParams.ticker ?? '';

    return (
        <>
            <Typography gutterBottom level="h1">
                Stock Performance x Events
            </Typography>
            <Section variant="separated">
                <Choose initial={ticker} />
            </Section>
            <Section variant="main">
                <Section variant="l1">
                    <Suspense fallback={<Skeleton height="80vh" />}>
                        <Answer ticker={ticker} />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
