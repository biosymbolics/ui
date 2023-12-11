'use client';

import { ReactNode } from 'react';
import TrueIcon from '@mui/icons-material/Check';
import FalseIcon from '@mui/icons-material/Close';
import {
    GridRenderCellParams,
    GridValueFormatterParams,
} from '@mui/x-data-grid/models/params/gridCellParams';
import unescape from 'lodash/fp/unescape';
import { format } from 'date-fns';

import { formatChips } from '@/components/data/chip';
import { formatLabel, title } from '@/utils/string';

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

    if (value === null) {
        return formatBlank();
    }

    if (typeof value !== 'number') {
        throw new Error(`Expected number, got ${typeof value}`);
    }

    return (value as number).toPrecision(2);
};

/**
 * Format number as percent
 */
export const formatPercent = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (typeof value !== 'number') {
        throw new Error(`Expected number, got ${typeof value}`);
    }

    return `${(100 * value).toPrecision(2)}%`;
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
