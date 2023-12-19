'use client';

import { ReactNode } from 'react';
import TrueIcon from '@mui/icons-material/Check';
import FalseIcon from '@mui/icons-material/Close';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import {
    GridRenderCellParams,
    GridValueFormatterParams,
} from '@mui/x-data-grid/models/params/gridCellParams';
import unescape from 'lodash/fp/unescape';
import { format } from 'date-fns';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

import { Chip, ChipProps, formatChips } from '@/components/data/chip';
import { formatLabel, formatPercent, title } from '@/utils/string';

/**
 * Format name
 */
export const formatName = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (!value) {
        return '';
    }

    if (Array.isArray(value)) {
        return value.map((v) => title(v as string)).join(', ');
    }

    if (typeof value !== 'string') {
        throw new Error(`Expected string, got ${typeof value}`);
    }

    return title(value);
};

/**
 * Print blank
 */
export const formatBlank = (): string => '--';

/**
 * Pretty-print number
 */
export const formatNumber = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (value === null || typeof value === 'undefined') {
        return formatBlank();
    }

    if (typeof value !== 'number') {
        throw new Error(`Expected number, got ${typeof value}`);
    }

    return `${parseFloat((value as number).toPrecision(2))}`;
};

/**
 * Format number as percent
 */
export const renderPercent = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (typeof value !== 'number') {
        throw new Error(`Expected number, got ${typeof value}`);
    }

    return formatPercent(value);
};

/**
 * Unencode any HTML-encoded things
 * @param params
 * @returns
 */
export const unencodeHtml = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (Array.isArray(value)) {
        return value.map((v) => unescape(v as string)).join(', ');
    }

    if (typeof value !== 'string') {
        throw new Error(`Expected string, got ${typeof value}`);
    }

    return unescape(value);
};

/**
 * Get date formatter
 */
export const getFormatDate =
    (dateFormat: string = 'yyyy-MM-dd') =>
    <T extends Record<string, unknown>>(
        params: GridValueFormatterParams<T>
    ): string => {
        const { value } = params;

        if (typeof value !== 'string') {
            return '';
        }

        return format(new Date(value as string), dateFormat);
    };

/**
 * Format date as yyyy-MM-dd
 */
export const formatDate = getFormatDate('yyyy-MM-dd');

/**
 * Format date as year
 */
export const formatYear = getFormatDate('yyyy');

/**
 * Render boolean
 */
export const renderBoolean = (
    params: GridRenderCellParams<string[]>
): ReactNode =>
    params.value ? (
        <TrueIcon sx={{ m: 'auto' }} />
    ) : (
        <FalseIcon color="disabled" sx={{ m: 'auto' }} />
    );

/**
 * Render string array as chips
 */
export const renderList = (
    params: GridRenderCellParams<string[]>
): ReactNode => {
    if (!Array.isArray(params.value)) {
        throw new Error(`Expected list, got ${typeof params.value}`);
    }

    return formatChips({ isWrappable: false, items: params.value as string[] });
};

/**
 * Render string array as chips
 */
export const getRenderChip =
    <T extends Record<string, unknown>>(
        color: ChipProps['color'],
        getUrl: (row: T) => string | undefined = () => undefined
    ) =>
    (params: GridRenderCellParams<T, string | number>): ReactNode => {
        const { value, row } = params;
        if (typeof value !== 'string' && typeof value !== 'number') {
            return <>{JSON.stringify(value)}</>;
        }

        const href = getUrl(row);

        if (typeof value !== 'number' && !value) {
            return <span />;
        }

        return (
            <Chip color={color} href={href}>
                {formatLabel(value)}
            </Chip>
        );
    };

export const renderPrimaryChip = getRenderChip('primary');
export const renderChip = getRenderChip('neutral');
export const renderAssetCountChip = getRenderChip(
    'primary',
    (row: { name: string }) => `/core/dashboard?terms=${row.name}`
);

export const getRenderSparkline =
    <T extends Record<string, unknown>>() =>
    (params: GridRenderCellParams<T, number[]>): ReactNode => {
        const { value } = params;
        if (!value) {
            return <span />;
        }
        return (
            <SparkLineChart
                showHighlight
                plotType="line"
                colors={['blue']}
                data={value}
                height={50}
                margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
            />
        );
    };

export const renderSparkline = getRenderSparkline();

/**
 * Format label
 */
export const renderLabel = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (!value) {
        return formatBlank();
    }

    if (typeof value !== 'string') {
        throw new Error(`Expected string, got ${typeof value}`);
    }

    return formatLabel(value);
};

export const getRenderTypography =
    <T extends Record<string, unknown>>(level: TypographyProps['level']) =>
    (params: GridRenderCellParams<T, string>): ReactNode => {
        const { value } = params;
        if (!value) {
            return <span />;
        }
        return <Typography level={level}>{value}</Typography>;
    };

export const renderMainTypography = getRenderTypography('title-md');
