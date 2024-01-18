'use client';

/* eslint-disable @typescript-eslint/naming-convention */

import NextLink from 'next/link';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import unescape from 'lodash/fp/unescape';

import { Chips } from '@/components/data/chip';
import { DataGrid } from '@/components/data/grid';
import { Metric } from '@/components/data/metric';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Patent } from '@/types';
import { getSelectableId } from '@/utils/string';
import { DEFAULT_PATHNAME } from '@/constants';

import { getPatentColumns } from './config';

import { getStyles } from '../styles';

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
                                href={`${DEFAULT_PATHNAME}?terms=${s}`}
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
export const PatentDetail = <T extends Patent>({
    pathname = DEFAULT_PATHNAME,
    row: patent,
}: {
    pathname?: string;
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title
            description={unescape(patent.abstract)}
            link={{ label: patent.id, url: patent.url }}
            title={unescape(patent.title)}
            variant="soft"
        />

        <Chips
            baseUrl={pathname}
            color="neutral"
            label="Assignees"
            items={(patent.assignees || []).map((a) => a.name)}
        />
        <Chips
            baseUrl={pathname}
            color="neutral"
            label="Inventors"
            items={(patent.inventors || []).map((a) => a.name)}
        />
        <Chips
            baseUrl={pathname}
            color="neutral"
            label="Interventions"
            items={(patent.interventions || []).map((a) => a.name)}
        />
        <Chips
            baseUrl={pathname}
            color="neutral"
            label="Indications"
            items={(patent.indications || []).map((a) => a.name)}
        />
        <Chips
            baseUrl={pathname}
            color="neutral"
            label="Attributes"
            items={patent.attributes}
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
                <Metric value={patent.patent_years} label="Patent Years Left" />
            </Grid>
            <Grid xs={6} sm={2}>
                <Metric
                    value={patent.availability_likelihood}
                    label="Likehood of Availability"
                    tooltip={patent.availability_explanation}
                />
            </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Section>
            <SimilarPatents patent={patent} />
        </Section>
    </Section>
);

/**
 * Detail content panel for patents grid
 */
export const PatentsDetail = ({
    patents,
}: {
    patents: Patent[];
}): JSX.Element => {
    const patentColumns = getPatentColumns();
    return (
        <Box sx={getStyles}>
            {patents.length > 0 && (
                <DataGrid
                    columns={patentColumns}
                    detailComponent={PatentDetail<Patent>}
                    rows={patents}
                    title="Patents"
                    variant="minimal"
                />
            )}
        </Box>
    );
};
