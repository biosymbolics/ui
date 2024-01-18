'use server';

import { cache } from 'react';
import { z } from 'zod';

import {
    ENTITY_SEARCH_API_URL,
    PATENT_AUTOCOMPLETE_API_URL,
    PATENT_SEARCH_API_URL,
    TERM_DESCRIPTION_API_URL,
    TRIAL_SEARCH_API_URL,
} from '@/constants';
import { Option } from '@/types/select';
import {
    AssetResponse,
    AssetResponseSchema,
    AssetSearchArgs,
} from '@/types/entities';
import {
    PatentResponse,
    PatentResponseSchema,
    PatentSearchArgs,
    RegulatoryApprovalResponse,
    RegulatoryApprovalResponseSchema,
    RegulatoryApprovalSearchArgs,
    TrialResponse,
    TrialResponseSchema,
    TrialSearchArgs,
} from '@/types/documents';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/patents';

const AutocompleteResponse = z.array(
    z.object({
        id: z.string(),
        label: z.string(),
    })
);

/**
 * Autocomplete terms or ids from the API.
 * @param str search string
 * @returns options promise
 */
export const fetchAutocompletions = async (
    str: string,
    mode: 'id' | 'term' = 'term'
): Promise<Option[]> => {
    'use server';

    const res = await doFetch(
        `${PATENT_AUTOCOMPLETE_API_URL}?mode=${mode}&string=${str}`,
        AutocompleteResponse
    );
    return res;
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
 * Fetch entities from the API. Cached.
 * @param args
 * @returns patents promise
 */
export const fetchAssets = cache(
    async (args: AssetSearchArgs): Promise<AssetResponse> => {
        if (args.terms?.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${ENTITY_SEARCH_API_URL}?${queryArgs}`,
            AssetResponseSchema
        );

        return res;
    }
);

/**
 * Fetch approvals from the API. Cached.
 * @param args
 * @returns approvals promise
 */
export const fetchApprovals = cache(
    async (
        args: RegulatoryApprovalSearchArgs
    ): Promise<RegulatoryApprovalResponse> => {
        if (args.terms?.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${PATENT_SEARCH_API_URL}?${queryArgs}`,
            RegulatoryApprovalResponseSchema
        );

        return res;
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

/**
 * Fetch patents from the API. Cached.
 * @param args
 * @returns patents promise
 */
export const fetchTrials = cache(
    async (args: TrialSearchArgs): Promise<TrialResponse> => {
        if (args.terms?.length === 0) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${TRIAL_SEARCH_API_URL}?${queryArgs}`,
            TrialResponseSchema
        );

        return res;
    }
);
