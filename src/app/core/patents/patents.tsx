'use server';

import { cache } from 'react';
import Box from '@mui/joy/Box';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import 'server-only';

import { PATENT_SEARCH_API_URL } from '@/constants';
import { DataGrid } from '@/components/data/grid';
import { Tabs } from '@/components/layout/tabs';
import {
    Patent,
    PatentResponse,
    PatentResponseSchema,
    PatentSearchArgs,
} from '@/types/patents';
import { getFetchOptions } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';

import {
    DetailContent,
    formatNumber,
    getPatentYearsClass,
    getScoresClass,
    getStyles,
} from './client';
import { Summary } from './summary';
import { OverTime } from './over-time';

const fetchPatents = cache(
    async (args: PatentSearchArgs): Promise<PatentResponse> => {
        if (args.terms.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await getFetchOptions(
            `${PATENT_SEARCH_API_URL}?${queryArgs}`,
            PatentResponseSchema
        );
        return res;
    }
);

const getPatentColumns = (): GridColDef[] => [
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
    },
    { field: 'assignees', headerName: 'Assignees', width: 250 },
    { field: 'attributes', headerName: 'Attributes', width: 100 },
];

const getTabs = (
    columns: GridColDef[],
    patents: Patent[],
    args: PatentSearchArgs
) => [
    {
        label: 'List',
        panel: (
            <DataGrid
                columns={columns}
                detailComponent={DetailContent<Patent>}
                rows={patents.map((patent) => ({
                    ...patent,
                    id: patent.publication_number,
                }))}
            />
        ),
    },
    {
        label: 'Summary',
        panel: <Summary {...args} />,
    },
    {
        label: 'Over Time',
        panel: <OverTime {...args} />,
    },
];

export const Patents = async (args: PatentSearchArgs) => {
    const columns = getPatentColumns();
    try {
        const patents = await fetchPatents(args);
        const tabs = getTabs(columns, patents, args);
        return (
            <Box sx={getStyles}>
                <Tabs tabs={tabs} />
            </Box>
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch patents: {e.message}</div>;
        }
        return <div>Failed to fetch patents</div>;
    }
};
