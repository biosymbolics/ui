'use server';

import { cache } from 'react';
import Box from '@mui/joy/Box';
import ReactMarkdown from 'react-markdown';
import 'server-only';

import { TERM_DESCRIPTION_API_URL } from '@/constants';

const fetchDescription = cache(async (terms: string[]): Promise<string> => {
    if (terms.length === 0) {
        return '';
    }
    const res = await fetch(
        `${TERM_DESCRIPTION_API_URL}?terms=${terms.join(',')}`
    );
    if (!res.ok) {
        throw new Error(
            `Failed to fetch patents: ${res.status} ${res.statusText}`
        );
    }
    return res.text();
});

export const Description = async ({ terms }: { terms: string[] }) => {
    try {
        const description = await fetchDescription(terms);
        return <ReactMarkdown>{description || '(none)'}</ReactMarkdown>;
    } catch (e) {
        return (
            <Box>
                Failed to fetch description:{' '}
                {e instanceof Error ? e.message : JSON.stringify(e)}
            </Box>
        );
    }
};
