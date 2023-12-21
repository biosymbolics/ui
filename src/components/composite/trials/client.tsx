'use client';

import { usePathname } from 'next/navigation';
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
import { formatLabel, formatPercent, getSelectableId } from '@/utils/string';
import { Trial } from '@/types/trials';

const OutcomesList = ({ trial }: { trial: Trial }): JSX.Element => (
    <>
        <Typography level="title-md">Outcomes</Typography>
        <List>
            {trial.primary_outcomes.map((s, index) => (
                <ListItem key={`${getSelectableId(s)}-${index}`}>
                    <ListItemDecorator>·</ListItemDecorator>
                    {s}
                </ListItem>
            ))}
        </List>
    </>
);

/**
 * Detail content panel for patents grid
 */
export const TrialDetail = <T extends Trial>({
    row: trial,
}: {
    row: T;
}): JSX.Element => {
    const pathname = usePathname();
    const fields: (keyof T)[] = [
        'conditions',
        'mesh_conditions',
        'interventions',
    ];
    return (
        <Section mx={3}>
            <Title
                link={{
                    label: trial.nct_id,
                    url: `https://clinicaltrials.gov/study/${trial.nct_id}`,
                }}
                title={trial.title}
                description={`${
                    trial.sponsor || 'Unknown sponsor'
                } (${formatLabel(trial.sponsor_type)})`}
                variant="soft"
            />

            {fields.map((field) => (
                <Chips
                    baseUrl={pathname}
                    color="primary"
                    label={formatLabel(field as string)}
                    items={(trial[field] as string[]) || []}
                />
            ))}

            <Divider sx={{ my: 3 }} />
            <Grid container spacing={1}>
                <Grid>
                    <Metric
                        color="primary"
                        label="Status"
                        value={trial.status}
                    />
                </Grid>
                <Grid>
                    <Metric color="primary" label="Phase" value={trial.phase} />
                </Grid>
                <Grid>
                    <Metric
                        color="primary"
                        label="Design"
                        value={trial.design}
                    />
                </Grid>
                <Grid>
                    <Metric
                        color="primary"
                        label="Randomization"
                        value={trial.randomization}
                    />
                </Grid>
                <Grid>
                    <Metric
                        color="primary"
                        label="Masking"
                        value={trial.masking}
                    />
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
                        tooltip={trial.why_stopped || undefined}
                    />
                </Grid>
            </Grid>
            {trial.primary_outcomes.length > 0 && (
                <Section>
                    <OutcomesList trial={trial} />
                </Section>
            )}
        </Section>
    );
};