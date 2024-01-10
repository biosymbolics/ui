'use client';

import { GridColDef } from '@mui/x-data-grid/models/colDef';

import {
    formatMappingObjects,
    formatYear,
    renderChip,
    renderChips,
} from '@/components/data/grid';

export const getApprovalColumns = (): GridColDef[] => [
    {
        field: 'application_type',
        headerName: 'Type',
        renderCell: renderChip,
        width: 100,
    },
    {
        field: 'agency',
        headerName: 'Agency',
        renderCell: renderChip,
        width: 100,
    },
    {
        field: 'interventions',
        headerName: 'Interventions',
        renderCell: renderChips,
        valueGetter: formatMappingObjects,
        width: 200,
    },
    {
        field: 'indications',
        headerName: 'Indications',
        renderCell: renderChips,
        valueGetter: formatMappingObjects,
        width: 175,
    },

    {
        field: 'approval_date',
        headerName: 'Date',
        width: 75,
        valueFormatter: formatYear,
    },
];
