'use server';

import { Suspense } from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';

import { getStyles } from '@/components/composite/styles';
import { Tabs } from '@/components/layout/tabs';
import { HeadField, PatentSearchArgs } from '@/types';

import { AssetList } from './asset';
import { Summary } from './summary';

export type ContentArgs = PatentSearchArgs & {
    headField: HeadField;
    tab: string;
};

export const Content = ({ tab, ...args }: ContentArgs) => {
    try {
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
    } catch (e) {
        return (
            <Alert
                startDecorator={<WarningIcon />}
                variant="soft"
                color="warning"
            >
                <Typography level="h4">Failed to fetch patents</Typography>
                <Typography>
                    {e instanceof Error ? e.message : JSON.stringify(e)}
                </Typography>
            </Alert>
        );
    }
};
