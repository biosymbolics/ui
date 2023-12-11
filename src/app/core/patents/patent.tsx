'use server';

import Box from '@mui/joy/Box';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import {
    DataGrid,
    formatDate,
    formatName,
    formatNumber,
    formatYear,
    renderBoolean,
    unencodeHtml,
} from '@/components/data/grid';
import { Patent, PatentSearchArgs } from '@/types/patents';

import {
    DetailContent,
    getPatentYearsClass,
    getScoresClass,
    getTolerantScoresClass,
    getAvailabilityClass,
} from './client';
import { fetchPatents } from './actions';

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
        width: 100,
        valueFormatter: formatName,
        cellClassName: getAvailabilityClass,
        description: 'Likehood of patent being available.',
    },
    {
        field: 'assignees',
        headerName: 'Assignees',
        valueFormatter: formatName,
        width: 200,
    },
    // {
    //     field: 'probability_of_success',
    //     headerName: 'Est. PoS⚠️',
    //     width: 85,
    //     valueFormatter: formatBlank,
    //     cellClassName: getScoresClass,
    //     description: '**FAKE PLACEHOLDER**!! Estimated PoS.',
    // },
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

export const PatentList = async (args: PatentSearchArgs) => {
    const columns = getPatentColumns();
    const patents = await fetchPatents(args);
    try {
        return (
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
