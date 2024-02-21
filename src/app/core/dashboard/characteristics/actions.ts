'use server';

import { cache } from 'react';
import camelCase from 'lodash/fp/camelCase';

import { CHARACTERISTIC_API_URL } from '@/constants';
import {
    HeadField,
    TailField,
    BaseSearchArgs,
    DocumentCharacteristicsSchema,
    DocumentCharacteristics as DocumentCharacteristicsType,
} from '@/types';
import { doFetch } from '@/utils/actions';
import { formatKeys } from '@/utils/object';
import { getQueryArgs } from '@/utils/api';

export const fetchDocumentCharacteristics = cache(
    async (
        args: BaseSearchArgs & { headField: HeadField; tailField: TailField }
    ): Promise<DocumentCharacteristicsType> => {
        if (args.terms?.length === 0) {
            return {} as DocumentCharacteristicsType;
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
