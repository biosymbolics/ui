'use server';

import { cache } from 'react';
import Typography from '@mui/joy/Typography';
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
        return (
            <Typography level="body-md">{description || '(none)'}</Typography>
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch description: {e.message}</div>;
        }
        return <div>Failed to fetch description</div>;
    }
};
