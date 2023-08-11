'use server';

import { cache } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import 'server-only';

import { PATENT_SEARCH_API_URL } from '@/constants';
import { DataGrid } from '@/components/data/grid';
import { Patent, PatentResponse } from '@/types/patents';
import { getFetchOptions } from '@/utils/actions';

import { DetailContent, formatDate, formatNumber } from './client-components';

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

const PATENT_COLUMNS: GridColDef[] = [
    { field: 'publication_number', headerName: 'Pub #', width: 160 },
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'patent_years', headerName: 'Yrs Left', width: 75 },
    {
        field: 'score',
        headerName: 'Suitability',
        width: 100,
        valueFormatter: formatNumber,
    },
    {
        field: 'search_rank',
        headerName: 'Relevancy',
        width: 100,
        valueFormatter: formatNumber,
    },
    {
        field: 'priority_date',
        headerName: 'Priority Date',
        width: 200,
        valueFormatter: formatDate,
    },
    { field: 'assignees', headerName: 'Assignees', width: 250 },
    { field: 'attributes', headerName: 'Attributes', width: 100 },
];

export const Patents = async ({ terms }: { terms: string[] }) => {
    try {
        const patents = await fetchPatents(terms);
        return (
            <DataGrid
                columns={PATENT_COLUMNS}
                detailComponent={DetailContent<Patent>}
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
