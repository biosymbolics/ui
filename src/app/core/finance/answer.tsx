'use server';

import 'server-only';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';

import { Line } from '@/components/charts/line';
import { Code } from '@/components/code';

import { getEvents } from './actions';

export const Answer = async (args: { ticker: string }) => {
    try {
        const resp = await getEvents(args.ticker);
        if (!resp) {
            return <>No data</>;
        }
        const { events, stock } = resp;
        return (
            <Stack spacing={3}>
                <Line
                    annotations={events?.map((d) => ({
                        x: d.date,
                        y: stock.find(
                            (s) =>
                                new Date(s.date).getTime() ===
                                new Date(d.date).getTime()
                        )?.close,
                        label: d.details,
                    }))}
                    height={350}
                    pathname="/core/finance"
                    series={[
                        {
                            data: stock.map((d) => ({
                                x: d.date,
                                y: d.close.toPrecision(4),
                            })),
                            name: 'Closing price',
                        },
                    ]}
                />
                <Sheet sx={{ p: 3 }}>
                    <Code language="json">
                        {JSON.stringify(events, null, 4)}
                    </Code>
                </Sheet>
            </Stack>
        );
    } catch (e) {
        return (
            <>
                Failed to get events:{' '}
                {e instanceof Error ? e.message : 'unknown'}
            </>
        );
    }
};
