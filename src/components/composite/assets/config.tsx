'use server';

import { GridColDef } from '@mui/x-data-grid/models/colDef';
import 'server-only';

import {
    renderAssetCountChip,
    renderChip,
    renderMainTypography,
    renderSparkline,
} from '@/components/data/grid';

import { renderAssetModal } from './client';

export const getAssetColumns = (): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Asset, Class or Target',
        width: 300,
        renderCell: renderMainTypography,
    },
    {
        field: 'approval_count',
        headerName: 'Approvals',
        width: 85,
        renderCell: renderAssetCountChip,
    },
    {
        field: 'trial_count',
        headerName: 'Trials',
        width: 85,
        renderCell: renderAssetCountChip,
    },
    {
        field: 'patent_count',
        headerName: 'Patents',
        width: 85,
        renderCell: renderAssetCountChip,
    },
    {
        field: 'owner_count',
        headerName: 'Owners',
        width: 85,
        renderCell: renderChip,
    },
    {
        field: 'activity',
        headerName: 'Activity',
        width: 125,
        renderCell: renderSparkline,
    },
    {
        field: 'last_updated',
        headerName: 'Updated',
        width: 85,
    },
    {
        field: 'maybe_available_count',
        headerName: 'Available?',
        renderCell: renderChip,
        width: 100,
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
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        type: 'actions',
        renderCell: renderAssetModal,
    },
];
