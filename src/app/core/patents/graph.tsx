'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';
import Box from '@mui/joy/Box';

import { PATENT_GRAPH_API_URL } from '@/constants';
import { Graph } from '@/components/charts/graph';
import {
    PatentGraph as PatentGraphType,
    PatentSearchArgs,
    PatentGraphSchema,
} from '@/types/patents';
import { doFetch } from '@/utils/actions';
import { formatKeys } from '@/utils/object';
import { getQueryArgs } from '@/utils/patents';

const fetchGraph = cache(
    async (args: PatentSearchArgs): Promise<PatentGraphType> => {
        if (args.terms?.length === 0) {
            return {} as PatentGraphType;
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${PATENT_GRAPH_API_URL}?${queryArgs}`,
            PatentGraphSchema,
            (response) => formatKeys(response, camelCase)
        );
        return res;
    }
);

export const PatentGraph = async ({
    pathname = '/core/patents',
    terms,
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    try {
        const graph = await fetchGraph({ terms, ...args });
        return <Graph data={graph} pathname={pathname} />;
    } catch (e) {
        return (
            <Box>
                Failed to fetch patents:{' '}
                {e instanceof Error ? e.message : JSON.stringify(e)}
            </Box>
        );
    }
};
