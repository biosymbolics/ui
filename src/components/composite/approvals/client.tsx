'use client';

import { Chips } from '@/components/data/chip';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { formatLabel } from '@/utils/string';
import { RegulatoryApproval } from '@/types/approvals';
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
}): JSX.Element => {
    const fields: (keyof T)[] = ['indications', 'pharmacologic_classes'];
    return (
        <Section mx={3}>
            <Title
                link={{
                    label: approval.ndc_code,
                    url: approval.label_url,
                }}
                title={approval.brand_name}
                variant="soft"
            />

            {fields.map((field) => (
                <Chips
                    baseUrl={pathname}
                    color="primary"
                    label={formatLabel(field as string)}
                    items={(approval[field] as string[]) || []}
                />
            ))}
        </Section>
    );
};
