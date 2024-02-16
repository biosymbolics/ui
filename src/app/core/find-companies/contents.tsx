'use server';

import { Suspense } from 'react';
import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import { Section } from '@/components/layout/section';
import { FindCompaniesParams } from '@/types';

import { findCompanies } from './actions';
import { FindCompaniesControl } from './control';
import { CompanyGrid } from './client';

const FindCompaniesInner = async ({
    companies,
    description,
    k,
}: FindCompaniesParams): Promise<JSX.Element> => {
    if (!description) {
        return (
            <Alert
                variant="soft"
                color="primary"
                startDecorator={<LightbulbIcon />}
            >
                <Typography level="h4">
                    Please enter a description or select companies
                </Typography>
                <Typography level="body-md">
                    Enter a 2-3 paragraph description, or select similar
                    companies
                </Typography>
            </Alert>
        );
    }

    try {
        const { companies: foundCompanies } = await findCompanies({
            companies,
            description,
            k,
        });

        // TODO: expandable text component
        return (
            <Section variant="l2">
                <CompanyGrid companies={foundCompanies} />
            </Section>
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
