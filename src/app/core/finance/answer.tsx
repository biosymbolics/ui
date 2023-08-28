'use server';

import 'server-only';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

import { getEvents } from './actions';

export const Answer = async (args: { ticker: string }) => {
    try {
        const data = await getEvents(args.ticker);
        if (!data) {
            return <>No data</>;
        }
        return (
            <Stack spacing={3}>
                <Sheet color="primary" sx={{ p: 3 }} variant="outlined">
                    <Typography
                        component="pre"
                        fontWeight="bold"
                        sx={{ whiteSpace: 'pre-wrap', width: '100%' }}
                    >
                        {JSON.stringify(data, null, 4)}
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
