/* eslint-disable @typescript-eslint/naming-convention */
import { cache } from 'react';
import 'server-only';

import { PATENT_SEARCH_API_URL } from '@/constants';
import { DataGrid } from '@/components/data/grid';

// TODO: jsonschema validation
type Patent = {
    publication_number: string; // TODO
    title: string;
    abstract: string;
    compounds: string[];
    diseases: string[];
    genes: string[];
    assignees: string[];
    inventors: string[];
};

const fetchPatents = cache(async (terms: string[]): Promise<Patent[]> => {
    if (terms.length === 0) {
        return [];
    }
    const res = await fetch(
        `${PATENT_SEARCH_API_URL}?terms=${terms.join(',')}`
    );
    if (!res.ok) {
        throw new Error(
            `Failed to fetch patents: ${res.status} ${res.statusText}`
        );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.json();
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
