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
import { FindCompaniesParams } from '@/types';

import { findCompanies } from './actions';
import { FindCompaniesControl } from './control';
import { CompanyGrid } from './client';

const FindCompaniesInner = async ({
    description,
    useGptExpansion,
    k,
}: FindCompaniesParams): Promise<JSX.Element> => {
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
        const { description: expandedDescription, companies } =
            await findCompanies({
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
                    <CompanyGrid companies={companies} />
                </Section>
            </>
        );
    } catch (e) {
        return (
            <Box>
                Failed to fetch companies:{' '}
                {e instanceof Error ? e.message : JSON.stringify(e)}
            </Box>
        );
    }
};

export const FindCompanies = (args: FindCompaniesParams) => (
    <FindCompaniesControl {...args}>
        <Suspense
            fallback={<Skeleton height="80vh" sx={{ position: 'relative' }} />}
        >
            <FindCompaniesInner {...args} />
        </Suspense>
    </FindCompaniesControl>
);
