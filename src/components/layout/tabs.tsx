'use client';

import { ReactNode } from 'react';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import JoyTabs from '@mui/joy/Tabs';

import { getSelectableId } from '@/utils/string';

type TabDef = {
    label: string;
    panel: ReactNode;
};

/**
 * Tab component
 * @param props.tabs
 */
export const Tabs = ({ tabs }: { tabs: TabDef[] }): JSX.Element => (
    <JoyTabs>
        <TabList>
            {tabs.map(({ label }) => (
                <Tab key={`${getSelectableId(label)}-tab`} variant="soft">
                    {label}
                </Tab>
            ))}
        </TabList>
        {tabs.map(({ label, panel }, idx) => (
            <TabPanel
                key={`${getSelectableId(label)}-panel`}
                value={idx}
                sx={{ minHeight: '100vh' }}
            >
                {panel}
            </TabPanel>
        ))}
    </JoyTabs>
);
