'use server';

import { Suspense } from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

import { getStyles } from '@/components/composite/styles';
import { Tabs } from '@/components/layout/tabs';
import { BaseSearchArgs, ViewType } from '@/types';

import { EntityList, PatentList, TrialList } from './server';
import { Summary } from './summary';
import { OverTime } from './over-time';
import { DocumentCharacteristics } from './characteristics';

export type ContentArgs = BaseSearchArgs & {
    tab: string;
};

type TabDef = { id: string; label: string; panel: JSX.Element };

const getTabsForType = ({
    tab,
    type = 'unknown',
    ...args
}: ContentArgs): TabDef[] => {
    const tabs = {
        owners: {
            id: 'owners',
            label: 'Owners',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList {...args} entityCategory="owner" view={type} />
                </Suspense>
            ),
        },
        interventions: {
            id: 'interventions',
            label: 'Interventions',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList
                        {...args}
                        entityCategory="intervention"
                        view={type}
                    />
                </Suspense>
            ),
        },
        interventionsForOwner: {
            id: 'interventionsForOwner',
            label: 'Pipeline',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList
                        {...args}
                        entityCategory="intervention"
                        view={type}
                    />
                </Suspense>
            ),
        },
        indications: {
            id: 'indications',
            label: 'Indications',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList
                        {...args}
                        entityCategory="indication"
                        view={type}
                    />
                </Suspense>
            ),
        },
        patents: {
            id: 'patents',
            label: 'Patents',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <PatentList {...args} />
                </Suspense>
            ),
        },
        trials: {
            id: 'trials',
            label: 'Trials',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <TrialList {...args} />
                </Suspense>
            ),
        },
        summary: {
            id: 'summary',
            label: 'Summary',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <Summary {...args} />
                </Suspense>
            ),
        },
        overtime: {
            id: 'overtime',
            label: 'Over Time',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <OverTime {...args} />
                </Suspense>
            ),
        },
        interventionsByIndication: {
            id: 'interventionsByIndication',
            label: 'Landscape',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <DocumentCharacteristics
                        {...args}
                        headField="indications"
                        tailField="interventions"
                    />
                </Suspense>
            ),
        },
        ownersByInterventions: {
            id: 'ownersByInterventions',
            label: 'Landscape',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <DocumentCharacteristics
                        {...args}
                        headField="interventions"
                        tailField="owners"
                    />
                </Suspense>
            ),
        },
        ownersByIndications: {
            id: 'ownersByIndications',
            label: 'Landscape',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <DocumentCharacteristics
                        {...args}
                        headField="indications"
                        tailField="owners"
                    />
                </Suspense>
            ),
        },
    };

    const typeToTabs: Record<ViewType, TabDef[]> = {
        intervention: [
            tabs.owners,
            tabs.indications,
            tabs.patents,
            tabs.trials,
            // tabs.summary,
            tabs.ownersByIndications,
        ],
        indication: [
            tabs.owners,
            tabs.interventions,
            tabs.patents,
            tabs.trials,
            // tabs.summary,
            tabs.ownersByInterventions,
        ],
        target: [
            tabs.owners,
            tabs.interventions,
            tabs.indications,
            tabs.patents,
            tabs.trials,
            tabs.ownersByInterventions,
        ],
        company: [
            tabs.interventionsForOwner,
            tabs.indications,
            tabs.patents,
            tabs.trials,
            tabs.interventionsByIndication,
        ],
        companies: [tabs.owners, tabs.patents, tabs.trials],
        unknown: [tabs.patents, tabs.trials],
    };

    return typeToTabs[type || 'unknown'];
};

export const Content = ({ tab, ...args }: ContentArgs) => {
    const tabs = getTabsForType({ tab, ...args });
    return (
        <Box sx={getStyles}>
            <Tabs openId={tab} tabs={tabs} />
        </Box>
    );
};
