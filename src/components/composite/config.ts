'use server';

import { GridColDef } from '@mui/x-data-grid/models/colDef';
import 'server-only';

import {
    formatBlank,
    formatDate,
    formatName,
    formatNumber,
    formatYear,
    renderAssetCountChip,
    renderBoolean,
    renderChip,
    renderLabel,
    renderMainTypography,
    renderPrimaryChip,
    renderPercent,
    renderSparkline,
    unencodeHtml,
} from '@/components/data/grid';

import {
    getAvailabilityClass,
    getDropoutScoresClass,
    getPatentYearsClass,
    getRepurposeScoreClass,
    getScoresClass,
    getTolerantScoresClass,
} from './styles';

export const getPatentColumns = (): GridColDef[] => [
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
    {
        field: 'probability_of_success',
        headerName: 'PoS',
        width: 85,
        valueFormatter: formatBlank,
        // cellClassName: getScoresClass,
        description: '**FAKE PLACEHOLDER**!! Estimated PoS.',
    },
    {
        field: 'reformulation_score',
        headerName: 'Reformulation⚠️',
        width: 100,
        valueFormatter: renderPercent,
        // cellClassName: getScoresClass,
        description: '**FAKE PLACEHOLDER**!! Esimated reformulation potential.',
    },
    {
        field: 'search_rank',
        headerName: 'Relevance',
        valueFormatter: formatNumber,
        width: 100,
    },
    {
        field: 'exemplar_similarity',
        headerName: 'Similarity',
        valueFormatter: formatNumber,
        width: 100,
        description: 'Similarity to exemplar patent.',
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

export const getTrialColumns = (): GridColDef[] => [
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

export const getAssetColumns = (): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Asset or Target',
        width: 250,
        renderCell: renderMainTypography,
    },
    {
        field: 'trial_count',
        headerName: 'Trials',
        width: 125,
        renderCell: renderAssetCountChip,
    },
    {
        field: 'patent_count',
        headerName: 'Patents',
        width: 125,
        renderCell: renderAssetCountChip,
    },
    {
        field: 'activity',
        headerName: 'Activity',
        width: 125,
        renderCell: renderSparkline,
    },
    {
        field: 'last_updated',
        headerName: 'Last Update',
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
];
