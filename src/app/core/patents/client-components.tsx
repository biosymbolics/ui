'use client';

import { ReactNode } from 'react';
import NextLink from 'next/link';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import { Patent } from '@/types/patents';
import { Chip } from '@/components/data/chip';
import { Section } from '@/components/layout/section';

const getChips = (label: string, items: string[] | null): ReactNode => {
    const chips = items
        ? items.map((c) => (
              <Chip key={c} color="primary" sx={{ mr: 0.5 }}>
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
        <Typography level="title-lg">{patent.title}</Typography>
        <Typography level="body-md">
            {patent.abstract || 'No abstract available'}
        </Typography>
        <Link component={NextLink} href={patent.url} target="_blank">
            {patent.publication_number}
        </Link>
        {getChips('Assignees', patent.assignees)}
        {getChips('Inventors', patent.inventors)}
        {getChips('Diseases', patent.diseases)}
        {getChips('Compounds', patent.compounds)}
        {getChips('Mechanisms', patent.mechanisms)}
        {getChips('Genes', patent.genes)}
    </Section>
);
