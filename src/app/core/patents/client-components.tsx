'use client';

import { ReactNode } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

import { Patent } from '@/types/patents';
import { Chip } from '@/components/data/chip';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Metric } from '@/components/data/metric';

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
    </Section>
);
