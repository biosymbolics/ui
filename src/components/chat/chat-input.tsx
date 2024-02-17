'use client';

import { useState } from 'react';
import Box from '@mui/joy/Box';

import { Button, TextArea } from '@/components/input';

export type ChatInputProps = {
    onSubmit: (prompt: string) => void;
};

export const ChatInput = ({ onSubmit }: ChatInputProps) => {
    const [prompt, setPrompt] = useState<string>('');

    return (
        <Box sx={{ px: 2, pb: 5 }}>
            <TextArea
                placeholder="Type something here…"
                aria-label="Prompt"
                id="prompt"
                minRows={3}
                maxRows={10}
                onChange={(e) => setPrompt(e.target.value)}
                endDecorator={
                    <Button
                        color="primary"
                        onClick={() => onSubmit(prompt)}
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
