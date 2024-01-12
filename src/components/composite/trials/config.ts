'use client';

import { GridColDef } from '@mui/x-data-grid/models/colDef';

import {
    formatMappingObject,
    formatMappingObjects,
    formatNumber,
    formatYear,
    renderChip,
    renderChips,
    renderLabel,
    renderPercent,
} from '@/components/data/grid';

import { renderStatusChip } from './client';

import { getDropoutScoresClass, getRepurposeScoreClass } from '../styles';

export const getTrialColumns = (): GridColDef[] => [
    { field: 'id', headerName: 'Nct Id', width: 135 },
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
        field: 'sponsor',
        headerName: 'Sponsor',
        width: 175,
        valueGetter: formatMappingObject,
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
        renderCell: renderStatusChip,
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
        field: 'title',
        headerName: 'Title',
        width: 500,
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
