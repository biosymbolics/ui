'use client';

import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

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
        <SparkLineChart
            showHighlight
            showTooltip
            plotType="line"
            colors={['blue']}
            data={asset.activity}
            height={200}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        />
    </Section>
);
