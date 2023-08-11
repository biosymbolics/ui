import { Suspense } from 'react';
import Typography from '@mui/joy/Typography';
import { z } from 'zod';

import { Section } from '@/components/layout/section';
import { PATENT_TERM_API_URL } from '@/constants';
import { Option } from '@/types/select';
import { getFetchOptions } from '@/utils/actions';

import { Description } from './description';
import { Patents } from './patents';
import { SearchBar } from './search';

const AutocompleteResponse = z.object({
    terms: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
        })
    ),
});

const fetchOptions = async (term: string): Promise<Option[]> => {
    'use server';

    const res = await getFetchOptions(
        `${PATENT_TERM_API_URL}?term=${term}`,
        AutocompleteResponse
    );
    return res.terms;
};

/**
 * http://localhost:3000/dashboard?terms=asthma
 */
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
                <Suspense fallback={<div>Loading...</div>}>
                    <Description terms={terms} />
                </Suspense>
            </Section>
            <Section>
                <Suspense fallback={<div>Loading...</div>}>
                    <Patents terms={terms} />
                </Suspense>
            </Section>
        </>
    );
};

export default Page;
