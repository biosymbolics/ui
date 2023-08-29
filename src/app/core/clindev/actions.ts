import { cache } from 'react';

import { PREDICT_CLINDEV_API_URL } from '@/constants';
import { getFetchOptions } from '@/utils/actions';
import { ClindevResponse, ClindevResponseSchema } from '@/types/clindev';

/**
 * Predict clindev
 * @param indication
 */
export const predictClindev = cache(
    async (indication: string): Promise<ClindevResponse | null> => {
        if (indication.length === 0) {
            return null;
        }
        const res = await getFetchOptions(
            `${PREDICT_CLINDEV_API_URL}?indication=${encodeURIComponent(
                indication
            )}`,
            ClindevResponseSchema
        );
        return res;
    }
);
