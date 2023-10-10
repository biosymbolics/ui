'use server';

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
import { Heatmap } from '@/components/charts/heatmap';

import { getStyles } from './client';

const fetchSummaries = cache(
    async (args: PatentSearchArgs): Promise<PatentsSummaries> => {
        if (args.terms?.length === 0) {
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
    terms,
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    try {
        const summaries = await fetchSummaries({ terms, ...args });
        return (
            <Box sx={getStyles}>
                <Bars
                    specs={summaries.map(({ x, data }) => ({
                        data: data.map((s) => ({
                            label: s.x,
                            value: s.count,
                            url: `${pathname}?terms=${s.x};${terms?.join(';')}`,
                        })),
                        label: x,
                        maxLength: 15,
                    }))}
                />
                <Heatmap />
            </Box>
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
