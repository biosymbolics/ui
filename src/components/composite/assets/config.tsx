'use server';

import 'server-only';

// import { Line } from '@/components/charts/line';
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
import { Asset } from '@/types/entities';

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
        field: 'approval_count',
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
        field: 'percent_stopped',
        headerName: '% Stopped',
        width: 85,
        valueFormatter: renderPercent,
        cellClassName: getStoppedPercentClass,
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
        {/* <Line
            data={asset.activity}
            x="date"
            y="count"
            xLabel="Date"
            yLabel="Activity"
            title="Activity"
        /> */}
    </Section>
);
