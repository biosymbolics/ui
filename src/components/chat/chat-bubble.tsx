'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import ReactMarkdown from 'react-markdown';

import { ClindevResponseSchema } from '@/types/clindev';

import { ChatProps } from './types';

import { Timeline } from '../charts/gantt';

type ChatBubbleProps = ChatProps;

const getChild = (
    type: string,
    content: string,
    description: string | null = null
) => {
    if (type === 'timeline') {
        if (typeof window === 'undefined') {
            return <span />;
        }
        const parsed = ClindevResponseSchema.safeParse(JSON.parse(content));
        if (parsed.success === false) {
            const message = `Failed to parse: ${parsed.error.toString()}`;
            console.error(message, parsed);
            throw new Error(message);
        }
        const { data } = parsed;
        return (
            <Box sx={{ my: 2 }}>
                {description && description}
                <Timeline
                    height={400}
                    pathname="/core/chat"
                    series={[
                        {
                            name: 'Years',
                            data: data.map((d) => ({
                                x: d.stage || '???',
                                y: [d.offset, d.offset + d.median_duration],
                            })),
                        },
                    ]}
                />
            </Box>
        );
    }
    return <ReactMarkdown>{content}</ReactMarkdown>;
};

export const ChatBubble = ({
    description,
    content,
    type = 'text',
}: ChatBubbleProps) => (
    <Box sx={{ width: '90%' }}>
        <Box sx={{ position: 'relative' }}>
            <Sheet
                color="primary"
                variant="outlined"
                sx={{
                    px: 2,
                    borderRadius: 'lg',
                }}
            >
                <Box sx={{ color: 'text.secondary' }}>
                    {getChild(type, content, description)}
                </Box>
            </Sheet>
        </Box>
    </Box>
);
