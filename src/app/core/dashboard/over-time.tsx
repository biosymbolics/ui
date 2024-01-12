'use server';

import { cache } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import groupBy from 'lodash/fp/groupBy';
import isEmpty from 'lodash/fp/isEmpty';

import { DEFAULT_PATHNAME, PATENT_OVER_TIME_API_URL } from '@/constants';
import { Line } from '@/components/charts/line';
import { Section } from '@/components/layout/section';
import {
    PatentSearchArgs,
    PatentsSummaries,
    PatentsSummarySchema,
} from '@/types/documents/patents';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';
import { formatLabel } from '@/utils/string';

import { getStyles } from '../../../components/composite/styles';

const fetchReports = cache(
    async (args: PatentSearchArgs): Promise<PatentsSummaries> => {
        if (args.terms?.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${PATENT_OVER_TIME_API_URL}?${queryArgs}`,
            PatentsSummarySchema
        );
        return res;
    }
);

export const OverTime = async ({
    pathname = DEFAULT_PATHNAME,
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    try {
        const reports = await fetchReports(args);

        const formattedReports = reports
            .map((r) => ({
                series: Object.entries(groupBy('x', r.data))
                    .map(([k, v]) => ({
                        name: k,
                        data: v
                            .map((v1) => ({
                                x: v1.y as number,
                                y: v1.count,
                            }))
                            .sort((a, b) => a.x - b.x),
                    }))
                    .filter((v) => v.data.length > 2)
                    .slice(0, 5)
                    .sort(),
                title: formatLabel(r.x),
            }))
            .filter((r) => r.series.some((s) => s.data.length > 0));

        if (isEmpty(formattedReports)) {
            return (
                <>
                    <Typography level="h3">Not enough data</Typography>
                    <Typography>
                        Not enough data to show trends over time.
                    </Typography>
                </>
            );
        }
        return (
            <Section sx={getStyles}>
                {formattedReports.map(({ series, title }) => (
                    <Line
                        height={300}
                        pathname={pathname}
                        series={series}
                        title={title}
                    />
                ))}
            </Section>
        );
    } catch (e) {
        return (
            <Box>
                Failed to fetch patents:{' '}
                {e instanceof Error ? e.message : JSON.stringify(e)}
            </Box>
        );
    }
};
