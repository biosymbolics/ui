'use client';

import Box from '@mui/joy/Box';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params';

import { Modal, ModalButtonElementProps } from '@/components/navigation/modal';
import {
    DataGrid,
    getRenderChip,
    getRenderTypography,
} from '@/components/data/grid';
import { RegulatoryApproval } from '@/types/approvals';
import { Entity } from '@/types/entities';
import { Patent } from '@/types/patents';
import { Trial } from '@/types/trials';

import { PatentDetail, getPatentColumns } from '../patents';
import { getStyles } from '../styles';
import { getTrialColumns, TrialDetail } from '../trials';
import { ApprovalDetail, getApprovalColumns } from '../approvals';

/**
 * Detail content panel for patents grid
 */
export const PatentsDetail = <T extends Entity>({
    row: asset,
}: {
    row: T;
}): JSX.Element => {
    const patentColumns = getPatentColumns();
    return (
        <Box sx={getStyles}>
            {asset.patents.length > 0 && (
                <DataGrid
                    columns={patentColumns}
                    detailComponent={PatentDetail<Patent>}
                    getRowId={(row: Patent) => row.publication_number}
                    rows={asset.patents}
                    title="Patents"
                    variant="minimal"
                />
            )}
        </Box>
    );
};

/**
 * Detail content panel for trials grid
 */
export const TrialsDetail = <T extends Entity>({
    row: asset,
}: {
    row: T;
}): JSX.Element => {
    const trialColumns = getTrialColumns();
    return (
        <Box sx={getStyles}>
            {asset.trials.length > 0 && (
                <DataGrid
                    columns={trialColumns}
                    detailComponent={TrialDetail<Trial>}
                    getRowId={(row: Trial) => row.nct_id}
                    rows={asset.trials}
                    title="Trials"
                    variant="minimal"
                />
            )}
        </Box>
    );
};

/**
 * Detail content panel for approvals grid
 */
export const ApprovalsDetail = <T extends Entity>({
    row: asset,
}: {
    row: T;
}): JSX.Element => {
    const approvalColumns = getApprovalColumns();
    return (
        <Box sx={getStyles}>
            {asset.approvals.length > 0 && (
                <DataGrid
                    columns={approvalColumns}
                    detailComponent={ApprovalDetail<RegulatoryApproval>}
                    getRowId={(row: RegulatoryApproval) => row.ndc_code}
                    rows={asset.approvals}
                    title="Approvals"
                    variant="minimal"
                />
            )}
        </Box>
    );
};

export const renderTrialModal = <T extends Entity>(
    params: GridRenderCellParams<T, number>
): JSX.Element => {
    const { row } = params;
    const ButtonElement = ({ onClick }: ModalButtonElementProps) =>
        getRenderChip({ color: 'primary', onClick })(params);
    return (
        <Modal buttonElement={ButtonElement} title={row.name}>
            <TrialsDetail row={row} />
        </Modal>
    );
};

export const renderPatentModal = <T extends Entity>(
    params: GridRenderCellParams<T, number>
): JSX.Element => {
    const { row } = params;
    const ButtonElement = ({ onClick }: ModalButtonElementProps) =>
        getRenderChip({ color: 'primary', onClick })(params);
    return (
        <Modal buttonElement={ButtonElement} title={row.name}>
            <PatentsDetail row={row} />
        </Modal>
    );
};

export const renderApprovalModel = <T extends Entity>(
    params: GridRenderCellParams<T, number>
): JSX.Element => {
    const { row } = params;
    const ButtonElement = ({ onClick }: ModalButtonElementProps) =>
        getRenderChip({ color: 'primary', onClick })(params);
    return (
        <Modal buttonElement={ButtonElement} title={row.name}>
            <ApprovalsDetail row={row} />
        </Modal>
    );
};

export const renderAvailabilityModal = <T extends Entity>(
    params: GridRenderCellParams<T, number>
): JSX.Element => {
    const { row, value } = params;
    const ButtonElement = ({ onClick }: ModalButtonElementProps) =>
        getRenderChip({
            color: (v) => (v > 0 ? 'success' : 'neutral'),
            onClick,
        })({ ...params, value: (value || 0) > 0 ? value : '?' });
    return (
        <Modal buttonElement={ButtonElement} title={row.name}>
            <PatentsDetail row={row} />
        </Modal>
    );
};

export const renderMainTerm = getRenderTypography(
    'title-md',
    (row: Entity) => `/core/dashboard?terms=${row.name}`
);
