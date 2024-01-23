'use client';

import { getRenderChip, getRenderTypography } from '@/components/data/grid';
import { DEFAULT_PATHNAME } from '@/constants';
import { Asset } from '@/types/assets';

export const renderPatentModal = getRenderChip({
    color: 'neutral',
    getUrl: (row: Asset) =>
        `/core/dashboard/patents?ids=${row.patent_ids.join(';')}&terms=${
            row.name
        }`,
});

export const renderApprovalModel = getRenderChip({
    color: 'neutral',
    getUrl: (row: Asset) =>
        `/core/dashboard/approvals?ids=${row.regulatory_approval_ids.join(
            ';'
        )}&terms=${row.name}`,
});

export const renderTrialModal = getRenderChip({
    color: 'neutral',
    getUrl: (row: Asset) =>
        `/core/dashboard/trials?ids=${row.trial_ids.join(';')}&terms=${
            row.name
        }`,
});

export const renderAvailabilityModal = getRenderChip({
    color: (v) => ((v as number) > 0 ? 'success' : 'neutral'),
    getUrl: (row: Asset) =>
        `/core/dashboard/patents?ids=${row.maybe_available_ids.join(
            ';'
        )}&terms=${row.name}`,
});

export const renderMainTerm = getRenderTypography(
    'title-md',
    (row: Asset) => `${DEFAULT_PATHNAME}?terms=${row.name}`
);

export const renderSaturationChip = getRenderChip({
    color: (v) => {
        if (v === 'very high') {
            return 'danger';
        }
        if (v === 'high') {
            return 'warning';
        }
        if (v === 'low') {
            return 'success';
        }
        return 'neutral';
    },
});
