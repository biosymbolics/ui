'use client';

import Box from '@mui/joy/Box';

import { Chips } from '@/components/data/chip';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import {
    DataGrid,
    GridColDef,
    formatMappingObjects,
    formatYear,
    renderChip,
    renderChips,
} from '@/components/data/grid';
import { DEFAULT_PATHNAME } from '@/constants';
import { RegulatoryApproval } from '@/types';

import { getStyles } from '../styles';

/**
 * Detail content panel for patents grid
 */
export const ApprovalDetail = <T extends RegulatoryApproval>({
    pathname = DEFAULT_PATHNAME,
    row: approval,
}: {
    pathname?: string;
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title
            link={{
                label: `${approval.application_type} ${approval.id} (${approval.agency})`,
                url: approval.url,
            }}
            title={approval.interventions?.[0]?.name || 'unknown'}
            variant="soft"
        />

        <Chips
            baseUrl={pathname}
            color="primary"
            label="Indications"
            items={(approval.indications || []).map(
                (indication) => indication.name
            )}
        />
    </Section>
);

export const getApprovalColumns = (): GridColDef[] => [
    {
        field: 'application_type',
        headerName: 'Type',
        renderCell: renderChip,
        width: 200,
    },
    {
        field: 'agency',
        headerName: 'Agency',
        renderCell: renderChip,
        width: 100,
    },
    {
        field: 'approval_date',
        headerName: 'Year',
        width: 75,
        valueFormatter: formatYear,
    },
    {
        field: 'interventions',
        headerName: 'Interventions',
        renderCell: renderChips,
        valueGetter: formatMappingObjects,
        width: 250,
    },
    {
        field: 'indications',
        headerName: 'Indications',
        renderCell: renderChips,
        valueGetter: formatMappingObjects,
        width: 500,
    },
];

/**
 * Detail content panel for approvals grid
 */
export const ApprovalsDetail = ({
    approvals,
}: {
    approvals: RegulatoryApproval[];
}): JSX.Element => {
    const approvalColumns = getApprovalColumns();
    return (
        <Box sx={getStyles}>
            <DataGrid
                columns={approvalColumns}
                detailComponent={ApprovalDetail<RegulatoryApproval>}
                rows={approvals}
                title="Approvals"
                variant="minimal"
            />
        </Box>
    );
};
