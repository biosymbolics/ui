'use server';

import { cache } from 'react';
import Box from '@mui/joy/Box';

import { DEFAULT_PATHNAME, SUMMARY_API_URL } from '@/constants';
import { Bars } from '@/components/charts/html-bar';
import { getStyles } from '@/components/composite/styles';
import {
    PatentSearchArgs,
    PatentsSummaries,
    PatentsSummarySchema,
} from '@/types';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/api';
import { SearchError } from '@/components/composite';

/**
 * Fetches patent summaries reports for search arguments
 */
const fetchSummaryReports = cache(
    async (args: PatentSearchArgs): Promise<PatentsSummaries> => {
        if (args.terms?.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${SUMMARY_API_URL}?${queryArgs}`,
            PatentsSummarySchema
        );
        return res;
    }
);

/**
 * Shows a summary of patents for a given set of terms
 */
export const Summary = async ({
    pathname = DEFAULT_PATHNAME,
    terms,
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    try {
        const reports = await fetchSummaryReports({ terms, ...args });
        return (
            <Box sx={getStyles}>
                <Bars
                    specs={reports.map(({ x, data }) => ({
                        data: data.map((s) => ({
                            label: s.x,
                            value: s.count,
                            url: `${pathname}?terms=${s.x}`, // ;${terms?.join(';')}
                        })),
                        label: x,
                        maxLength: 15,
                    }))}
                />
            </Box>
        );
    } catch (e) {
        return <SearchError error={e} />;
    }
};
