'use server';

import 'server-only';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';

import { Gantt } from '@/components/charts/gantt';
import { Code } from '@/components/code';

import { predictClindev } from './actions';

export const Answer = async (args: {
    indication: string;
    pathname: string;
}) => {
    try {
        const data = await predictClindev(args.indication);
        if (!data) {
            return <>No data</>;
        }
        return (
            <Stack spacing={3}>
                <Gantt
                    height={400}
                    pathname={args.pathname}
                    xField="x"
                    xFieldTitle="Years"
                    x2Field="x2"
                    yField="y"
                    yFieldTitle="Stage"
                    data={data.map((d) => ({
                        y: d.stage || '???',
                        x: d.offset,
                        x2: d.offset + d.median_duration,
                    }))}
                />
                <Sheet sx={{ p: 3 }}>
                    <Code language="json">{JSON.stringify(data, null, 4)}</Code>
                </Sheet>
            </Stack>
        );
    } catch (e) {
        return (
            <>
                Failed to predict clindev:{' '}
                {e instanceof Error ? e.message : 'unknown'}
            </>
        );
    }
};
