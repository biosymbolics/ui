/* eslint-disable @typescript-eslint/naming-convention */
import { cache } from 'react';
import { z } from 'zod';
import 'server-only';

import { PATENT_SEARCH_API_URL } from '@/constants';
import { DataGrid } from '@/components/data/grid';
import { getFetchOptions } from '@/utils/actions';

const PatentSchema = z.object({
    publication_number: z.string(),
    title: z.string(),
    abstract: z.string(),
    assignees: z.array(z.string()),
    compounds: z.array(z.string()),
    diseases: z.array(z.string()),
    genes: z.array(z.string()),
    inventors: z.array(z.string()),
    mechanisms: z.array(z.string()),
});

const PatentResponse = z.array(PatentSchema);

type Patent = z.infer<typeof PatentSchema>;

const fetchPatents = cache(async (terms: string[]): Promise<Patent[]> => {
    if (terms.length === 0) {
        return [];
    }
    const res = await getFetchOptions(
        `${PATENT_SEARCH_API_URL}?terms=${terms.join(',')}`,
        PatentResponse
    );
    return res;
});

export const Patents = async ({ terms }: { terms: string[] }) => {
    try {
        const patents = await fetchPatents(terms);
        return (
            <DataGrid
                rows={patents.map((patent) => ({
                    ...patent,
                    id: patent.publication_number,
                }))}
            />
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch patents: {e.message}</div>;
        }
        return <div>Failed to fetch patents</div>;
    }
};
