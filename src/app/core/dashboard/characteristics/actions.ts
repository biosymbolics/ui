'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';

import { PATENT_CHARACTERISTIC_API_URL } from '@/constants';
import {
    HeadField,
    PatentSearchArgs,
    PatentCharacteristicsSchema,
    PatentCharacteristics as PatentCharacteristicsType,
} from '@/types/patents';
import { doFetch } from '@/utils/actions';
import { formatKeys } from '@/utils/object';
import { getQueryArgs } from '@/utils/patents';

export const fetchPatentCharacteristics = cache(
    async (
        args: PatentSearchArgs & { headField: HeadField }
    ): Promise<PatentCharacteristicsType> => {
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
