import { cache } from 'react';
import 'server-only';

import { PATENT_SEARCH_API_URL } from '@/constants';
import { DataGrid } from '@/components/data/grid';
import { Patent, PatentResponse } from '@/types/patents';
import { getFetchOptions } from '@/utils/actions';

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
