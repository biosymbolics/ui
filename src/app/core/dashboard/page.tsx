'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { SearchBar } from '@/components/composite';
import { Section } from '@/components/layout/section';
import { formatLabel } from '@/utils/string';

import { Description } from './description';
import { Content } from './content';

import { fetchAutocompletions } from '../actions';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const terms = searchParams.terms?.split(';') ?? null;
    const queryType = searchParams.queryType ?? 'AND';
    const exemplarPatents = searchParams.exemplarPatents?.split(';') ?? null;
    const startYear = searchParams.startYear
        ? parseInt(searchParams.startYear, 10)
        : undefined;
    const endYear = searchParams.endYear
        ? parseInt(searchParams.endYear, 10)
        : undefined;

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    endYear={endYear}
                    exemplarPatents={exemplarPatents}
                    fetchAutocompletions={fetchAutocompletions}
                    queryType={queryType}
                    startYear={startYear}
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
                        <Content
                            endYear={endYear}
                            exemplarPatents={exemplarPatents}
                            queryType={queryType}
                            startYear={startYear}
                            terms={terms || []}
                        />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
