'use server';

import Box from '@mui/joy/Box';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import {
    DataGrid,
    renderLabel,
    formatName,
    formatNumber,
    formatYear,
} from '@/components/data/grid';
import { TrialSearchArgs } from '@/types/trials';

import { fetchTrials } from './actions';

const getTrialColumns = (): GridColDef[] => [
    { field: 'nct_id', headerName: 'Nct Id', width: 150 },
    {
        field: 'title',
        headerName: 'Title',
        width: 500,
    },
    {
        field: 'sponsor',
        headerName: 'Sponsor',
        width: 175,
        valueFormatter: formatName,
    },
    {
        field: 'start_date',
        headerName: 'Start',
        width: 75,
        valueFormatter: formatYear,
    },
    {
        field: 'end_date',
        headerName: 'End',
        width: 75,
        valueFormatter: formatYear,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 160,
    },
    {
        field: 'enrollment',
        headerName: 'Enrollment',
        width: 100,
        valueFormatter: formatNumber,
    },
    {
        field: 'duration',
        headerName: 'Duration',
        width: 100,
        valueFormatter: formatNumber,
    },
    {
        field: 'phase',
        headerName: 'Phase',
        width: 100,
        valueFormatter: renderLabel,
    },
    {
        field: 'design',
        headerName: 'Design',
        width: 150,
        valueFormatter: renderLabel,
    },
    {
        field: 'dropout_count',
        headerName: 'Dropouts',
        width: 100,
    },
    {
        field: 'max_timeframe',
        headerName: 'Timeframe',
        width: 100,
    },
];

export const TrialList = async (args: TrialSearchArgs) => {
    const columns = getTrialColumns();
    const trials = await fetchTrials(args);
    try {
        return (
            <Box height="100vh">
                <DataGrid
                    columns={columns}
                    rows={trials.map((trial) => ({
                        ...trial,
                        id: trial.nct_id,
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
