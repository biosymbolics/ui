'is client';

import { Suspense } from 'react';
import { Skeleton } from '@mui/joy';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';

import { Description } from './description';
import { Patents } from './patents';
import { SearchBar } from './search';
import { fetchOptions } from './utils';

export const Page = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const terms = searchParams.terms?.split(',') ?? [];

    if (terms.length === 0) {
        return <div>Missing terms</div>;
    }

    return (
        <>
            <Section>
                <SearchBar fetchOptions={fetchOptions} terms={terms} />
            </Section>
            <Section>
                <Typography gutterBottom level="h1">
                    Terms: {terms.join(', ')}
                </Typography>
                <Suspense fallback={<Skeleton height="20vh" />}>
                    <Description terms={terms} />
                </Suspense>
            </Section>
            <Section>
                <Suspense fallback={<Skeleton height="80vh" />}>
                    <Patents terms={terms} />
                </Suspense>
            </Section>
        </>
    );
};

export default Page;
