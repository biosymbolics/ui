'use server';

import { Suspense } from 'react';
import Alert from '@mui/joy/Alert';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import isEmpty from 'lodash/fp/isEmpty';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import { fetchAutocompletions, fetchPatents } from '@/app/core/actions';
import { SearchBar } from '@/components/composite';
import { PatentsDetail } from '@/components/composite/patents/client';
import { Section } from '@/components/layout/section';
import { PatentSearchArgs, PatentSearchArgsWithIdsSchema } from '@/types';

const PatentPageInner = async (args: PatentSearchArgs) => {
    const { description, terms } = args;
    if (isEmpty(terms) && isEmpty(description)) {
        return (
            <Alert
                variant="soft"
                color="primary"
                startDecorator={<LightbulbIcon />}
            >
                <Typography level="h4">Please enter a description</Typography>
                <Typography level="body-md">
                    Enter a 2-3 paragraph description.
                </Typography>
            </Alert>
        );
    }
    try {
        const patents = await fetchPatents(args);
        return <PatentsDetail patents={patents} />;
    } catch (e) {
        console.error(e);
        return null;
    }
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
