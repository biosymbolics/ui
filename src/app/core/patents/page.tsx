'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';

import { fetchAutocompletions } from './actions';
import { Description } from './description';
import { Patents } from './patents';
import { SearchBar } from './search';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const terms = searchParams.terms?.split(';') ?? null;
    const queryType = searchParams.queryType ?? 'AND';
    const minPatentYears = parseInt(searchParams.minPatentYears ?? '10', 10);
    const exemplarPatents = searchParams.exemplarPatents?.split(';') ?? null;

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    exemplarPatents={exemplarPatents}
                    fetchAutocompletions={fetchAutocompletions}
                    minPatentYears={minPatentYears}
                    queryType={queryType}
                    terms={terms || []}
                />
            </Section>
            <Section variant="main">
                <Typography level="h1">
                    {terms ? `Terms: ${terms.join(', ')}` : 'No terms selected'}
                </Typography>
                <Section minHeight={100}>
                    <Suspense fallback={<Skeleton height={100} />}>
                        {terms && <Description terms={terms} />}
                    </Suspense>
                </Section>
                <Section>
                    <Suspense fallback={<Skeleton height="80vh" />}>
                        <Patents
                            exemplarPatents={exemplarPatents}
                            minPatentYears={minPatentYears}
                            queryType={queryType}
                            terms={terms || []}
                        />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
