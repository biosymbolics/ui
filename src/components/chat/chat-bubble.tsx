import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import { ChatProps } from './types';

type ChatBubbleProps = ChatProps;

export const ChatBubble = ({ content }: ChatBubbleProps) => (
    <Box sx={{ width: '60%' }}>
        <Box sx={{ position: 'relative' }}>
            <Sheet
                color="primary"
                variant="outlined"
                sx={{
                    p: 2,
                    borderRadius: 'lg',
                }}
            >
                <Typography level="body-sm">{content}</Typography>
            </Sheet>
        </Box>
    </Box>
);
