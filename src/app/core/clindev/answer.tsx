'use server';

import 'server-only';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';

import { Timeline } from '@/components/charts/gantt';
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
                <Timeline
                    height={400}
                    pathname={args.pathname}
                    series={[
                        {
                            data: data?.map((d) => ({
                                x: d.stage || '???',
                                y: [d.offset, d.offset + d.median_duration],
                            })),
                        },
                    ]}
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
