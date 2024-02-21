'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { SearchBar } from '@/components/composite';
import { Section } from '@/components/layout/section';
import { BaseSearchArgsSchema } from '@/types';
import { formatLabel } from '@/utils/string';

import { Content } from './content';

import { fetchAutocompletions } from '../actions';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const { terms, ...params } = BaseSearchArgsSchema.parse(searchParams);
    const { tab } = searchParams;

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    {...params}
                    fetchAutocompletions={fetchAutocompletions}
                    terms={terms || []}
                />
            </Section>
            <Section variant="main">
                <Section>
                    {terms && (
                        <Typography level="h1">
                            {terms.map((t) => formatLabel(t)).join(', ')}
                        </Typography>
                    )}
                    {/* <Suspense fallback={<Skeleton />}>
                        {terms && <Description terms={terms} />}
                    </Suspense> */}
                </Section>
                <Section>
                    <Suspense fallback={<Skeleton height="80vh" />}>
                        <Content {...params} tab={tab} terms={terms || []} />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
