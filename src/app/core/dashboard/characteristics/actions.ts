'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';
import isEmpty from 'lodash/fp/isEmpty';

import { CHARACTERISTIC_API_URL } from '@/constants';
import {
    HeadField,
    TailField,
    BaseSearchArgs,
    DocumentCharacteristicsSchema,
    DocumentCharacteristics as DocumentCharacteristicsType,
} from '@/types';
import { doFetch } from '@/utils/actions';
import { getQueryArgs } from '@/utils/api';
import { formatKeys } from '@/utils/object';

export const fetchDocumentCharacteristics = cache(
    async (
        args: BaseSearchArgs & { headField: HeadField; tailField: TailField }
    ): Promise<DocumentCharacteristicsType> => {
        if (isEmpty(args.terms) && isEmpty(args.description)) {
            return [];
        }
        const queryArgs = getQueryArgs(args, true);
        const res = await doFetch(
            `${CHARACTERISTIC_API_URL}?${queryArgs}`,
            DocumentCharacteristicsSchema,
            (response) => formatKeys(response, camelCase)
        );

        return res;
    }
);
