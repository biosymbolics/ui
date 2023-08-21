'use client';

import { ReactNode } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ColorPaletteProp, Palette } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import {
    GridCellParams,
    GridValueFormatterParams,
} from '@mui/x-data-grid/models/params/gridCellParams';
import clsx from 'clsx';

import { Chip } from '@/components/data/chip';
import { Metric } from '@/components/data/metric';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Patent } from '@/types/patents';
import { getSelectableId } from '@/utils/string';

const getChips = (
    label: string,
    items: string[] | null,
    color: ColorPaletteProp = 'primary',
    baseUrl: string | null = null
): ReactNode => {
    const chips = items
        ? items.map((c) => (
              <Chip
                  key={getSelectableId(c)}
                  color={color}
                  href={baseUrl ? `${baseUrl}?terms=${c}` : undefined}
                  sx={{ mr: 0.5, mt: 0.5 }}
              >
                  {c}
              </Chip>
          ))
        : [];
    return (
        <Section>
            <Typography level="title-md">{label}</Typography>
            {chips.length > 0 ? chips : 'None'}
        </Section>
    );
};

const SimilarPatents = ({ patent }: { patent: Patent }): JSX.Element => (
    <>
        <Typography level="title-md">Similar Patents</Typography>
        <List>
            {patent.similar.map((s) => (
                <ListItem>
                    <ListItemDecorator>·</ListItemDecorator>
                    <Link
                        component={NextLink}
                        href={patent.url}
                        target="_blank"
                    >
                        {s}
                    </Link>
                </ListItem>
            ))}
        </List>
    </>
);

export const DetailContent = <T extends Patent>({
    row: patent,
}: {
    row: T;
}): JSX.Element => {
    const pathname = usePathname();
    return (
        <Section mx={3}>
            <Title
                title={patent.title}
                description={patent.abstract}
                link={{ label: patent.publication_number, url: patent.url }}
            />
            {getChips('Assignees', patent.assignees, 'neutral', pathname)}
            {getChips('Inventors', patent.inventors, 'neutral', pathname)}
            {getChips('Diseases', patent.diseases, 'primary', pathname)}
            {getChips('Compounds', patent.compounds, 'primary', pathname)}
            {getChips('Mechanisms', patent.mechanisms, 'primary', pathname)}
            {getChips('Genes', patent.genes, 'primary', pathname)}
            {getChips('IPC Codes', patent.ipc_codes)}
            <Grid container spacing={3}>
                <Grid xs={6} sm={2}>
                    <Metric value={patent.score} label="Suitability" />
                </Grid>
                <Grid xs={6} sm={2}>
                    <Metric value={patent.search_rank} label="Relevancy" />
                </Grid>
                <Grid xs={6} sm={2}>
                    <Metric
                        value={patent.patent_years}
                        label="Patent Years Left"
                    />
                </Grid>
            </Grid>
            <Section>
                <SimilarPatents patent={patent} />
            </Section>
        </Section>
    );
};

export const formatNumber = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (typeof value !== 'number') {
        throw new Error(`Expected number, got ${typeof value}`);
    }

    return (value as number).toPrecision(2);
};

export const formatDate = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (typeof value !== 'string') {
        return '';
    }

    return new Date(value as string).toLocaleDateString();
};

// export const renderCell: (params: GridRenderCellParams<Date>) => (
//     <strong>
//       {params.value.getFullYear()}
//       <Button
//         variant="contained"
//         size="small"
//         style={{ marginLeft: 16 }}
//         tabIndex={params.hasFocus ? 0 : -1}
//       >
//         Open
//       </Button>
//     </strong>
//   ),

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
