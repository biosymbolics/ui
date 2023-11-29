'use server';

import Box from '@mui/joy/Box';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import {
    DataGrid,
    formatBlank,
    formatDate,
    formatName,
    formatNumber,
    formatYear,
    renderBoolean,
    unencodeHtml,
} from '@/components/data/grid';
import { Tabs } from '@/components/layout/tabs';
import { Patent, PatentSearchArgs } from '@/types/patents';

import { fetchPatents } from './actions';
import {
    DetailContent,
    getPatentYearsClass,
    getScoresClass,
    getTolerantScoresClass,
    getStyles,
    getAvailabilityClass,
} from './client';
import { PatentGraph } from './graph';
import { OverTime } from './over-time';
import { Summary } from './summary';

const getPatentColumns = (): GridColDef[] => [
    { field: 'publication_number', headerName: 'Pub #', width: 170 },
    {
        field: 'title',
        headerName: 'Title',
        width: 500,
        valueFormatter: unencodeHtml,
    },
    {
        field: 'score',
        headerName: 'Overall',
        width: 85,
        valueFormatter: formatNumber,
        cellClassName: getTolerantScoresClass,
        description: 'Overall score',
    },
    {
        field: 'suitability_score',
        headerName: 'Suitability',
        width: 85,
        valueFormatter: formatNumber,
        cellClassName: getScoresClass,
        description:
            'Suitability of patent, in terms of patent type (CoM vs MoU), patented thing (compound > device) and patent years remaining.',
    },
    {
        field: 'patent_years',
        headerName: 'Yrs Left',
        width: 75,
        description: 'Patent years remaining.',
        cellClassName: getPatentYearsClass,
    },
    // {
    //     field: 'adj_patent_years',
    //     headerName: 'Adj Yrs⚠️',
    //     width: 75,
    //     description: '**FAKE** Adjusted patent years remaining.',
    //     cellClassName: getPatentYearsClass,
    // },
    {
        field: 'availability_likelihood',
        headerName: 'Est. Avail',
        width: 85,
        valueFormatter: formatName,
        cellClassName: getAvailabilityClass,
        description: 'Likehood of patent being available.',
    },
    {
        field: 'probability_of_success',
        headerName: 'Est. PoS⚠️',
        width: 85,
        valueFormatter: formatBlank,
        cellClassName: getScoresClass,
        description: '**FAKE PLACEHOLDER**!! Estimated PoS.',
    },
    {
        field: 'search_rank',
        headerName: 'Relevance',
        valueFormatter: formatNumber,
        width: 100,
    },
    {
        field: 'exemplar_similarity',
        headerName: 'Exemplar Similarity',
        valueFormatter: formatNumber,
        width: 100,
    },
    {
        field: 'is_approved',
        headerName: 'Approved',
        width: 75,
        renderCell: renderBoolean,
    },
    {
        field: 'assignees',
        headerName: 'Assignees',
        valueFormatter: formatName,
        width: 200,
    },
    {
        field: 'max_trial_phase',
        headerName: 'CT Phase',
        width: 100,
    },
    {
        field: 'last_trial_status',
        headerName: 'CT Status',
        width: 125,
    },
    {
        field: 'last_trial_update',
        headerName: 'Last CT Update',
        valueFormatter: formatDate,
        width: 125,
    },
    {
        field: 'priority_date',
        headerName: 'Priority Year',
        valueFormatter: formatYear,
        width: 125,
    },
];

const getTabs = (
    columns: GridColDef[],
    patents: Patent[],
    args: PatentSearchArgs
) => [
    {
        label: 'List',
        panel: (
            <Box height="100vh">
                <DataGrid
                    columns={columns}
                    detailComponent={DetailContent<Patent>}
                    rows={patents.map((patent) => ({
                        ...patent,
                        id: patent.publication_number,
                    }))}
                />
            </Box>
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
    {
        label: 'Graph',
        panel: <PatentGraph {...args} />,
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
        return (
            <Alert
                startDecorator={<WarningIcon />}
                variant="soft"
                color="warning"
            >
                <Typography level="h4">Failed to fetch patents</Typography>
                <Typography>
                    {e instanceof Error ? e.message : JSON.stringify(e)}
                </Typography>
            </Alert>
        );
    }
};
