'use server';

import { cache } from 'react';
import Box from '@mui/joy/Box';

import { DEFAULT_PATHNAME, PATENT_SUMMARY_API_URL } from '@/constants';
import { Bars } from '@/components/charts/html-bar';
import {
    PatentSearchArgs,
    PatentsSummaries,
    PatentsSummarySchema,
} from '@/types/patents';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';

import { getStyles } from '../../../components/composite/styles';

const fetchSummaries = cache(
    async (args: PatentSearchArgs): Promise<PatentsSummaries> => {
        if (args.terms?.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${PATENT_SUMMARY_API_URL}?${queryArgs}`,
            PatentsSummarySchema
        );
        return res;
    }
);

// const fetchTopicAnalysis = cache(
//     async (args: PatentSearchArgs): Promise<PatentsTopics> => {
//         if (args.terms?.length === 0) {
//             return [];
//         }
//         const queryArgs = getQueryArgs(args, true);
//         const res = await doFetch(
//             `${PATENT_TOPIC_API_URL}?${queryArgs}`,
//             PatentsTopicSchema
//         );
//         return res;
//     }
// );

export const Summary = async ({
    pathname = DEFAULT_PATHNAME,
    terms,
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    try {
        const summaries = await fetchSummaries({ terms, ...args });
        // const topics = await fetchTopicAnalysis({ terms, ...args });
        return (
            <Box sx={getStyles}>
                <Bars
                    specs={summaries.map(({ x, data }) => ({
                        data: data.map((s) => ({
                            label: s.x,
                            value: s.count,
                            url: `${pathname}?terms=${s.x}`, // ;${terms?.join(';')}
                        })),
                        label: x,
                        maxLength: 15,
                    }))}
                />
                {/* <Scatter
                    pathname={pathname}
                    series={{ data: topics.map((t) => ({ x: t.x, y: t.y })) }}
                /> */}
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
