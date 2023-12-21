'use server';

import { Suspense } from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';

import { getStyles } from '@/components/composite/styles';
import { Tabs } from '@/components/layout/tabs';
import { PatentSearchArgs } from '@/types/patents';

import { AssetList } from './asset';
// import { PatentGraph } from './graph';
import { OverTime } from './over-time';
import { Summary } from './summary';

export const Content = (args: PatentSearchArgs) => {
    try {
        const tabs = [
            {
                label: 'Assets',
                panel: (
                    <Suspense fallback={<Skeleton />}>
                        <AssetList {...args} />
                    </Suspense>
                ),
            },
            {
                label: 'Summary',
                panel: (
                    <Suspense fallback={<Skeleton />}>
                        <Summary {...args} />
                    </Suspense>
                ),
            },
            {
                label: 'Over Time',
                panel: (
                    <Suspense fallback={<Skeleton />}>
                        <OverTime {...args} />
                    </Suspense>
                ),
            },
            // {
            //     label: 'Graph',
            //     panel: (
            //         <Suspense fallback={<Skeleton />}>
            //             <PatentGraph {...args} />
            //         </Suspense>
            //     ),
            // },
        ];
        return (
            <Box sx={getStyles}>
                <Tabs tabs={tabs} />
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