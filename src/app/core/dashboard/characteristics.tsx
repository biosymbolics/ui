'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import { PATENT_CHARACTERISTIC_API_URL } from '@/constants';
import { Heatmap } from '@/components/charts/heatmap';
import { Section } from '@/components/layout/section';
import {
    PatentCharacteristics as PatentCharacteristicsType,
    PatentSearchArgs,
    PatentCharacteristicsSchema,
} from '@/types/patents';
import { doFetch } from '@/utils/actions';
import { formatKeys } from '@/utils/object';
import { getQueryArgs } from '@/utils/patents';

const fetchPatentCharacteristics = cache(
    async (args: PatentSearchArgs): Promise<PatentCharacteristicsType> => {
        if (args.terms?.length === 0) {
            return {} as PatentCharacteristicsType;
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${PATENT_CHARACTERISTIC_API_URL}?${queryArgs}`,
            PatentCharacteristicsSchema,
            (response) => formatKeys(response, camelCase)
        );

        return res;
    }
);

export const PatentCharacteristics = async ({
    pathname = '/core/dashboard',
    terms,
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    try {
        const data = await fetchPatentCharacteristics({ terms, ...args });
        return (
            <>
                <Section>
                    <Typography level="h3">Patent Characteristics</Typography>
                    <Typography gutterBottom level="body-md">
                        UMLS concepts directly or indirectly associated with
                        patents for search{' '}
                        <b>{(terms || []).map((t) => `'${t}'`).join(', ')}</b>
                    </Typography>
                </Section>
                <Section>
                    <Heatmap data={data} pathname={pathname} />
                </Section>
            </>
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
