'use client';

import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import List from '@mui/joy/List';
import Typography from '@mui/joy/Typography';

import { Chips } from '@/components/data/chip';
import { Metric } from '@/components/data/metric';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { formatPercent, getSelectableId } from '@/utils/string';
import { Outcome, Trial } from '@/types/documents/trials';
import { getRenderChip } from '@/components/data/grid';
import { DEFAULT_PATHNAME } from '@/constants';

const OutcomesList = ({ outcomes }: { outcomes: Outcome[] }): JSX.Element => (
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
            items={trial.indications.map((i) => i.name)}
        />
        <Chips
            baseUrl={pathname}
            color="primary"
            label="Interventions"
            items={trial.interventions.map((i) => i.name)}
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
                    value={trial.max_timeframe || 0}
                />
            </Grid>
            <Grid>
                <Metric
                    value={
                        trial.dropout_percent
                            ? formatPercent(trial.dropout_percent)
                            : '--'
                    }
                    label="Dropout Rate"
                />
            </Grid>
            <Grid>
                <Metric
                    value={trial.termination_reason || '--'}
                    label="Termination Reason"
                    tooltip={trial.termination_description || undefined}
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
