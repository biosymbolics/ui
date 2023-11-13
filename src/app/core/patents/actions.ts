'use server';

import { cache } from 'react';
import { z } from 'zod';

import {
    PATENT_SEARCH_API_URL,
    PATENT_TERM_API_URL,
    TERM_DESCRIPTION_API_URL,
} from '@/constants';
import { Option } from '@/types/select';
import {
    PatentResponse,
    PatentResponseSchema,
    PatentSearchArgs,
} from '@/types/patents';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';

const AutocompleteResponse = z.object({
    terms: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
        })
    ),
});

/**
 * Fetch autcomplete options from the API
 * @param term
 * @returns options promise
 */
export const fetchOptions = async (term: string): Promise<Option[]> => {
    'use server';

    const res = await doFetch(
        `${PATENT_TERM_API_URL}?term=${term}`,
        AutocompleteResponse
    );
    return res.terms;
};

/**
 * Fetch term(s) description from the API. Cached.
 * @param terms
 */
export const fetchDescription = cache(
    async (terms: string[]): Promise<string> => {
        if (terms.length === 0) {
            return '';
        }
        const res = await fetch(
            `${TERM_DESCRIPTION_API_URL}?terms=${terms.join(',')}`
        );
        if (!res.ok) {
            throw new Error(
                `Failed to fetch description: ${res.status} ${res.statusText}`
            );
        }
        return res.text();
    }
);

/**
 * Fetch patents from the API. Cached.
 * @param args
 * @returns patents promise
 */
export const fetchPatents = cache(
    async (args: PatentSearchArgs): Promise<PatentResponse> => {
        if (args.terms?.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${PATENT_SEARCH_API_URL}?${queryArgs}`,
            PatentResponseSchema
        );

        return res;
    }
);
