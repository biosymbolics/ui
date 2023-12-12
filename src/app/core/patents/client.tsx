'use client';

/* eslint-disable @typescript-eslint/naming-convention */

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Theme } from '@mui/joy/styles';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { GridCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import clsx from 'clsx';
import unescape from 'lodash/fp/unescape';

import { Chips } from '@/components/data/chip';
import { Metric } from '@/components/data/metric';
import { Section } from '@/components/layout/section';
import { Title } from '@/components/layout/title';
import { Patent } from '@/types/patents';
import { formatLabel, formatPercent, getSelectableId } from '@/utils/string';
import { Trial } from '@/types/trials';

const SimilarPatents = ({ patent }: { patent: Patent }): JSX.Element => (
    <>
        <Typography level="title-md">Similar Patents</Typography>
        <List>
            {patent.similar_patents
                .filter((s) => s.startsWith('WO'))
                .map((s, index) => (
                    <ListItem key={`${getSelectableId(s)}-${index}`}>
                        <ListItemDecorator>·</ListItemDecorator>
                        <Link
                            component={NextLink}
                            href={patent.url}
                            target="_blank"
                        >
                            {s}
                        </Link>
                        <Typography level="body-sm" sx={{ ml: 1 }}>
                            (
                            <Link
                                component={NextLink}
                                href={`/core/patents?terms=${s}`}
                                target="_blank"
                            >
                                Search
                            </Link>
                            )
                        </Typography>
                    </ListItem>
                ))}
        </List>
    </>
);

/**
 * Detail content panel for patents grid
 */
export const PatentDetail = <T extends Patent>({
    row: patent,
}: {
    row: T;
}): JSX.Element => {
    const domainsOfInterest: (keyof T)[] = [
        'assignees',
        'attributes',
        'biologics',
        'compounds',
        'devices',
        'diseases',
        'inventors',
        'mechanisms',
    ];
    const pathname = usePathname();
    const approvalInfo = patent.approval_dates
        ? `\n\nApproved ${patent.approval_dates[0]}} for indication ${
              patent.indications?.[0] || '(unknown)'
          } (${patent.brand_name}/${patent.generic_name}).`
        : '';
    const trialInfo = patent.last_trial_status
        ? `\n\nLast trial update: ${patent.last_trial_status} on ${
              patent.last_trial_update
          }. NCTs ${(patent.nct_ids || []).join(', ')}.`
        : '';
    return (
        <Section mx={3}>
            <Title
                description={`${unescape(
                    patent.abstract
                )}${approvalInfo}${trialInfo}`}
                link={{ label: patent.publication_number, url: patent.url }}
                title={unescape(patent.title)}
                variant="soft"
            />

            {domainsOfInterest.map((domain) => (
                <Chips
                    baseUrl={pathname}
                    color="neutral"
                    label={formatLabel(domain as string)}
                    items={(patent[domain] as string[]) || []}
                />
            ))}

            <Divider sx={{ my: 3 }} />
            <Grid container spacing={3}>
                <Grid xs={6} sm={2}>
                    <Metric
                        value={patent.suitability_score}
                        label="Suitability"
                        tooltip={patent.suitability_score_explanation || ''}
                    />
                </Grid>
                <Grid xs={6} sm={2}>
                    <Metric
                        value={patent.patent_years}
                        label="Patent Years Left"
                    />
                </Grid>
                <Grid xs={6} sm={2}>
                    <Metric
                        value={patent.availability_likelihood}
                        label="Likehood of Availability"
                        tooltip={patent.availability_explanation}
                    />
                </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Section>
                <SimilarPatents patent={patent} />
            </Section>
        </Section>
    );
};

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
        // 'mesh_conditions',
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

export const getPatentYearsClass = (params: GridCellParams<Patent>) => {
    const { value } = params;

    if (typeof value !== 'number') {
        return '';
    }

    return clsx('biosym-app', {
        good: value > 15,
        bad: value < 8,
    });
};

export const getAvailabilityClass = (params: GridCellParams<Patent>) => {
    const { value } = params;

    if (typeof value !== 'string') {
        return '';
    }

    return clsx('biosym-app', {
        good: ['POSSIBLE', 'LIKELY'].includes(value),
        bad: value === 'UNLIKELY',
    });
};

export const getScoresClassFunc =
    ({
        goodThreshold = 0.75,
        badThreshold = 0.2,
        higherIsBetter = true,
    }: {
        goodThreshold?: number;
        badThreshold?: number;
        higherIsBetter?: boolean;
    }) =>
    (params: GridCellParams<Patent>) => {
        const { value } = params;

        if (typeof value !== 'number') {
            return '';
        }

        return clsx('biosym-app', {
            good: higherIsBetter
                ? value > goodThreshold
                : value < goodThreshold,
            bad: higherIsBetter ? value < badThreshold : value > badThreshold,
        });
    };

export const getScoresClass = getScoresClassFunc({});
export const getTolerantScoresClass = getScoresClassFunc({
    goodThreshold: 0.42,
    badThreshold: 0.2,
});
export const getDropoutScoresClass = getScoresClassFunc({
    goodThreshold: 0.0,
    badThreshold: 0.2,
    higherIsBetter: false,
});
export const getRepurposeScoreClass = getScoresClassFunc({
    goodThreshold: 0.2,
    badThreshold: 0.0,
});

export const getStyles = ({ getColorSchemeSelector, palette }: Theme) => ({
    [getColorSchemeSelector('dark')]: {
        '& .biosym-app.good': {
            backgroundColor: palette.success[500],
            fontWeight: '600',
            filter: 'brightness(0.9)',
        },
        '& .biosym-app.bad': {
            backgroundColor: palette.danger[500],
            fontWeight: '600',
            filter: 'brightness(0.9)',
        },
    },
    [getColorSchemeSelector('light')]: {
        '& .biosym-app.good': {
            backgroundColor: palette.success[100],
            fontWeight: '600',
        },
        '& .biosym-app.bad': {
            backgroundColor: palette.danger[100],
            fontWeight: '600',
        },
    },
});
