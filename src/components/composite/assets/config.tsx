'use server';

import { GridColDef } from '@mui/x-data-grid/models/colDef';
import 'server-only';

import {
    renderChip,
    renderOwnerChip,
    renderSparkline,
} from '@/components/data/grid';

import {
    renderAvailabilityModal,
    renderMainTerm,
    renderApprovalModel,
    renderPatentModal,
    renderTrialModal,
} from './client';

export const getAssetColumns = (): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Asset, Class or Target',
        width: 325,
        renderCell: renderMainTerm,
    },
    {
        field: 'approval_count',
        headerName: 'Approvals',
        width: 80,
        renderCell: renderApprovalModel,
    },
    {
        field: 'trial_count',
        headerName: 'Trials',
        width: 80,
        renderCell: renderTrialModal,
    },
    {
        field: 'patent_count',
        headerName: 'Patents',
        width: 80,
        renderCell: renderPatentModal,
    },
    {
        field: 'owner_count',
        headerName: 'Owners',
        width: 80,
        renderCell: renderOwnerChip,
    },
    {
        field: 'activity',
        headerName: 'Activity',
        width: 125,
        renderCell: renderSparkline,
    },
    {
        field: 'maybe_available_count',
        headerName: 'Avail?',
        width: 85,
        renderCell: renderAvailabilityModal,
        description: 'Number of patents that *might* be available',
    },
    {
        field: 'total_enrollment',
        headerName: 'Enroll.',
        width: 125,
        renderCell: renderChip,
    },
    {
        field: 'max_phase',
        headerName: 'Max Phase',
        width: 125,
        renderCell: renderChip,
    },
];
