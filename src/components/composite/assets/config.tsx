'use server';

import 'server-only';

import {
    DataGrid,
    GridColDef,
    renderChip,
    renderOwnerChip,
    renderPercent,
    renderSparkline,
} from '@/components/data/grid';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Asset } from '@/types/assets';

import {
    renderAvailabilityModal,
    renderMainTerm,
    renderApprovalModel,
    renderPatentModal,
    renderSaturationChip,
    renderTrialModal,
} from './client';

import { getStoppedPercentClass } from '../styles';

export const getAssetColumns = (isChild: boolean): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Asset, Class or Target',
        width: 325,
        renderCell: renderMainTerm,
    },
    {
        field: 'child_count',
        headerName: 'Children',
        width: 80,
        hidden: isChild,
        renderCell: renderChip,
    },
    {
        field: 'regulatory_approval_count',
        headerName: 'Approvals',
        width: 80,
        renderCell: renderApprovalModel,
    },
    {
        field: 'trial_count',
        headerName: 'Trials',
        width: 80,
        renderCell: renderTrialModal,
    },
    {
        field: 'patent_count',
        headerName: 'Patents',
        width: 80,
        renderCell: renderPatentModal,
    },
    {
        field: 'owner_count',
        headerName: 'Owners',
        width: 80,
        renderCell: renderOwnerChip,
    },
    {
        field: 'activity',
        headerName: 'Activity',
        width: 125,
        renderCell: renderSparkline,
    },
    {
        field: 'maybe_available_count',
        headerName: 'Avail?',
        width: 85,
        renderCell: renderAvailabilityModal,
        description: 'Number of patents that *might* be available',
    },
    {
        field: 'investment_level',
        headerName: 'Saturation',
        width: 125,
        renderCell: renderSaturationChip,
    },
    {
        field: 'max_phase',
        headerName: 'Max Phase',
        width: 125,
        renderCell: renderChip,
    },
    {
        field: 'percent_trials_stopped',
        headerName: '% Stopped',
        width: 85,
        valueFormatter: renderPercent,
        cellClassName: getStoppedPercentClass,
    },
    {
        field: 'average_trial_dropout',
        headerName: '% Dropout',
        width: 85,
        valueFormatter: renderPercent,
        cellClassName: getStoppedPercentClass,
    },
    {
        field: 'average_trial_duration',
        headerName: 'Avg Duration',
        width: 85,
    },
    {
        field: 'average_trial_enrollment',
        headerName: 'Avg Enrollment',
        width: 85,
    },
];

/**
 * Detail content panel for assets
 */
export const AssetDetail = <T extends Asset>({
    row: asset,
}: {
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title title={asset.name} variant="soft" />
        <DataGrid<Asset>
            columns={getAssetColumns(true)}
            rows={asset.children}
            variant="minimal"
        />
    </Section>
);
