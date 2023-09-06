'use client';

import { ReactNode } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette } from '@mui/joy/styles';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import TrueIcon from '@mui/icons-material/Check';
import FalseIcon from '@mui/icons-material/Close';
import {
    GridCellParams,
    GridRenderCellParams,
    GridValueFormatterParams,
} from '@mui/x-data-grid/models/params/gridCellParams';
import clsx from 'clsx';
import unescape from 'lodash/fp/unescape';

import { Chips, formatChips } from '@/components/data/chip';
import { Metric } from '@/components/data/metric';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Patent } from '@/types/patents';
import { getSelectableId, title } from '@/utils/string';

const SimilarPatents = ({ patent }: { patent: Patent }): JSX.Element => (
    <>
        <Typography level="title-md">Similar Patents</Typography>
        <List>
            {patent.similar_patents
                .filter((s) => s.startsWith('WO'))
                .map((s, index) => (
                    <ListItem key={`${getSelectableId(s)}-${index}`}>
                        <ListItemDecorator>·</ListItemDecorator>
                        <Link
                            component={NextLink}
                            href={patent.url}
                            target="_blank"
                        >
                            {s}
                        </Link>
                        <Typography level="body-sm" sx={{ ml: 1 }}>
                            (
                            <Link
                                component={NextLink}
                                href={`/core/patents?terms=${s}`}
                                target="_blank"
                            >
                                Search
                            </Link>
                            )
                        </Typography>
                    </ListItem>
                ))}
        </List>
    </>
);

/**
 * Detail content panel for patents grid
 */
export const DetailContent = <T extends Patent>({
    row: patent,
}: {
    row: T;
}): JSX.Element => {
    const pathname = usePathname();
    const approvalInfo = patent.approval_date
        ? `\n\nApproved ${patent.approval_date}} for indication ${patent.indication} (${patent.brand_name}/${patent.generic_name}).`
        : '';
    const trialInfo = patent.last_trial_status
        ? `\n\nLast trial update: ${patent.last_trial_status} on ${
              patent.last_trial_update
          }. NCTs ${(patent.nct_ids || []).join(', ')}.`
        : '';
    return (
        <Section mx={3}>
            <Title
                description={`${patent.abstract}${approvalInfo}${trialInfo}`}
                link={{ label: patent.publication_number, url: patent.url }}
                title={unescape(patent.title)}
                variant="soft"
            />
            <Chips
                baseUrl={pathname}
                color="neutral"
                label="Assignees"
                items={patent.assignees}
            />
            <Chips
                baseUrl={pathname}
                color="neutral"
                label="Inventors"
                items={patent.inventors}
            />
            <Chips
                baseUrl={pathname}
                label="Attributes"
                items={patent.attributes}
            />
            <Chips
                baseUrl={pathname}
                label="Diseases"
                items={patent.diseases}
            />
            <Chips
                baseUrl={pathname}
                label="Compounds"
                items={patent.compounds}
            />
            <Chips
                baseUrl={pathname}
                label="Mechanisms"
                items={patent.mechanisms}
            />
            <Chips
                baseUrl={pathname}
                label="IPC Codes"
                items={patent.ipc_codes}
            />
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3}>
                <Grid xs={6} sm={2}>
                    <Metric
                        value={patent.suitability_score}
                        label="Suitability"
                        tooltip={patent.suitability_score_explanation || ''}
                    />
                </Grid>
                <Grid xs={6} sm={2}>
                    <Metric
                        value={patent.patent_years}
                        label="Patent Years Left"
                    />
                </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Section>
                <SimilarPatents patent={patent} />
            </Section>
        </Section>
    );
};

/**
 * Format name
 */
export const formatName = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (Array.isArray(value)) {
        return value.map((v) => title(v as string)).join(', ');
    }

    if (typeof value !== 'string') {
        throw new Error(`Expected string, got ${typeof value}`);
    }

    return title(value);
};

/**
 * Pretty-print number
 */
export const formatNumber = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

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
 * Format date as string
 */
export const formatDate = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (typeof value !== 'string') {
        return '';
    }

    return new Date(value as string).toLocaleDateString();
};

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

export const getScoresClassFunc =
    ({
        goodThreshold = 0.8,
        badThreshold = 0.2,
    }: {
        goodThreshold?: number;
        badThreshold?: number;
    }) =>
    (params: GridCellParams<Patent>) => {
        const { value } = params;

        if (typeof value !== 'number') {
            return '';
        }

        return clsx('biosym-app', {
            good: value > goodThreshold,
            bad: value < badThreshold,
        });
    };

export const getScoresClass = getScoresClassFunc({});
export const getTolerantScoresClass = getScoresClassFunc({
    goodThreshold: 0.42,
    badThreshold: 0.2,
});

export const getStyles = ({ palette }: { palette: Palette }) => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '& .biosym-app.good': {
        backgroundColor: palette.success[100],
        fontWeight: '600',
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '& .biosym-app.bad': {
        backgroundColor: palette.danger[100],
        fontWeight: '600',
    },
});
