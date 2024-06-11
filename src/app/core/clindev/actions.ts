import { cache } from 'react';

import { PREDICT_CLINDEV_API_URL } from '@/constants';
import { doFetch } from '@/utils/actions';
import { ClindevResponse, ClindevResponseSchema } from '@/types/clindev';

/**
 * Predict clindev API call
 * @param indication
 */
export const predictClindev = cache(
    async (indication: string): Promise<ClindevResponse | null> => {
        if (indication.length === 0) {
            return null;
        }
        const res = await doFetch(
            `${PREDICT_CLINDEV_API_URL}?indication=${encodeURIComponent(
                indication
            )}`,
            ClindevResponseSchema
        );
        return res;
    }
);
