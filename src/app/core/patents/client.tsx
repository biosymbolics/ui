'use client';

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
import { formatLabel, getSelectableId } from '@/utils/string';

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
export const DetailContent = <T extends Patent>({
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
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Section>
                <SimilarPatents patent={patent} />
            </Section>
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

export const getScoresClassFunc =
    ({
        goodThreshold = 0.75,
        badThreshold = 0.2,
    }: {
        goodThreshold?: number;
        badThreshold?: number;
    }) =>
    (params: GridCellParams<Patent>) => {
        const { value } = params;

        if (typeof value !== 'number') {
            return '';
        }

        return clsx('biosym-app', {
            good: value > goodThreshold,
            bad: value < badThreshold,
        });
    };

export const getScoresClass = getScoresClassFunc({});
export const getTolerantScoresClass = getScoresClassFunc({
    goodThreshold: 0.42,
    badThreshold: 0.2,
});

export const getStyles = ({ getColorSchemeSelector, palette }: Theme) => ({
    [getColorSchemeSelector('dark')]: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '& .biosym-app.good': {
            backgroundColor: palette.success[500],
            fontWeight: '600',
            filter: 'brightness(0.9)',
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '& .biosym-app.bad': {
            backgroundColor: palette.danger[500],
            fontWeight: '600',
            filter: 'brightness(0.9)',
        },
    },
    [getColorSchemeSelector('light')]: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '& .biosym-app.good': {
            backgroundColor: palette.success[100],
            fontWeight: '600',
        },
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '& .biosym-app.bad': {
            backgroundColor: palette.danger[100],
            fontWeight: '600',
        },
    },
});
