'use client';

/* eslint-disable @typescript-eslint/naming-convention */

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
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
                                href={`/core/dashboard?terms=${s}`}
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
