'use server';

import { cache } from 'react';
import Typography from '@mui/joy/Typography';
import groupBy from 'lodash/fp/groupBy';
import isEmpty from 'lodash/fp/isEmpty';

import { DEFAULT_PATHNAME, OVER_TIME_API_URL } from '@/constants';
import { Line } from '@/components/charts/line';
import { SearchError } from '@/components/composite';
import { getStyles } from '@/components/composite/styles';
import { Section } from '@/components/layout/section';
import {
    PatentSearchArgs,
    PatentsSummaries,
    PatentsSummarySchema,
} from '@/types';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/api';
import { formatLabel } from '@/utils/string';

type OverTimeProps = PatentSearchArgs & {
    pathname?: string;
    maxSeries?: number;
    minDataLength?: number;
};

/**
 * Fetches over-time reports
 */
const fetchOverTimeReports = cache(
    async (args: PatentSearchArgs): Promise<PatentsSummaries> => {
        if (args.terms?.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${OVER_TIME_API_URL}?${queryArgs}`,
            PatentsSummarySchema
        );
        return res;
    }
);

/**
 * Shows trends over time for a given set of terms
 */
export const OverTime = async ({
    pathname = DEFAULT_PATHNAME,
    maxSeries = 8, // server-side limit too (10 by default)
    minDataLength = 3,
    ...args
}: OverTimeProps) => {
    try {
        const reports = await fetchOverTimeReports(args);

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
        return <SearchError error={e} />;
    }
};
