'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';
import { formatLabel } from '@/utils/string';

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
                <Section>
                    <Typography level="h1">
                        {terms
                            ? terms.map((t) => formatLabel(t)).join(', ')
                            : 'No terms selected'}
                    </Typography>
                    <Suspense fallback={<Skeleton />}>
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
