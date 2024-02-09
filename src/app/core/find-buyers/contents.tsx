'use server';

import { Suspense } from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import ReactMarkdown from 'react-markdown';

import { getStyles } from '@/components/composite/styles';
import {
    DataGrid,
    GridColDef,
    renderChip,
    renderChips,
    renderMainTypography,
} from '@/components/data/grid';
import { Section } from '@/components/layout/section';
import { FindBuyersParams, PotentialBuyer } from '@/types';

import { findBuyers } from './actions';
import { FindBuyersControl } from './control';

export const getFindBuyerColumns = (): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Name',
        renderCell: renderMainTypography,
        width: 200,
    },
    {
        field: 'ids',
        headerName: 'Ids',
        renderCell: renderChips,
        width: 450,
    },
    {
        field: 'count',
        headerName: 'Count',
        renderCell: renderChip,
        width: 100,
    },
    {
        field: 'score',
        headerName: 'Score',
        width: 100,
    },
];

const FindBuyersInner = async ({
    description,
    useGptExpansion,
}: FindBuyersParams) => {
    if (!description) {
        return <Box>Please enter a description</Box>;
    }

    try {
        const findBuyerColumns = getFindBuyerColumns();
        const { description: expandedDescription, buyers } = await findBuyers({
            description,
            useGptExpansion: useGptExpansion ?? true,
        });

        const hasExpandedDescription =
            expandedDescription && expandedDescription !== description;

        return (
            <>
                {hasExpandedDescription && (
                    <Section variant="l2">
                        <Typography level="h3">Expanded Description</Typography>
                        <ReactMarkdown>
                            {expandedDescription || '(none)'}
                        </ReactMarkdown>
                    </Section>
                )}
                <Section variant="l2">
                    <Box sx={getStyles}>
                        <DataGrid<PotentialBuyer>
                            columns={findBuyerColumns}
                            rows={buyers}
                            title="Potential Buyers"
                        />
                    </Box>
                </Section>
            </>
        );
    } catch (e) {
        return (
            <Box>
                Failed to fetch buyers:{' '}
                {e instanceof Error ? e.message : JSON.stringify(e)}
            </Box>
        );
    }
};

export const FindBuyers = (args: FindBuyersParams) => (
    <FindBuyersControl {...args}>
        <Suspense fallback={<Skeleton height="80vh" />}>
            <FindBuyersInner {...args} />
        </Suspense>
    </FindBuyersControl>
);
