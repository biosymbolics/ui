'use client';

import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';

import { Chips } from '@/components/data/chip';
import { Metric } from '@/components/data/metric';
import {
    DataGrid,
    GridColDef,
    formatMappingObject,
    formatMappingObjects,
    formatNumber,
    formatYear,
    getRenderChip,
    renderChip,
    renderChips,
    renderLabel,
    renderPercent,
} from '@/components/data/grid';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { formatPercent, getSelectableId } from '@/utils/string';
import { Outcome, Trial } from '@/types/documents/trials';
import { DEFAULT_PATHNAME } from '@/constants';

import { getDropoutScoresClass, getStyles } from '../styles';

export const renderStatusChip = getRenderChip({
    color: (v) => {
        if (v === 'COMPLETED') {
            return 'success';
        }
        if (['SUSPENDED', 'TERMINATED', 'WITHDRAWN'].includes(v as string)) {
            return 'danger';
        }

        return 'neutral';
    },
});

export const getTrialColumns = (): GridColDef[] => [
    { field: 'id', headerName: 'Nct Id', width: 135 },
    {
        field: 'interventions',
        headerName: 'Interventions',
        renderCell: renderChips,
        valueGetter: formatMappingObjects,
        width: 200,
    },
    {
        field: 'indications',
        headerName: 'Indications',
        renderCell: renderChips,
        valueGetter: formatMappingObjects,
        width: 175,
    },
    {
        field: 'sponsor',
        headerName: 'Sponsor',
        width: 175,
        valueGetter: formatMappingObject,
    },
    {
        field: 'startDate',
        headerName: 'Start',
        width: 75,
        valueFormatter: formatYear,
    },
    {
        field: 'endDate',
        headerName: 'End',
        width: 75,
        valueFormatter: formatYear,
    },
    {
        field: 'phase',
        headerName: 'Phase',
        renderCell: renderChip,
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        renderCell: renderStatusChip,
        width: 125,
    },
    {
        field: 'dropoutPercent',
        headerName: 'Dropout %',
        width: 100,
        valueFormatter: renderPercent,
        cellClassName: getDropoutScoresClass,
        description: 'Dropout % = Dropouts / Enrollment',
    },
    {
        field: 'terminationReason',
        headerName: 'Term. Reason',
        width: 150,
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 500,
    },
    {
        field: 'design',
        headerName: 'Design',
        width: 150,
        valueFormatter: renderLabel,
    },
    {
        field: 'duration',
        headerName: 'Duration',
        width: 100,
        valueFormatter: formatNumber,
    },
    {
        field: 'maxTimeframe',
        headerName: 'Timeframe',
        width: 100,
    },
    {
        field: 'enrollment',
        headerName: 'Enrollment',
        width: 100,
        valueFormatter: formatNumber,
    },
];

const OutcomesList = ({ outcomes }: { outcomes: Outcome[] }): JSX.Element =>
    outcomes.length < 1 ? (
        <span />
    ) : (
        <>
            <Typography level="title-md">Outcomes</Typography>
            <List>
                {outcomes.map((o) => (
                    <ListItem key={getSelectableId(o.id)}>
                        <ListItemDecorator>·</ListItemDecorator>
                        {o.name} ({o.timeframe})
                    </ListItem>
                ))}
            </List>
        </>
    );

/**
 * Detail content panel for patents grid
 */
export const TrialDetail = <T extends Trial>({
    pathname = DEFAULT_PATHNAME,
    row: trial,
}: {
    pathname?: string;
    row: T;
}): JSX.Element => (
    <Section mx={3}>
        <Title
            link={{ label: trial.id, url: trial.url }}
            title={trial.title}
            description={trial.sponsor?.name || 'Unknown sponsor'}
            variant="soft"
        />

        <Chips
            baseUrl={pathname}
            color="primary"
            label="Indications"
            items={trial.indications.map((i) => i.canonicalName || i.name)}
        />
        <Chips
            baseUrl={pathname}
            color="primary"
            label="Interventions"
            items={trial.interventions.map((i) => i.canonicalName || i.name)}
        />

        <Divider sx={{ my: 3 }} />
        <Grid container spacing={1}>
            <Grid>
                <Metric color="primary" label="Status" value={trial.status} />
            </Grid>
            <Grid>
                <Metric color="primary" label="Phase" value={trial.phase} />
            </Grid>
            <Grid>
                <Metric color="primary" label="Design" value={trial.design} />
            </Grid>
            <Grid>
                <Metric
                    color="primary"
                    label="Randomization"
                    value={trial.randomization}
                />
            </Grid>
            <Grid>
                <Metric color="primary" label="Masking" value={trial.masking} />
            </Grid>
        </Grid>
        <Grid container mt={1} spacing={1}>
            <Grid>
                <Metric label="Enrollment" value={trial.enrollment || 0} />
            </Grid>
            <Grid>
                <Metric
                    formatter={(v) => `${v || '?'} days`}
                    label="Duration"
                    value={trial.duration || 0}
                />
            </Grid>
            <Grid>
                <Metric
                    formatter={(v) => `${v || '?'} days`}
                    label="Outcome Timeframe"
                    value={trial.maxTimeframe || 0}
                />
            </Grid>
            <Grid>
                <Metric
                    value={
                        trial.dropoutPercent
                            ? formatPercent(trial.dropoutPercent)
                            : '--'
                    }
                    label="Dropout Rate"
                />
            </Grid>
            <Grid>
                <Metric
                    value={trial.terminationReason || '--'}
                    label="Termination Reason"
                    tooltip={trial.terminationDescription || undefined}
                />
            </Grid>
        </Grid>
        {trial.outcomes && (
            <Section>
                <OutcomesList outcomes={trial.outcomes} />
            </Section>
        )}
    </Section>
);

/**
 * Detail content panel for trials grid
 */
export const TrialsDetail = ({ trials }: { trials: Trial[] }): JSX.Element => {
    const trialColumns = getTrialColumns();
    return (
        <Box sx={getStyles}>
            <DataGrid
                columns={trialColumns}
                detailComponent={TrialDetail<Trial>}
                rows={trials}
                title="Trials"
                variant="minimal"
            />
        </Box>
    );
};
