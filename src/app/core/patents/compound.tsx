'use server';

import Box from '@mui/joy/Box';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import {
    DataGrid,
    renderChip,
    renderCompoundCountChip,
    renderSparkline,
} from '@/components/data/grid';
import { EntitySearchArgs } from '@/types/entities';

import { fetchEntities } from './actions';

const getCompoundColumns = (): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Entity',
        width: 250,
    },
    {
        field: 'trial_count',
        headerName: 'Trials',
        width: 125,
        renderCell: renderCompoundCountChip,
    },
    {
        field: 'patent_count',
        headerName: 'Patents',
        width: 125,
        renderCell: renderCompoundCountChip,
    },
    {
        field: 'activity',
        headerName: 'Activity',
        width: 125,
        renderCell: renderSparkline,
    },
    {
        field: 'last_priority_year',
        headerName: 'Latest Priority Date',
        width: 125,
    },
    {
        field: 'max_phase',
        headerName: 'Max Phase',
        width: 125,
        renderCell: renderChip,
    },
    {
        field: 'last_status',
        headerName: 'Last Status',
        width: 125,
        renderCell: renderChip,
    },
    {
        field: 'last_updated',
        headerName: 'Last Update',
        width: 125,
    },
];

export const CompoundList = async (args: EntitySearchArgs) => {
    const columns = getCompoundColumns();
    try {
        const entities = await fetchEntities(args);
        return (
            <Box height="100vh">
                <DataGrid
                    columns={columns}
                    // detailComponent={PatentDetail<Entity>}
                    rows={entities.map((entity) => ({
                        ...entity,
                        id: entity.name,
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
