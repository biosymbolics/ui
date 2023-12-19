'use server';

import Typography from '@mui/joy/Typography';

import { fetchAutocompletions } from '@/app/core/actions';
import { SearchBar } from '@/components/composite';
import { Section } from '@/components/layout/section';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const { asset } = searchParams;

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    exemplarPatents={null}
                    fetchAutocompletions={fetchAutocompletions}
                    minPatentYears={null}
                    queryType={null}
                    terms={null}
                />
            </Section>
            <Section variant="main">
                <Section>
                    <Typography level="h1">{asset}</Typography>
                </Section>
            </Section>
        </>
    );
};

export default Page;
