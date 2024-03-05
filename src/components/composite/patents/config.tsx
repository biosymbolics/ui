'use client';

import { GridColDef } from '@mui/x-data-grid/models/colDef';

import {
    formatMappingObjects,
    formatName,
    formatNumber,
    formatYear,
    unencodeHtml,
} from '@/components/data/grid';

import { getAvailabilityClass, getPatentYearsClass } from '../styles';

export const getPatentColumns = (): GridColDef[] => [
    { field: 'id', headerName: 'Pub #', width: 170 },
    {
        field: 'title',
        headerName: 'Title',
        width: 500,
        valueFormatter: unencodeHtml,
    },
    // {
    //     field: 'score',
    //     headerName: 'Overall',
    //     width: 85,
    //     valueFormatter: formatNumber,
    //     cellClassName: getTolerantScoresClass,
    //     description: 'Overall score',
    // },
    // {
    //     field: 'suitabilityScore',
    //     headerName: 'Suitability',
    //     width: 85,
    //     valueFormatter: formatNumber,
    //     cellClassName: getScoresClass,
    //     description:
    //         'Suitability of patent, in terms of patent type (CoM vs MoU), patented thing (compound > device) and patent years remaining.',
    // },
    {
        field: 'priorityDate',
        headerName: 'Priority Year',
        valueFormatter: formatYear,
        width: 125,
    },
    {
        field: 'assignees',
        headerName: 'Assignees',
        width: 200,
        valueGetter: formatMappingObjects,
    },
    // {
    //     field: 'probabilityOfSuccess',
    //     headerName: 'PoS',
    //     width: 85,
    //     valueFormatter: formatBlank,
    //     cellClassName: getScoresClass,
    //     description: '**FAKE PLACEHOLDER**!! Estimated PoS.',
    // },
    // {
    //     field: 'reformulationScore',
    //     headerName: 'Reformulation⚠️',
    //     width: 100,
    //     valueFormatter: renderPercent,
    //     cellClassName: getScoresClass,
    //     description: '**FAKE PLACEHOLDER**!! Esimated reformulation potential.',
    // },
    {
        field: 'patentYears',
        headerName: 'Yrs Left',
        width: 75,
        description: 'Patent years remaining.',
        cellClassName: getPatentYearsClass,
    },
    {
        field: 'availabilityLikelihood',
        headerName: 'Est. Avail',
        width: 100,
        valueFormatter: formatName,
        cellClassName: getAvailabilityClass,
        description: 'Likehood of patent being available.',
    },
    {
        field: 'searchRank',
        headerName: 'Relevance',
        valueFormatter: formatNumber,
        width: 100,
    },
];
