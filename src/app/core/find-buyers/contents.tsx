'use server';

import { Suspense } from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import ReactMarkdown from 'react-markdown';
import truncate from 'lodash/fp/truncate';

import { Section } from '@/components/layout/section';
import { FindBuyersParams } from '@/types';

import { findBuyers } from './actions';
import { FindBuyersControl } from './control';
import { BuyerGrid } from './client';

const FindBuyersInner = async ({
    description,
    useGptExpansion,
}: FindBuyersParams): Promise<JSX.Element> => {
    if (!description) {
        return <Box>Please enter a description</Box>;
    }

    try {
        const { description: expandedDescription, buyers } = await findBuyers({
            description,
            useGptExpansion: useGptExpansion ?? true,
        });

        const hasExpandedDescription =
            expandedDescription && expandedDescription !== description;

        // TODO: expandable text component
        return (
            <>
                {hasExpandedDescription && (
                    <Section variant="l2">
                        <Typography level="h3">Expanded Description</Typography>
                        <ReactMarkdown>
                            {truncate(
                                {
                                    length: 550,
                                },
                                expandedDescription || '(none)'
                            )}
                        </ReactMarkdown>
                    </Section>
                )}
                <Section variant="l2">
                    <BuyerGrid buyers={buyers} />
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
