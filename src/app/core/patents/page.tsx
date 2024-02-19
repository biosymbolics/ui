'use server';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import isEmpty from 'lodash/fp/isEmpty';

import { fetchAutocompletions, fetchPatents } from '@/app/core/actions';
import { SearchBar, SearchCriteriaError } from '@/components/composite';
import { PatentsDetail } from '@/components/composite/patents/client';
import { Section } from '@/components/layout/section';
import { PatentSearchArgs, PatentSearchArgsWithIdsSchema } from '@/types';

const PatentPageInner = async (args: PatentSearchArgs) => {
    const { description, terms } = args;
    if (isEmpty(terms) && isEmpty(description)) {
        return <SearchCriteriaError />;
    }

    const patents = await fetchPatents(args);
    return <PatentsDetail patents={patents} />;
};

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const { ids, terms, ...params } =
        PatentSearchArgsWithIdsSchema.parse(searchParams);

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    {...params}
                    fetchAutocompletions={fetchAutocompletions}
                    terms={ids || terms}
                />
            </Section>
            <Section variant="main">
                <Section>
                    <Suspense fallback={<Skeleton height="80vh" />}>
                        <PatentPageInner {...params} terms={ids || terms} />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
