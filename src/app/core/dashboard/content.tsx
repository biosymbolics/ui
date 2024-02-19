'use server';

import { Suspense } from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

import { getStyles } from '@/components/composite/styles';
import { Tabs } from '@/components/layout/tabs';
import { HeadField, PatentSearchArgs } from '@/types';

import { AssetList, PatentList, TrialList } from './server';
import { Summary } from './summary';

export type ContentArgs = PatentSearchArgs & {
    headField: HeadField;
    tab: string;
};

export const Content = ({ tab, ...args }: ContentArgs) => {
    const tabs = [
        {
            id: 'assets',
            label: 'Assets',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <AssetList {...args} />
                </Suspense>
            ),
        },
        {
            id: 'patents',
            label: 'Patents',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <PatentList {...args} />
                </Suspense>
            ),
        },
        {
            id: 'trials',
            label: 'Trials',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <TrialList {...args} />
                </Suspense>
            ),
        },
        {
            id: 'summary',
            label: 'Summary',
            panel: (
                <Suspense fallback={<Skeleton />}>
                    <Summary {...args} />
                </Suspense>
            ),
        },
        // {
        //     id: 'over-time',
        //     label: 'Over Time',
        //     panel: (
        //         <Suspense fallback={<Skeleton />}>
        //             <OverTime {...args} />
        //         </Suspense>
        //     ),
        // },
        // {
        //     id: 'characteristics',
        //     label: 'Characteristics',
        //     panel: (
        //         <Suspense fallback={<Skeleton />}>
        //             <PatentCharacteristics {...args} />
        //         </Suspense>
        //     ),
        // },
    ];
    return (
        <Box sx={getStyles}>
            <Tabs openId={tab} tabs={tabs} />
        </Box>
    );
};
