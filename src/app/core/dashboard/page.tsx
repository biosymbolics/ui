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

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    exemplarPatents={exemplarPatents}
                    fetchAutocompletions={fetchAutocompletions}
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
                        <Content
                            exemplarPatents={exemplarPatents}
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
