'use client';

import Box from '@mui/joy/Box';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params';

import { Chip } from '@/components/data/chip';
import { formatLabel } from '@/utils/string';
import { Modal, ModalButtonElementProps } from '@/components/navigation/modal';
import { DataGrid } from '@/components/data/grid';
import { Entity } from '@/types/entities';
import { Patent } from '@/types/patents';
import { Trial } from '@/types/trials';

import { getPatentColumns } from '../patents/config';
import { getStyles } from '../styles';
import { getTrialColumns } from '../trials/config';

/**
 * Detail content panel for patents grid
 */
export const PatentDetail = <T extends Entity>({
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
 * Detail content panel for patents grid
 */
export const TrialDetail = <T extends Entity>({
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
                    getRowId={(row: Trial) => row.nct_id}
                    rows={asset.trials}
                    title="Trials"
                    variant="minimal"
                />
            )}
        </Box>
    );
};

const getButtonElement = (value: number) => {
    const ButtonElement = ({ onClick }: ModalButtonElementProps) => (
        <Chip color="primary" onClick={onClick}>
            {formatLabel(value)}
        </Chip>
    );
    return ButtonElement;
};

type DocumentModalProps<T extends Entity> = {
    buttonElement: (props: ModalButtonElementProps) => React.ReactNode;
    row: T;
};

export const TrialModal = <T extends Entity>({
    buttonElement,
    row: trial,
}: DocumentModalProps<T>): JSX.Element => (
    <Modal buttonElement={buttonElement} title={trial.name}>
        <TrialDetail row={trial} />
    </Modal>
);

export const PatentModal = <T extends Entity>({
    row: patent,
    buttonElement,
}: DocumentModalProps<T>): JSX.Element => (
    <Modal buttonElement={buttonElement} title={patent.name}>
        <PatentDetail row={patent} />
    </Modal>
);

export const renderTrialModal = <T extends Entity>(
    params: GridRenderCellParams<T, number>
): JSX.Element => {
    const { row, value } = params;
    if (typeof value !== 'number') {
        return <span />;
    }
    return <TrialModal buttonElement={getButtonElement(value)} row={row} />;
};
export const renderPatentModal = <T extends Entity>(
    params: GridRenderCellParams<T, number>
): JSX.Element => {
    const { row, value } = params;
    if (typeof value !== 'number') {
        return <span />;
    }
    return <PatentModal buttonElement={getButtonElement(value)} row={row} />;
};
