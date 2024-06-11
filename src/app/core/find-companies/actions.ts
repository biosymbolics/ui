'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';

import { FIND_COMPANIES_URL } from '@/constants';
import {
    FindCompaniesArgs,
    CompanyResponse,
    CompanyResponseSchema,
} from '@/types';
import { getQueryArgs } from '@/utils/api';
import { doFetch } from '@/utils/actions';
import { formatKeys } from '@/utils/object';

/**
 * Find companies API call
 * @param args - find companies parameters
 */
export const findCompanies = cache(
    async (args: FindCompaniesArgs): Promise<CompanyResponse> => {
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${FIND_COMPANIES_URL}?${queryArgs}`,
            CompanyResponseSchema,
            (response) => formatKeys(response, camelCase)
        );
        return res;
    }
);
