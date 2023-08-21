import { cache } from 'react';
import Box from '@mui/joy/Box';

import { PATENT_SUMMARY_API_URL } from '@/constants';
import { Bars } from '@/components/charts/html-bar';
import {
    PatentSearchArgs,
    PatentsSummaries,
    PatentsSummarySchema,
} from '@/types/patents';
import { getFetchOptions } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';

import { getStyles } from './client';

const fetchSummaries = cache(
    async (args: PatentSearchArgs): Promise<PatentsSummaries> => {
        if (args.terms.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await getFetchOptions(
            `${PATENT_SUMMARY_API_URL}?${queryArgs}`,
            PatentsSummarySchema
        );
        return res;
    }
);

export const Summary = async ({
    pathname = '/core/patents',
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    try {
        const summaries = await fetchSummaries(args);
        return (
            <Box sx={getStyles}>
                <Bars
                    specs={summaries.map(({ column, data }) => ({
                        data: data.map((s) => ({
                            label: s.term,
                            value: s.count,
                            url: `${pathname}?terms=${s.term}`,
                        })),
                        label: column,
                        maxLength: 15,
                    }))}
                />
            </Box>
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to fetch patents: {e.message}</div>;
        }
        return <div>Failed to fetch patents</div>;
    }
};
