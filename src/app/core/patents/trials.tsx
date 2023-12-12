'use server';

import Box from '@mui/joy/Box';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

// import { Timeline } from '@/components/charts/gantt';
import {
    DataGrid,
    formatName,
    formatNumber,
    formatYear,
    renderChip,
    renderPrimaryChip,
    renderLabel,
    renderPercent,
} from '@/components/data/grid';
import { Trial, TrialSearchArgs } from '@/types/trials';

import { fetchTrials } from './actions';
import {
    TrialDetail,
    getDropoutScoresClass,
    getRepurposeScoreClass,
} from './client';

const getTrialColumns = (): GridColDef[] => [
    { field: 'nct_id', headerName: 'Nct Id', width: 135 },
    {
        field: 'title',
        headerName: 'Title',
        width: 500,
    },
    {
        field: 'intervention',
        headerName: 'Intervention',
        renderCell: renderChip,
        width: 200,
    },
    {
        field: 'condition',
        headerName: 'Condition',
        renderCell: renderChip,
        width: 175,
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
        field: 'phase',
        headerName: 'Phase',
        renderCell: renderChip,
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        renderCell: renderPrimaryChip,
        width: 125,
    },

    {
        field: 'dropout_percent',
        headerName: 'Dropout %',
        width: 100,
        valueFormatter: renderPercent,
        cellClassName: getDropoutScoresClass,
        description: 'Dropout % = Dropouts / Enrollment',
    },
    {
        field: 'termination_reason',
        headerName: 'Term. Reason',
        width: 150,
    },
    {
        field: 'reformulation_score',
        headerName: 'Repurpose⚠️',
        width: 150,
        valueFormatter: formatNumber,
        cellClassName: getRepurposeScoreClass,
        description: '**FAKE PLACEHOLDER**!! Esimated repurpose potential.',
    },
    {
        field: 'design',
        headerName: 'Design',
        width: 150,
        valueFormatter: renderLabel,
    },
    {
        field: 'duration',
        headerName: 'Duration',
        width: 100,
        valueFormatter: formatNumber,
    },
    {
        field: 'max_timeframe',
        headerName: 'Timeframe',
        width: 100,
    },
    {
        field: 'enrollment',
        headerName: 'Enrollment',
        width: 100,
        valueFormatter: formatNumber,
    },
];

export const TrialList = async (args: TrialSearchArgs) => {
    const columns = getTrialColumns();
    const trials = await fetchTrials(args);
    try {
        return (
            <Box height="100vh">
                {/* <Timeline
                    height={400}
                    pathname=""
                    series={[
                        {
                            data: trials
                                .filter(
                                    (t) =>
                                        t.start_date &&
                                        t.end_date &&
                                        new Date(t.end_date).getTime() >
                                            new Date().getTime()
                                )
                                .map((t) => ({
                                    x: t.mesh_conditions[0],
                                    y: [
                                        new Date(t.start_date || '').getTime(),
                                        new Date(t.end_date || '').getTime(),
                                    ],
                                }))
                                .slice(0, 200),
                        },
                    ]}
                /> */}
                <DataGrid
                    columns={columns}
                    detailComponent={TrialDetail<Trial>}
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
