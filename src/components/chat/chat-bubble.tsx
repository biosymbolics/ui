'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import ReactMarkdown from 'react-markdown';

import { ChatProps } from './types';

type ChatBubbleProps = ChatProps;

export const ChatBubble = ({ content }: ChatBubbleProps) => (
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
                    <ReactMarkdown>{content}</ReactMarkdown>
                </Box>
            </Sheet>
        </Box>
    </Box>
);
