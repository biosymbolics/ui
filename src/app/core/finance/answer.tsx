'use server';

import 'server-only';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';

import { Line } from '@/components/charts/line';

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
                    // annotations={events?.map((d) => ({
                    //     x: d.date,
                    //     label: d.details,
                    // }))}
                    height={350}
                    pathname="/core/finance"
                    series={[
                        {
                            data: stock.map((d) => ({
                                x: d.date,
                                y: d.close,
                            })),
                            name: 'Closing price',
                        },
                    ]}
                />
                <Sheet sx={{ p: 3 }}>{JSON.stringify(events, null, 4)}</Sheet>
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
