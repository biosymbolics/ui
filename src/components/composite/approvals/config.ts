'use client';

import { GridColDef } from '@mui/x-data-grid/models/colDef';

import { formatYear, renderChip } from '@/components/data/grid';

export const getApprovalColumns = (): GridColDef[] => [
    {
        field: 'brand_name',
        headerName: 'Brand Name',
        renderCell: renderChip,
        width: 250,
    },
    {
        field: 'generic_name',
        headerName: 'Generic Name',
        renderCell: renderChip,
        width: 250,
    },
    {
        field: 'application_type',
        headerName: 'Type',
        renderCell: renderChip,
        width: 100,
    },
    {
        field: 'regulatory_agency',
        headerName: 'Agency',
        renderCell: renderChip,
        width: 100,
    },
    {
        field: 'approval_date',
        headerName: 'Date',
        width: 75,
        valueFormatter: formatYear,
    },
];
