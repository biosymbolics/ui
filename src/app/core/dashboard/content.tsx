'use server';

import { Suspense } from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

import { getStyles } from '@/components/composite/styles';
import { Tabs } from '@/components/layout/tabs';
import { BaseSearchArgs, SearchType } from '@/types';

import { EntityList, PatentList, TrialList } from './server';
import { Summary } from './summary';
import { OverTime } from './over-time';
import { DocumentCharacteristics } from './characteristics';

export type ContentArgs = BaseSearchArgs & {
    tab: string;
};

type TabDef = { id: string; label: string; panel: JSX.Element };

const getTabsForType = ({ tab, type, ...args }: ContentArgs): TabDef[] => {
    const tabs = {
        owners: {
            id: 'owners',
            label: 'Owners',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList {...args} entityCategory="owner" />
                </Suspense>
            ),
        },
        interventions: {
            id: 'interventions',
            label: 'Interventions',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList {...args} entityCategory="intervention" />
                </Suspense>
            ),
        },
        indications: {
            id: 'indications',
            label: 'Indications',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList {...args} entityCategory="indication" />
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
        interventionByIndication: {
            id: 'interventionByIndication',
            label: 'Characteristics',
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
    };

    const typeToTabs: Record<SearchType | 'unknown', TabDef[]> = {
        intervention: [
            tabs.owners,
            tabs.indications,
            tabs.patents,
            tabs.trials,
            tabs.summary,
        ],
        indication: [
            tabs.owners,
            tabs.interventions,
            tabs.patents,
            tabs.trials,
            tabs.summary,
        ],
        company: [
            tabs.interventions,
            tabs.indications,
            tabs.patents,
            tabs.trials,
            tabs.summary,
            tabs.interventionByIndication,
        ],
        unknown: [tabs.patents, tabs.trials, tabs.summary],
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
