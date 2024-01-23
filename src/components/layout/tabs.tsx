'use client';

import { ReactNode } from 'react';
import Tab from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import JoyTabs from '@mui/joy/Tabs';

import { useNavigation } from '@/hooks/navigation';

type TabDef = {
    id: string;
    label: string;
    panel: ReactNode;
};

/**
 * Tab component
 * @param props.tabs
 */
export const Tabs = ({
    openId,
    tabs,
}: {
    openId?: string;
    tabs: TabDef[];
}): JSX.Element => {
    const { setParam } = useNavigation();
    return (
        <JoyTabs onChange={(e, id) => setParam('tab', `${id}`)} value={openId}>
            <TabList>
                {tabs.map(({ id, label }) => (
                    <Tab key={`${id}-tab`} value={id} variant="soft">
                        {label}
                    </Tab>
                ))}
            </TabList>
            {tabs.map(({ id, panel }) => (
                <TabPanel
                    key={`${id}-panel`}
                    value={id}
                    sx={{ minHeight: '100vh' }}
                >
                    {panel}
                </TabPanel>
            ))}
        </JoyTabs>
    );
};
