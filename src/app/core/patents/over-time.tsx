'use server';

import { cache } from 'react';
import Box from '@mui/joy/Box';

import { PATENT_OVER_TIME_API_URL } from '@/constants';
import { Line } from '@/components/charts/line';
import {
    PatentSearchArgs,
    PatentsSummaries,
    PatentsSummarySchema,
} from '@/types/patents';
import { getFetchOptions } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';

import { getStyles } from './client';

const fetchReports = cache(
    async (args: PatentSearchArgs): Promise<PatentsSummaries> => {
        if (args.terms.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await getFetchOptions(
            `${PATENT_OVER_TIME_API_URL}?${queryArgs}`,
            PatentsSummarySchema
        );
        return res;
    }
);

export const OverTime = async ({
    pathname = '/core/patents',
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    try {
        const reports = await fetchReports(args);
        return (
            <Box sx={getStyles}>
                {pathname}
                {reports.map((report) => (
                    <Line series={report.data.map((d) => d.count)} />
                ))}
            </Box>
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch patents: {e.message}</div>;
        }
        return <div>Failed to fetch patents</div>;
    }
};
