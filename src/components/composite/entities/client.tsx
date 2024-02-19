'use client';

import { Line } from '@/components/charts/line';
import {
    DataGrid,
    GridColDef,
    getRenderChip,
    getRenderTypography,
    renderChip,
    renderOwnerChip,
    renderPercent,
    renderSparkline,
} from '@/components/data/grid';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { DEFAULT_PATHNAME } from '@/constants';
import { Entity, EntityActivity } from '@/types/entities';

import { getStoppedPercentClass } from '../styles';

export const renderPatentModal = getRenderChip({
    color: 'primary',
    getUrl: (row: Entity) =>
        `/core/patents?ids=${row.patent_ids.join(';')}&terms=${row.name}`,
    openInNewTab: false,
});

export const renderApprovalModel = getRenderChip({
    color: 'primary',
    getUrl: (row: Entity) =>
        `/core/approvals?ids=${row.regulatory_approval_ids.join(';')}&terms=${
            row.name
        }`,
    openInNewTab: false,
});

export const renderTrialModal = getRenderChip({
    color: 'primary',
    getUrl: (row: Entity) =>
        `/core/trials?ids=${row.trial_ids.join(';')}&terms=${row.name}`,
    openInNewTab: false,
});

export const renderAvailabilityModal = getRenderChip({
    color: (v) => ((v as number) > 0 ? 'success' : 'neutral'),
    getUrl: (row: Entity) =>
        `/core/patents?ids=${row.maybe_available_ids.join(';')}&terms=${
            row.name
        }`,
    openInNewTab: false,
});

export const renderMainTerm = getRenderTypography(
    'title-md',
    (row: Entity) => `${DEFAULT_PATHNAME}?terms=${row.name}`
);

export const renderSaturationChip = getRenderChip({
    color: (v) => {
        if (v === 'very high') {
            return 'danger';
        }
        if (v === 'high') {
            return 'warning';
        }
        if (v === 'low') {
            return 'success';
        }
        return 'neutral';
    },
});

export const getEntityColumns = (isChild: boolean): GridColDef[] => [
    {
        field: 'name',
        headerName: 'Entity, Class or Target',
        width: 325,
        renderCell: renderMainTerm,
    },
    {
        field: 'child_count',
        headerName: 'Subs',
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
        headerName: 'Investment',
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

export const getRowId = (row: Entity) => `nested-${row.id}`;

const DocTypes: (keyof Omit<EntityActivity, 'year'>)[] = [
    'patents',
    'regulatory_approvals',
    'trials',
];

const formatDetailData = (data: EntityActivity[]) =>
    DocTypes.map((doc) => ({
        name: doc,
        data: data
            .map((d) => ({
                x: d.year,
                y: d[doc],
            }))
            .sort((a, b) => a.x - b.x),
    }));

/**
 * Detail content panel for entities
 */
export const EntityDetail = <T extends Entity>(props: {
    row: T;
}): JSX.Element => {
    // sometimes props is null; mui datagrid bug?
    if (!props || !props?.row) {
        return <span />;
    }
    const { row: entity } = props;

    const columns = getEntityColumns(true);
    return (
        <Section mx={3}>
            <Title title={entity.name} variant="soft">
                <Line
                    height={150}
                    pathname={DEFAULT_PATHNAME}
                    series={formatDetailData(entity.detailed_activity)}
                    title="Activity Over Time"
                    variant="minimal"
                    width={800}
                />
            </Title>

            <DataGrid<Entity>
                columns={columns}
                getRowId={getRowId}
                height={Math.min(400, 100 + entity.children.length * 35)}
                rows={entity.children}
                variant="minimal"
            />
        </Section>
    );
};

export const EntityGrid = ({ entities }: { entities: Entity[] }) => {
    const columns = getEntityColumns(false);
    return (
        <DataGrid
            disableRowSelectionOnClick
            columns={columns}
            detailComponent={EntityDetail<Entity>}
            detailHeight="auto"
            rows={entities}
            variant="maximal"
        />
    );
};
