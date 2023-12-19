'use server';

import { DataGrid } from '@/components/data/grid';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Patent } from '@/types/patents';
import { Trial } from '@/types/trials';
import { Entity } from '@/types/entities';

import { getPatentColumns, getTrialColumns } from '../config';

/**
 * Detail content panel for patents grid
 */
export const AssetDetail = <T extends Entity>({
    row: asset,
}: {
    row: T;
}): JSX.Element => {
    const patentColumns = getPatentColumns();
    const trialColumns = getTrialColumns();
    return (
        <Section mx={3}>
            <Title description="" title={asset.name} variant="soft" />

            {asset.patents.length > 0 && (
                <DataGrid
                    columns={patentColumns}
                    rows={asset.patents.map((patent: Patent) => ({
                        ...patent,
                        id: patent.publication_number,
                    }))}
                    title="Patents"
                    variant="minimal"
                />
            )}
            {asset.trials.length > 0 && (
                <DataGrid
                    columns={trialColumns}
                    rows={asset.trials.map((trial: Trial) => ({
                        ...trial,
                        id: trial.nct_id,
                    }))}
                    title="Trials"
                    variant="minimal"
                />
            )}
        </Section>
    );
};
