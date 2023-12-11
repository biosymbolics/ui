'use server';

import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import Typography from '@mui/joy/Typography';
import WarningIcon from '@mui/icons-material/Warning';
import 'server-only';

import { Tabs } from '@/components/layout/tabs';
import { PatentSearchArgs } from '@/types/patents';

import { getStyles } from './client';
import { PatentList } from './patent';
import { PatentGraph } from './graph';
import { OverTime } from './over-time';
import { Summary } from './summary';
import { TrialList } from './trials';

const getTabs = (args: PatentSearchArgs) => [
    {
        label: 'Patents',
        panel: <PatentList {...args} />,
    },
    {
        label: 'Trials',
        panel: <TrialList {...args} />,
    },
    {
        label: 'Summary',
        panel: <Summary {...args} />,
    },
    {
        label: 'Over Time',
        panel: <OverTime {...args} />,
    },
    {
        label: 'Graph',
        panel: <PatentGraph {...args} />,
    },
];

export const Content = (args: PatentSearchArgs) => {
    try {
        const tabs = getTabs(args);
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
