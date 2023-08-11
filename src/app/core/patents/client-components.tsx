'use client';

import { ReactNode } from 'react';
import NextLink from 'next/link';
import { ColorPaletteProp } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { GridValueFormatterParams } from '@mui/x-data-grid/models/params/gridCellParams';

import { Chip } from '@/components/data/chip';
import { Metric } from '@/components/data/metric';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Patent } from '@/types/patents';

const getChips = (
    label: string,
    items: string[] | null,
    color: ColorPaletteProp = 'primary'
): ReactNode => {
    const chips = items
        ? items.map((c) => (
              <Chip key={c} color={color} sx={{ mr: 0.5, mt: 0.5 }}>
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
}): JSX.Element => (
    <Section mx={3}>
        <Title
            title={patent.title}
            description={patent.abstract}
            link={{ label: patent.publication_number, url: patent.url }}
        />
        {getChips('Assignees', patent.assignees, 'neutral')}
        {getChips('Inventors', patent.inventors, 'neutral')}
        {getChips('Diseases', patent.diseases)}
        {getChips('Compounds', patent.compounds)}
        {getChips('Mechanisms', patent.mechanisms)}
        {getChips('Genes', patent.genes)}
        {getChips('IPC Codes', patent.ipc_codes)}
        <Grid container spacing={3}>
            <Grid xs={6} sm={2}>
                <Metric value={patent.score} label="Suitability" />
            </Grid>
            <Grid xs={6} sm={2}>
                <Metric value={patent.search_rank} label="Relevancy" />
            </Grid>
            <Grid xs={6} sm={2}>
                <Metric value={patent.patent_years} label="Patent Years Left" />
            </Grid>
        </Grid>
        <Section>
            <SimilarPatents patent={patent} />
        </Section>
    </Section>
);

export const formatNumber = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (typeof value !== 'number') {
        throw new Error(`Expected number, got ${typeof value}`);
    }

    return (value as number).toPrecision(2);
};

export const formatNumberArray = <T extends Record<string, unknown>>(
    params: GridValueFormatterParams<T>
): string => {
    const { value } = params;

    if (!Array.isArray(value)) {
        console.warn('Expected array, got', typeof value);

        return 'nope';
    }

    return (value as string[]).join(', ');
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
