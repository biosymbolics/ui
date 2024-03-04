'use server';

import { Suspense } from 'react';
import Alert from '@mui/joy/Alert';
import Grid from '@mui/joy/Grid';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import isEmpty from 'lodash/fp/isEmpty';

import { SearchError } from '@/components/composite';
import { Metric } from '@/components/data/metric';
import { Section } from '@/components/layout/section';
import { FindCompaniesParams } from '@/types';

import { findCompanies } from './actions';
import { FindCompaniesControl } from './control';
import { CompanyGrid } from './client';

const FindCompaniesInner = async ({
    description,
    k,
}: FindCompaniesParams): Promise<JSX.Element> => {
    if (isEmpty(description)) {
        return (
            <Alert
                variant="soft"
                color="primary"
                startDecorator={<LightbulbIcon />}
            >
                <Typography level="h4">Please enter a description</Typography>
                <Typography level="body-md">
                    Enter a 2-3 paragraph description
                </Typography>
            </Alert>
        );
    }

    try {
        const {
            companies: foundCompanies,
            competitionScore,
            exitScore,
        } = await findCompanies({
            description,
            k,
        });

        // TODO: expandable text component
        return (
            <Section variant="l2">
                <Grid
                    container
                    justifyContent="flex-end"
                    spacing={3}
                    width="100%"
                >
                    <Grid xs={6} sm={3} md={2}>
                        <Metric
                            color="success"
                            value={exitScore}
                            label="Exit Score"
                        />
                    </Grid>
                    <Grid xs={6} sm={3} md={2}>
                        <Metric
                            color="danger"
                            value={competitionScore}
                            label="Competition Score"
                        />
                    </Grid>
                </Grid>

                <CompanyGrid companies={foundCompanies} />
            </Section>
        );
    } catch (e) {
        return <SearchError error={e} />;
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
