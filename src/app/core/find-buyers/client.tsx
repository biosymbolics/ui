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
    getRenderChip,
    getRenderTypography,
    renderChip,
    renderPrimaryChip,
    renderSparkline,
} from '@/components/data/grid';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { PotentialBuyer, PotentialBuyers, RelevanceByYear } from '@/types';
import { DEFAULT_PATHNAME } from '@/constants';
import { Line } from '@/components/charts/line';

export const renderBuyerName = getRenderTypography(
    'title-md',
    (row: PotentialBuyer) => `${DEFAULT_PATHNAME}?terms=${row.name}`
);

export const renderTicker = getRenderChip({
    color: 'success',
    getUrl: (row: PotentialBuyer) =>
        row.symbol
            ? `https://finance.yahoo.com/quote/${row.symbol.toUpperCase()}`
            : '',
});

export const findBuyerColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        renderCell: renderBuyerName,
        width: 300,
    },
    {
        field: 'symbol',
        headerName: 'Ticker',
        renderCell: renderTicker,
        width: 125,
    },
    {
        field: 'count',
        headerName: 'Count',
        renderCell: renderChip,
        description: 'Number of similar patents',
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
        field: 'activity',
        headerName: 'Activity',
        width: 125,
        renderCell: renderSparkline,
    },
    {
        field: 'minAge',
        headerName: 'Min Age',
        description: 'Minimum patent age',
        width: 100,
    },
    {
        field: 'avgRelevanceScore',
        headerName: 'Avg Rel.',
        description: 'Average semantic similarity / relevance score',
        width: 125,
    },
];

const TitleList = ({
    ids,
    titles,
}: {
    ids: string[];
    titles: string[];
}): JSX.Element => (
    <>
        <Typography level="title-md">Patents</Typography>
        <List>
            {ids.map((id, i) => (
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
                        {titles[i]}
                    </Link>
                </ListItem>
            ))}
        </List>
    </>
);

const formatDetailData = (data: RelevanceByYear[]) =>
    data
        .map((d) => ({
            x: d.year,
            y: d.relevance,
        }))
        .sort((a, b) => a.x - b.x);

export const BuyerDetail = <T extends PotentialBuyer>({
    row: buyer,
}: {
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title title={buyer.name} variant="soft">
            <Line
                height={150}
                pathname={DEFAULT_PATHNAME}
                series={[
                    {
                        name: 'patents',
                        data: formatDetailData(buyer.relevanceByYear),
                    },
                ]}
                title="Activity Over Time"
                variant="minimal"
                width={800}
            />
        </Title>
        <TitleList ids={buyer.ids} titles={buyer.titles} />
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
