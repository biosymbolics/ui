'use client';

/* eslint-disable jsx-a11y/anchor-is-valid */

import { ReactNode } from 'react';
import NextLink from 'next/link';
import Link from '@mui/joy/Link';
import TrueIcon from '@mui/icons-material/Check';
import FalseIcon from '@mui/icons-material/Close';
import { IconButtonProps } from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography, { TypographyProps } from '@mui/joy/Typography';
import {
    GridRenderCellParams,
    GridValueFormatterParams,
} from '@mui/x-data-grid/models/params/gridCellParams';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { cheerfulFiestaPalette } from '@mui/x-charts/colorPalettes';
import isEmpty from 'lodash/fp/isEmpty';
import unescape from 'lodash/fp/unescape';
import uniq from 'lodash/fp/uniq';
import { format } from 'date-fns';

import { Chip, ChipProps, formatChips } from '@/components/data/chip';
import { formatLabel, formatPercent, title } from '@/utils/string';
import { MappingObject } from '@/types/documents/common';

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
        console.error(`Expected string, got ${typeof value}`);
        return '';
    }

    return title(value);
};

/**
 * Format mapping object (from API)
 */
export const formatMappingObject = <T extends MappingObject>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (!value) {
        return '';
    }

    return value.name;
};

/**
 * Format mapping objects (from API)
 */
export const formatMappingObjects = <T extends MappingObject[]>(
    params: GridValueFormatterParams<T>
): string[] => {
    const { value } = params;

    if (!value) {
        return [];
    }

    return uniq(value.map((v) => v.name));
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
        console.error(`Expected number, got ${typeof value}`);
        return formatBlank();
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
        console.error(`Expected number, got ${typeof value}`);
        return formatBlank();
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
        console.error(`Expected string, got ${typeof value}`);
        return '';
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
export const renderBoolean = <T extends Record<string, unknown>>(
    params: GridRenderCellParams<T>
): ReactNode =>
    params.value ? (
        <TrueIcon sx={{ m: 'auto' }} />
    ) : (
        <FalseIcon color="disabled" sx={{ m: 'auto' }} />
    );

/**
 * Render string array as chips
 */
export const renderList = <T extends Record<string, unknown>>(
    params: GridRenderCellParams<T, unknown[]>,
    formattedValue: string[] | undefined = undefined
): ReactNode => {
    const value = formattedValue ?? params.value;

    if (!Array.isArray(value)) {
        console.error(`Expected list, got ${typeof value}`);
        return formatBlank();
    }

    if (value.length === 0) {
        return formatBlank();
    }

    return formatChips({ isWrappable: false, items: value as string[] });
};

export const renderChips = renderList;

/**
 * Render string array as chips
 */
export const getRenderChip =
    <T extends Record<string, unknown>>({
        color: _color = 'primary',
        getUrl,
        getTooltip,
        openInNewTab = true,
        onClick,
    }: {
        color:
            | ChipProps['color']
            | ((value: number | string) => ChipProps['color']);
        getUrl?: (row: T) => string | undefined;
        getTooltip?: (row: T) => string | ReactNode | undefined;
        openInNewTab?: boolean;
        onClick?: IconButtonProps['onClick'];
    }) =>
    (params: GridRenderCellParams<T, string | number>): ReactNode => {
        const { value, row } = params;
        if (value === null || typeof value === 'undefined' || value === '') {
            return formatBlank();
        }
        if (typeof value !== 'string' && typeof value !== 'number') {
            return <>{JSON.stringify(value)}</>;
        }

        const href = getUrl ? getUrl(row) : undefined;
        const tooltip = getTooltip ? getTooltip(row) : undefined;

        const color =
            typeof _color === 'function' ? _color(value as number) : _color;

        return (
            <Chip
                color={color}
                href={href}
                onClick={onClick}
                openInNewTab={openInNewTab}
                tooltip={tooltip}
            >
                {formatLabel(value)}
            </Chip>
        );
    };

export const renderPrimaryChip = getRenderChip({ color: 'primary' });
export const renderWarningChip = getRenderChip({ color: 'warning' });
export const renderChip = getRenderChip({ color: 'neutral' });
export const renderOwnerChip = getRenderChip({
    color: 'neutral',
    getTooltip: (row: { owners: string[] }) => (
        <List>
            {row.owners.map((owner) => (
                <ListItem key={owner}>{owner}</ListItem>
            ))}
        </List>
    ),
});

export const getRenderSparkline =
    <T extends Record<string, unknown>>(
        height: number | undefined = undefined // defaults nicely to varying row heights
    ) =>
    (params: GridRenderCellParams<T, number[]>): ReactNode => {
        const { value } = params;
        if (!value) {
            return <span />;
        }
        return (
            <SparkLineChart
                showHighlight
                curve="natural"
                colors={cheerfulFiestaPalette}
                data={value}
                height={height}
                margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
                plotType="line"
            />
        );
    };

export const renderSparkline = getRenderSparkline();

export const getRenderBar =
    <T extends Record<string, unknown>>(
        height: number | undefined = undefined
    ) =>
    (params: GridRenderCellParams<T, Record<string, number>>): ReactNode => {
        const { value } = params;
        if (!value || isEmpty(value)) {
            return <span />;
        }
        return (
            <SparkLineChart
                showTooltip
                showHighlight
                colors={cheerfulFiestaPalette}
                data={Object.values(value)}
                xAxis={{
                    data: Object.keys(value),
                }}
                height={height}
                margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
                plotType="bar"
            />
        );
    };

export const renderBar = getRenderBar();

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
        console.error(`Expected string, got ${typeof value}`);
        return formatBlank();
    }

    return formatLabel(value);
};

export const getRenderTypography =
    <T extends Record<string, unknown>>(
        level: TypographyProps['level'],
        getUrl?: (row: T) => string | undefined
    ) =>
    (params: GridRenderCellParams<T, string>): ReactNode => {
        const { row, value } = params;
        if (!value) {
            return <span />;
        }
        const url = getUrl ? getUrl(row) : undefined;

        if (url) {
            return (
                <NextLink passHref href={url} target="_blank">
                    <Link>{value}</Link>
                </NextLink>
            );
        }
        return <Typography level={level}>{value}</Typography>;
    };

export const renderMainTypography = getRenderTypography('title-md');
