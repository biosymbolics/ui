'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';

import { Button, TextArea } from '@/components/input';

export type ChatInputProps = {
    onSubmit: (value: string) => void;
};

export const ChatInput = ({ onSubmit }: ChatInputProps) => {
    const handleClick = (value: string) => {
        onSubmit(value.trim());
    };
    console.info(handleClick);
    return (
        <Box sx={{ px: 2, pb: 5 }}>
            <TextArea
                placeholder="Type something here…"
                aria-label="Message"
                minRows={3}
                maxRows={10}
                endDecorator={
                    <Button
                        color="primary"
                        onClick={() => {}}
                        size="lg"
                        sx={{ ml: 'auto' }}
                    >
                        Submit
                    </Button>
                }
                variant="outlined"
            />
        </Box>
    );
};
