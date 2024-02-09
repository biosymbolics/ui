'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';

import { FIND_BUYERS_URL } from '@/constants';
import {
    FindBuyersParams,
    PotentialBuyerResponse,
    PotentialBuyerResponseSchema,
} from '@/types';
import { getQueryArgs } from '@/utils/patents';
import { doFetch } from '@/utils/actions';
import { formatKeys } from '@/utils/object';

/**
 * FindBuyers
 * @param args.description
 * @param args.useGptExpansion
 */
export const findBuyers = cache(
    async (args: FindBuyersParams): Promise<PotentialBuyerResponse> => {
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${FIND_BUYERS_URL}?${queryArgs}`,
            PotentialBuyerResponseSchema,
            (response) => formatKeys(response, camelCase)
        );
        return res;
    }
);
