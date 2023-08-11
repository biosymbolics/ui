'use server';

import { cache } from 'react';
import { z } from 'zod';

import {
    PATENT_SEARCH_API_URL,
    PATENT_TERM_API_URL,
    TERM_DESCRIPTION_API_URL,
} from '@/constants';
import { Option } from '@/types/select';
import { Patent, PatentResponse } from '@/types/patents';
import { getFetchOptions } from '@/utils/actions';

const AutocompleteResponse = z.object({
    terms: z.array(
        z.object({
            id: z.string(),
            label: z.string(),
        })
    ),
});

export const fetchOptions = async (term: string): Promise<Option[]> => {
    'use server';

    const res = await getFetchOptions(
        `${PATENT_TERM_API_URL}?term=${term}`,
        AutocompleteResponse
    );
    return res.terms;
};

export const getDescription = cache(
    async (terms: string[]): Promise<string> => {
        if (terms.length === 0) {
            return '';
        }
        const res = await fetch(
            `${TERM_DESCRIPTION_API_URL}?terms=${terms.join(',')}`
        );
        if (!res.ok) {
            throw new Error(
                `Failed to fetch patents: ${res.status} ${res.statusText}`
            );
        }
        return res.text();
    }
);

export const fetchPatents = cache(
    async (terms: string[]): Promise<Patent[]> => {
        if (terms.length === 0) {
            return [];
        }
        const res = await getFetchOptions(
            `${PATENT_SEARCH_API_URL}?terms=${terms.join(',')}`,
            PatentResponse
        );
        return res;
    }
);
