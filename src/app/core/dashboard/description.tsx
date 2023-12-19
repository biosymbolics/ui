'use server';

import Box from '@mui/joy/Box';
import ReactMarkdown from 'react-markdown';
import 'server-only';

import { fetchDescription } from './actions';

export const Description = async ({ terms }: { terms: string[] }) => {
    try {
        const description = await fetchDescription(terms);
        return (
            <Box>
                <ReactMarkdown>{description || '(none)'}</ReactMarkdown>
            </Box>
        );
    } catch (e) {
        return (
            <Box>
                Failed to fetch description:{' '}
                {e instanceof Error ? e.message : JSON.stringify(e)}
            </Box>
        );
    }
};
