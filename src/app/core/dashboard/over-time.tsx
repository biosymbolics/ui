'use server';

import { cache } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import groupBy from 'lodash/fp/groupBy';
import isEmpty from 'lodash/fp/isEmpty';

import { DEFAULT_PATHNAME, PATENT_OVER_TIME_API_URL } from '@/constants';
import { Line } from '@/components/charts/line';
import { getStyles } from '@/components/composite/styles';
import { Section } from '@/components/layout/section';
import {
    PatentSearchArgs,
    PatentsSummaries,
    PatentsSummarySchema,
} from '@/types';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';
import { formatLabel } from '@/utils/string';

type OverTimeProps = PatentSearchArgs & {
    pathname?: string;
    maxSeries?: number;
    minDataLength?: number;
};

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
    maxSeries = 8,
    minDataLength = 3,
    ...args
}: OverTimeProps) => {
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
                                y: v1.count > 0 ? v1.count : 1, // TEMP HACK: looks weird when y is 0
                            }))
                            .sort((a, b) => a.x - b.x),
                    }))
                    .filter((v) => v.data.length >= minDataLength)
                    .slice(0, maxSeries)
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
