'use server';

import 'server-only';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { Timeline } from '@/components/charts/gantt';
import theme from '@/theme';

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
                            color: theme.colorSchemes.light.palette
                                .primary[400],
                        },
                    ]}
                />
                <Sheet color="primary" sx={{ p: 3 }} variant="outlined">
                    <Typography fontWeight="bold">
                        <pre>
                            <code>{JSON.stringify(data, null, 4)}</code>
                        </pre>
                    </Typography>
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
