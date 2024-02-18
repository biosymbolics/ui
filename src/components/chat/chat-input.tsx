'use client';

import { useState } from 'react';
import Box from '@mui/joy/Box';

import { Button, TextArea } from '@/components/input';

export type ChatInputProps = {
    error?: string | null;
    isPending: boolean;
    onSubmit: (prompt: string) => void;
};

export const ChatInput = ({ error, isPending, onSubmit }: ChatInputProps) => {
    const [prompt, setPrompt] = useState<string>('');

    return (
        <Box sx={{ px: 2, pb: 5 }}>
            <TextArea
                placeholder="Type something here…"
                aria-label="Prompt"
                error={!!error}
                helperText={error || undefined}
                id="prompt"
                minRows={3}
                maxRows={10}
                onChange={(e) => setPrompt(e.target.value)}
                endDecorator={
                    <Button
                        color="primary"
                        disabled={isPending}
                        onClick={() => {
                            onSubmit(prompt);
                            setPrompt('');
                        }}
                        size="lg"
                        sx={{ ml: 'auto' }}
                    >
                        Send
                    </Button>
                }
                value={prompt}
                variant="outlined"
            />
        </Box>
    );
};
