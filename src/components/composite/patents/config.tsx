'use client';

import { GridColDef } from '@mui/x-data-grid/models/colDef';

import {
    formatBlank,
    formatName,
    formatNumber,
    formatYear,
    renderPercent,
    unencodeHtml,
} from '@/components/data/grid';

import {
    getAvailabilityClass,
    getPatentYearsClass,
    getScoresClass,
    getTolerantScoresClass,
} from '../styles';

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
        cellClassName: getScoresClass,
        description: '**FAKE PLACEHOLDER**!! Estimated PoS.',
    },
    {
        field: 'reformulation_score',
        headerName: 'Reformulation⚠️',
        width: 100,
        valueFormatter: renderPercent,
        cellClassName: getScoresClass,
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
        field: 'priority_date',
        headerName: 'Priority Year',
        valueFormatter: formatYear,
        width: 125,
    },
];
