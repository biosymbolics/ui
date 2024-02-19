'use server';

import { Suspense } from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

import { getStyles } from '@/components/composite/styles';
import { Tabs } from '@/components/layout/tabs';
import { HeadField, BaseSearchArgs, SearchType } from '@/types';

import { EntityList, PatentList, TrialList } from './server';
import { Summary } from './summary';
import { OverTime } from './over-time';
import { DocumentCharacteristics } from './characteristics';

export type ContentArgs = BaseSearchArgs & {
    headField: HeadField;
    tab: string;
};

type TabDef = { id: string; label: string; panel: JSX.Element };

const getTabsForType = ({ tab, type, ...args }: ContentArgs): TabDef[] => {
    const tabs = {
        companies: {
            id: 'companies',
            label: 'Companies',
            panel: <span>hi</span>,
        },
        interventions: {
            id: 'interventions',
            label: 'Interventions',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList {...args} />
                </Suspense>
            ),
        },
        indications: {
            id: 'indications',
            label: 'Indications',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <EntityList {...args} />
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
        characteristics: {
            id: 'characteristics',
            label: 'Characteristics',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <DocumentCharacteristics {...args} />
                </Suspense>
            ),
        },
    };

    const typeToTabs: Record<SearchType | 'unknown', TabDef[]> = {
        intervention: [
            tabs.companies,
            tabs.indications,
            tabs.patents,
            tabs.trials,
            tabs.summary,
        ],
        indication: [
            tabs.companies,
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
