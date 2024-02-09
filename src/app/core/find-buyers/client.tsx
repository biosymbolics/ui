'use client';

import NextLink from 'next/link';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

import { getStyles } from '@/components/composite/styles';
import {
    DataGrid,
    GridColDef,
    getRenderTypography,
    renderChip,
    renderPrimaryChip,
} from '@/components/data/grid';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { PotentialBuyer, PotentialBuyers } from '@/types';
import { getSelectableId } from '@/utils/string';
import { DEFAULT_PATHNAME } from '@/constants';

export const renderBuyerName = getRenderTypography(
    'title-md',
    (row: PotentialBuyer) => `${DEFAULT_PATHNAME}?terms=${row.name}`
);

export const findBuyerColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        renderCell: renderBuyerName,
        width: 300,
    },
    {
        field: 'count',
        headerName: 'Count',
        renderCell: renderChip,
        description: 'Number of sufficiently similar patents',
        width: 100,
    },
    {
        field: 'score',
        headerName: 'Score',
        renderCell: renderPrimaryChip,
        description: 'Overall relevancy score with recency weighting',
        width: 100,
    },
    {
        field: 'minAge',
        headerName: 'Min Age',
        description: 'Minimum patent age',
        width: 100,
    },
    {
        field: 'avgAge',
        headerName: 'Avg Age',
        description: 'Average patent age',
        width: 100,
    },
    {
        field: 'avgRelevanceScore',
        headerName: 'Avg Rel.',
        description: 'Average semantic similarity / relevance score',
        width: 125,
    },
    {
        field: 'maxRelevanceScore',
        headerName: 'Max Rel.',
        description: 'Max semantic similarity / relevance score',
        width: 125,
    },
];

const PatentList = ({ patentIds }: { patentIds: string[] }): JSX.Element => (
    <>
        <Typography level="title-md">Patent Ids</Typography>
        <List>
            {patentIds.map((id) => (
                <ListItem key={id}>
                    <ListItemDecorator>·</ListItemDecorator>
                    <Link
                        component={NextLink}
                        href={`https://patents.google.com/patent/${id.replaceAll(
                            '-',
                            ''
                        )}`}
                        target="_blank"
                    >
                        {id}
                    </Link>
                </ListItem>
            ))}
        </List>
    </>
);

const TitleList = ({ titles }: { titles: string[] }): JSX.Element => (
    <>
        <Typography level="title-md">Titles</Typography>
        <List>
            {titles.map((title) => (
                <ListItem key={getSelectableId(title)}>
                    <ListItemDecorator>·</ListItemDecorator>
                    {title}
                </ListItem>
            ))}
        </List>
    </>
);

export const BuyerDetail = <T extends PotentialBuyer>({
    row: buyer,
}: {
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title title={buyer.name} variant="soft" />
        <TitleList titles={buyer.titles} />
        <PatentList patentIds={buyer.ids} />
    </Section>
);

export const BuyerGrid = ({ buyers }: { buyers: PotentialBuyers }) => (
    <Box sx={getStyles}>
        <DataGrid<PotentialBuyer>
            columns={findBuyerColumns}
            detailComponent={BuyerDetail<PotentialBuyer>}
            rows={buyers}
            title="Potential Buyers"
        />
    </Box>
);
