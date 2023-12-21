'use client';

/* eslint-disable @typescript-eslint/naming-convention */

import { Theme } from '@mui/joy/styles';
import { GridCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import clsx from 'clsx';

import { Patent } from '@/types/patents';

export const getPatentYearsClass = (params: GridCellParams<Patent>) => {
    const { value } = params;

    if (typeof value !== 'number') {
        return '';
    }

    return clsx('biosym-app', {
        good: value > 15,
        bad: value < 8,
    });
};

export const getAvailabilityClass = (params: GridCellParams<Patent>) => {
    const { value } = params;

    if (typeof value !== 'string') {
        return '';
    }

    return clsx('biosym-app', {
        good: ['POSSIBLE', 'LIKELY'].includes(value),
        bad: value === 'UNLIKELY',
    });
};

export const getScoresClassFunc =
    ({
        goodThreshold = 0.75,
        badThreshold = 0.2,
        higherIsBetter = true,
    }: {
        goodThreshold?: number;
        badThreshold?: number;
        higherIsBetter?: boolean;
    }) =>
    (params: GridCellParams<Patent>) => {
        const { value } = params;

        if (typeof value !== 'number') {
            return '';
        }

        return clsx('biosym-app', {
            good: higherIsBetter
                ? value > goodThreshold
                : value < goodThreshold,
            bad: higherIsBetter ? value < badThreshold : value > badThreshold,
        });
    };

export const getScoresClass = getScoresClassFunc({});
export const getTolerantScoresClass = getScoresClassFunc({
    goodThreshold: 0.42,
    badThreshold: 0.2,
});
export const getDropoutScoresClass = getScoresClassFunc({
    goodThreshold: 0.0,
    badThreshold: 0.2,
    higherIsBetter: false,
});
export const getRepurposeScoreClass = getScoresClassFunc({
    goodThreshold: 0.2,
    badThreshold: 0.0,
});

export const getStyles = ({ getColorSchemeSelector, palette }: Theme) => ({
    [getColorSchemeSelector('dark')]: {
        '& .biosym-app.good': {
            backgroundColor: palette.success[500],
            fontWeight: '600',
            filter: 'brightness(0.9)',
        },
        '& .biosym-app.bad': {
            backgroundColor: palette.danger[500],
            fontWeight: '600',
            filter: 'brightness(0.9)',
        },
    },
    [getColorSchemeSelector('light')]: {
        '& .biosym-app.good': {
            backgroundColor: palette.success[100],
            fontWeight: '600',
        },
        '& .biosym-app.bad': {
            backgroundColor: palette.danger[100],
            fontWeight: '600',
        },
    },
});
