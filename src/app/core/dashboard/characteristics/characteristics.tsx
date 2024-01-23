'use server';

import Box from '@mui/joy/Box';

import { DEFAULT_PATHNAME } from '@/constants';
import { Heatmap } from '@/components/charts/heatmap';
import { HeadField, PatentSearchArgs } from '@/types';

import { fetchPatentCharacteristics } from './actions';
import { PatentCharacteristicsControl } from './control';

const CharacteristicsInner = async ({
    pathname = DEFAULT_PATHNAME,
    ...args
}: PatentSearchArgs & { headField: HeadField; pathname?: string }) => {
    try {
        const data = await fetchPatentCharacteristics(args);

        return (
            <Heatmap
                clickBaseUrl={`${pathname}/patents?terms=`}
                clickField="documents"
                data={data}
                pathname={pathname}
                tooltipFields={['documents']}
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
