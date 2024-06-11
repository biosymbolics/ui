'use server';

import { cache } from 'react';
import { z } from 'zod';
import isEmpty from 'lodash/fp/isEmpty';

import {
    ENTITY_SEARCH_API_URL,
    AUTOCOMPLETE_API_URL,
    PATENT_SEARCH_API_URL,
    REGULATORY_APPROVAL_SEARCH_API_URL,
    TERM_DESCRIPTION_API_URL,
    TRIAL_SEARCH_API_URL,
} from '@/constants';
import { Option } from '@/types/select';
import {
    EntityResponse,
    EntityResponseSchema,
    EntitySearchArgs,
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
} from '@/types';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/api';

const AutocompleteResponse = z.array(
    z.object({
        id: z.string(),
        label: z.string(),
    })
);

type AutocompleteTypes = 'entity' | 'owner';

/**
 * Autocomplete terms or ids from the API.
 * @param str search string
 * @returns autocompletions promise
 */
export const fetchAutocompletions = async (
    str: string,
    types: AutocompleteTypes[] = ['entity', 'owner']
): Promise<Option[]> => {
    'use server';

    const res = await doFetch(
        `${AUTOCOMPLETE_API_URL}?types=${types.join(';')}&string=${str}`,
        AutocompleteResponse
    );
    return res;
};

/**
 * Fetch term(s) description from the API. Cached.
 * @param terms
 * @returns description promise
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
 * @param args - entity search arguments
 * @returns entities response promise
 */
export const fetchEntities = cache(
    async (args: EntitySearchArgs): Promise<EntityResponse> => {
        if (isEmpty(args.terms) && isEmpty(args.description)) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${ENTITY_SEARCH_API_URL}?${queryArgs}&limit=100`, // if more, risks exceeding next's 2MB cache limit
            EntityResponseSchema
        );

        return res;
    }
);

/**
 * Fetch approvals from the API. Cached.
 * @param args - approval search arguments
 * @returns approvals promise
 */
export const fetchApprovals = cache(
    async (
        args: RegulatoryApprovalSearchArgs
    ): Promise<RegulatoryApprovalResponse> => {
        if (isEmpty(args.terms) && isEmpty(args.description)) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${REGULATORY_APPROVAL_SEARCH_API_URL}?${queryArgs}&limit=200`,
            RegulatoryApprovalResponseSchema
        );

        return res;
    }
);

/**
 * Fetch patents from the API. Cached.
 * @param args - patent search arguments
 * @returns patents promise
 */
export const fetchPatents = cache(
    async (args: PatentSearchArgs): Promise<PatentResponse> => {
        const { description, terms } = args;
        if (isEmpty(terms) && isEmpty(description)) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${PATENT_SEARCH_API_URL}?${queryArgs}&limit=200`,
            PatentResponseSchema
        );

        return res;
    }
);

/**
 * Fetch patents from the API. Cached.
 * @param args - trial search arguments
 * @returns trials response promise
 */
export const fetchTrials = cache(
    async (args: TrialSearchArgs): Promise<TrialResponse> => {
        if (isEmpty(args.terms) && isEmpty(args.description)) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${TRIAL_SEARCH_API_URL}?${queryArgs}&limit=200`,
            TrialResponseSchema
        );

        return res;
    }
);
