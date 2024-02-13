'use server';

import { Suspense } from 'react';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import ReactMarkdown from 'react-markdown';
import truncate from 'lodash/fp/truncate';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import { Section } from '@/components/layout/section';
import { FindBuyersParams } from '@/types';

import { findBuyers } from './actions';
import { FindBuyersControl } from './control';
import { BuyerGrid } from './client';

const FindBuyersInner = async ({
    description,
    useGptExpansion,
    k,
}: FindBuyersParams): Promise<JSX.Element> => {
    if (!description) {
        return (
            <Alert
                variant="soft"
                color="primary"
                startDecorator={<LightbulbIcon />}
            >
                <Typography level="h4">Please enter a description</Typography>
                <Typography level="body-md">
                    Enter a 2-3 paragraph description of the invention.
                </Typography>
            </Alert>
        );
    }

    try {
        const { description: expandedDescription, buyers } = await findBuyers({
            description,
            useGptExpansion,
            k,
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
        <Suspense
            fallback={<Skeleton height="80vh" sx={{ position: 'relative' }} />}
        >
            <FindBuyersInner {...args} />
        </Suspense>
    </FindBuyersControl>
);
