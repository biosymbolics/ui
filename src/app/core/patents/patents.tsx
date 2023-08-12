'use server';

import { cache } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import Box from '@mui/joy/Box';
import 'server-only';

import { PATENT_SEARCH_API_URL } from '@/constants';
import { DataGrid } from '@/components/data/grid';
import { Patent, PatentResponse, PatentSearchArgs } from '@/types/patents';
import { getFetchOptions } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';

import {
    DetailContent,
    formatDate,
    formatNumber,
    getPatentYearsClass,
    getScoresClass,
    getStyles,
} from './client-components';

const fetchPatents = cache(
    async (args: PatentSearchArgs): Promise<Patent[]> => {
        if (args.terms.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args); // TODO: snake case!!
        const res = await getFetchOptions(
            `${PATENT_SEARCH_API_URL}?${queryArgs}`,
            PatentResponse
        );
        return res;
    }
);

const PATENT_COLUMNS: GridColDef[] = [
    { field: 'publication_number', headerName: 'Pub #', width: 160 },
    { field: 'title', headerName: 'Title', width: 500 },
    {
        field: 'patent_years',
        headerName: 'Yrs Left',
        width: 75,
        description: 'Patent years remaining.',
        cellClassName: getPatentYearsClass,
    },
    {
        field: 'score',
        headerName: 'Suitability',
        width: 85,
        valueFormatter: formatNumber,
        cellClassName: getScoresClass,
        description:
            'Suitability of patent, in terms of patent type (CoM vs MoU), patented thing (compound > device) and patent years remaining.',
    },
    {
        field: 'search_rank',
        headerName: 'Relevancy',
        width: 85,
        valueFormatter: formatNumber,
        cellClassName: getScoresClass,
        description: 'Relevancy of patent to search terms.',
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

export const Patents = async (args: PatentSearchArgs) => {
    try {
        const patents = await fetchPatents(args);
        return (
            <Box sx={getStyles}>
                <DataGrid
                    columns={PATENT_COLUMNS}
                    detailComponent={DetailContent<Patent>}
                    // initialState={{
                    //     pinnedColumns: { left: ['publication_number'] },
                    // }}
                    rows={patents.map((patent) => ({
                        ...patent,
                        id: patent.publication_number,
                    }))}
                />
            </Box>
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch patents: {e.message}</div>;
        }
        return <div>Failed to fetch patents</div>;
    }
};
