'use client';

import Box from '@mui/joy/Box';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params';

import { Entity } from '@/types/entities';
import { Modal } from '@/components/navigation/modal';
import { DataGrid } from '@/components/data/grid';
import { Patent } from '@/types/patents';
import { Trial } from '@/types/trials';

import { getPatentColumns } from '../patents/config';
import { getStyles } from '../styles';
import { getTrialColumns } from '../trials/config';

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
        <Box sx={getStyles}>
            {asset.patents.length > 0 && (
                <DataGrid
                    columns={patentColumns}
                    getRowId={(row: Patent) => row.publication_number}
                    rows={asset.patents}
                    title="Patents"
                    variant="minimal"
                />
            )}
            {asset.trials.length > 0 && (
                <DataGrid
                    columns={trialColumns}
                    getRowId={(row: Trial) => row.nct_id}
                    rows={asset.trials}
                    title="Trials"
                    variant="minimal"
                />
            )}
        </Box>
    );
};

export const AssetModal = <T extends Entity>({
    row: asset,
}: {
    row: T;
}): JSX.Element => (
    <Modal title={asset.name}>
        <AssetDetail row={asset} />
    </Modal>
);

export const renderAssetModal = <T extends Entity>(
    params: GridRenderCellParams<T>
): JSX.Element => {
    const { row } = params;
    return <AssetModal row={row} />;
};
