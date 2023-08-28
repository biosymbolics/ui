'use server';

import 'server-only';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

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
                    annotations={events?.map((d) => ({
                        x: d.date || '???',
                        y: stock.find(
                            (s) =>
                                false &&
                                new Date(s.date).getTime() ===
                                    new Date(d.date).getTime()
                        )?.close,
                        label: d.details,
                        type: 'point',
                    }))}
                    height={300}
                    pathname="/core/finance"
                    series={[
                        {
                            data: stock.map((d) => ({
                                x: d.date,
                                y: d.close.toPrecision(4),
                            })),
                            name: 'Closing price',
                            color: '#6366f1',
                        },
                    ]}
                />
                <Sheet color="neutral" sx={{ p: 3 }} variant="solid">
                    <Typography
                        color="white"
                        component="pre"
                        fontWeight="bold"
                        sx={{
                            whiteSpace: 'pre-wrap',
                            width: '100%',
                        }}
                    >
                        {JSON.stringify(events, null, 4)}
                    </Typography>
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
