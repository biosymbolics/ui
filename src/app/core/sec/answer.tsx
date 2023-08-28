'use server';

import Box from '@mui/joy/Box';
import { Textarea } from '@mui/joy';
import 'server-only';

import { askSec } from './actions';

export const Answer = async (args: { question: string }) => {
    try {
        const answer = await askSec(args.question);
        return (
            <Box>
                <Textarea value={answer} />
            </Box>
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to ask SEC: {e.message}</div>;
        }
        return <div>Failed to ask SEC</div>;
    }
};
