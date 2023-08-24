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
            {patent.similar.map((s, index) => (
                <ListItem key={`${getSelectableId(s)}-${index}`}>
                    <ListItemDecorator>·</ListItemDecorator>
                    <Link component={NextLink} href={patent.url}>
                        {s}
                    </Link>
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
    return (
        <Section mx={3}>
            <Title
                description={`${patent.abstract}${approvalInfo}`}
                link={{ label: patent.publication_number, url: patent.url }}
                title={patent.title}
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
                    <Metric value={patent.score} label="Suitability" />
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

export const getScoresClass = (params: GridCellParams<Patent>) => {
    const { value } = params;

    if (typeof value !== 'number') {
        return '';
    }

    return clsx('biosym-app', {
        good: value > 0.8,
        bad: value < 0.2,
    });
};

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
