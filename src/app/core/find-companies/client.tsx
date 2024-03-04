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
    renderBoolean,
    renderChip,
    renderPrimaryChip,
    renderSparkline,
} from '@/components/data/grid';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Company } from '@/types';
import { DEFAULT_PATHNAME } from '@/constants';
import { Line } from '@/components/charts/line';
import { getSelectableId } from '@/utils/string';

export const renderCompanyName = getRenderTypography(
    'title-md',
    (row: Company) => `${DEFAULT_PATHNAME}?terms=${row.name}`
);

export const renderTicker = getRenderChip({
    color: 'primary',
    getUrl: (row: Company) =>
        row.symbol
            ? `https://finance.yahoo.com/quote/${row.symbol.toUpperCase()}`
            : '',
});

export const findCompanyColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        renderCell: renderCompanyName,
        width: 300,
    },
    {
        field: 'symbol',
        headerName: 'Ticker',
        renderCell: renderTicker,
        width: 100,
    },
    {
        field: 'count',
        headerName: 'Count',
        renderCell: renderChip,
        description: 'Number of similar patents',
        width: 85,
    },
    {
        field: 'score',
        headerName: 'Score',
        renderCell: renderPrimaryChip,
        description: 'Overall relevancy score with recency weighting',
        width: 85,
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
        width: 85,
    },
    {
        field: 'relevance',
        headerName: 'Relevance',
        description: 'Average semantic similarity / relevance score',
        width: 90,
    },
    {
        field: 'wheelhouseScore',
        headerName: 'Wheelhouse',
        description:
            'How similar is this set of patents to the overall company portfolio?',
        width: 100,
    },
    {
        field: 'isAcquirer',
        headerName: 'Acquires?',
        renderCell: renderBoolean,
        width: 100,
    },
    {
        field: 'isCompetition',
        headerName: 'Competition?',
        renderCell: renderBoolean,
        width: 100,
    },
];

const TitleList = ({
    urls,
}: {
    urls: { title: string; url: string }[];
}): JSX.Element => (
    <>
        <Typography level="title-md">Patents and Trials</Typography>
        <List>
            {urls.map(({ title, url }) => (
                <ListItem key={getSelectableId(url)}>
                    <ListItemDecorator>·</ListItemDecorator>

                    <Link component={NextLink} href={url} target="_blank">
                        {title}
                    </Link>
                </ListItem>
            ))}
        </List>
    </>
);

export const CompanyDetail = <T extends Company>({
    row: company,
}: {
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title title={company.name} variant="soft">
            <Line
                height={150}
                pathname={DEFAULT_PATHNAME}
                series={Object.entries(company.countByYear).map(
                    ([type, report]) => ({
                        name: type,
                        data: report
                            .map((d) => ({
                                x: d.year,
                                y: d.count,
                            }))
                            .sort((a, b) => a.x - b.x),
                    })
                )}
                title="Activity Over Time"
                variant="minimal"
                width={1000}
            />
        </Title>
        <TitleList urls={company.urls} />
    </Section>
);

export const CompanyGrid = ({ companies }: { companies: Company[] }) => (
    <Box sx={getStyles}>
        <DataGrid<Company>
            columns={findCompanyColumns}
            detailComponent={CompanyDetail<Company>}
            rows={companies}
            title="Companies"
        />
    </Box>
);
