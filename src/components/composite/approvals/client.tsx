'use client';

import { Chips } from '@/components/data/chip';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { RegulatoryApproval } from '@/types/documents/approvals';
import { DEFAULT_PATHNAME } from '@/constants';

/**
 * Detail content panel for patents grid
 */
export const ApprovalDetail = <T extends RegulatoryApproval>({
    pathname = DEFAULT_PATHNAME,
    row: approval,
}: {
    pathname?: string;
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title
            link={{
                label: `${approval.application_type} ${approval.id} (${approval.agency})`,
                url: approval.url,
            }}
            title={approval.interventions?.[0]?.name || 'unknown'}
            variant="soft"
        />

        <Chips
            baseUrl={pathname}
            color="primary"
            label="Indications"
            items={approval.indications.map((indication) => indication.name)}
        />
    </Section>
);
