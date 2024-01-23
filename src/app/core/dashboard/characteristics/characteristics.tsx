'use server';

import Box from '@mui/joy/Box';

import { DEFAULT_PATHNAME } from '@/constants';
import { Heatmap } from '@/components/charts/heatmap';
import { HeadField, PatentCharacteristic, PatentSearchArgs } from '@/types';

import { fetchPatentCharacteristics } from './actions';
import { PatentCharacteristicsControl, getClickUrl } from './control';

const CharacteristicsInner = async ({
    pathname = DEFAULT_PATHNAME,
    ...args
}: PatentSearchArgs & { headField: HeadField; pathname?: string }) => {
    try {
        const data = await fetchPatentCharacteristics(args);

        return (
            <Heatmap<PatentCharacteristic>
                getClickUrl={getClickUrl}
                data={data}
                pathname={pathname}
                tooltipFields={['head', 'concept', 'documents']}
                xField="head"
                yField="concept"
            />
        );
    } catch (e) {
        return (
            <Box>
                Failed to fetch patents:{' '}
                {e instanceof Error ? e.message : JSON.stringify(e)}
            </Box>
        );
    }
};

export const PatentCharacteristics = (
    args: PatentSearchArgs & {
        headField: HeadField;
        pathname?: string;
    }
) => (
    <PatentCharacteristicsControl {...args}>
        <CharacteristicsInner {...args} />
    </PatentCharacteristicsControl>
);
