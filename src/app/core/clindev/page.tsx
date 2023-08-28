'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';

import { Answer } from './answer';
import { Choose } from './choose';

export const Page = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const indication = searchParams.indication ?? '';

    return (
        <>
            <Typography gutterBottom level="h1">
                Clinical Development Timelines
            </Typography>
            <Section variant="separated">
                <Choose initial={indication} />
            </Section>
            <Section variant="main">
                <Section variant="l1">
                    <Suspense fallback={<Skeleton height="80vh" />}>
                        <Answer
                            pathname="/core/clindev"
                            indication={indication}
                        />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
