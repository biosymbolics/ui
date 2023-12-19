'use server';

import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Entity } from '@/types/entities';

/**
 * Detail content panel for patents grid
 */
export const AssetDetail = <T extends Entity>({
    row: asset,
}: {
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title description="" title={asset.name} variant="soft" />
    </Section>
);
