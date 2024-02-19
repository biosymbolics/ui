'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';

import { FIND_COMPANIES_URL } from '@/constants';
import {
    FindCompaniesParams,
    CompanyResponse,
    CompanyResponseSchema,
} from '@/types';
import { getQueryArgs } from '@/utils/api';
import { doFetch } from '@/utils/actions';
import { formatKeys } from '@/utils/object';

/**
 * FindCompanies
 */
export const findCompanies = cache(
    async (args: FindCompaniesParams): Promise<CompanyResponse> => {
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${FIND_COMPANIES_URL}?${queryArgs}`,
            CompanyResponseSchema,
            (response) => formatKeys(response, camelCase)
        );
        return res;
    }
);
