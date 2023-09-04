'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';

import { fetchOptions } from './actions';
import { Description } from './description';
import { Patents } from './patents';
import { SearchBar } from './search';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const terms = searchParams.terms?.split(';') ?? null;
    const minPatentYears = parseInt(searchParams.minPatentYears ?? '10', 10);
    const domains = searchParams.domains?.split(';') ?? [];
    const isExhaustive = searchParams.isExhaustive === 'true';

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    fetchOptions={fetchOptions}
                    domains={domains}
                    isExhaustive={isExhaustive}
                    minPatentYears={minPatentYears}
                    terms={terms || []}
                />
            </Section>
            <Section variant="main">
                <Section>
                    <Typography gutterBottom level="h1">
                        {terms
                            ? `Terms: ${terms.join(', ')}`
                            : 'No terms selected'}
                    </Typography>
                    <Suspense fallback={<Skeleton />}>
                        {terms && <Description terms={terms} />}
                    </Suspense>
                </Section>
                <Section>
                    <Suspense fallback={<Skeleton height="80vh" />}>
                        <Patents
                            domains={domains}
                            isExhaustive={isExhaustive}
                            minPatentYears={minPatentYears}
                            terms={terms || []}
                        />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
