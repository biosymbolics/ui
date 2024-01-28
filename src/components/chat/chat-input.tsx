'use client';

/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';

import { Button } from '@/components/input';

export type ChatInputProps = {
    textAreaValue: string;
    setTextAreaValue: (value: string) => void;
    onSubmit: () => void;
};

export const ChatInput = (props: ChatInputProps) => {
    const { textAreaValue, setTextAreaValue, onSubmit } = props;
    const textAreaRef = React.useRef<HTMLDivElement>(null);
    const handleClick = () => {
        if (textAreaValue.trim() !== '') {
            onSubmit();
            setTextAreaValue('');
        }
    };
    return (
        <Box sx={{ px: 2, pb: 5 }}>
            <FormControl>
                <Textarea
                    placeholder="Type something here…"
                    aria-label="Message"
                    ref={textAreaRef}
                    onChange={(e) => {
                        setTextAreaValue(e.target.value);
                    }}
                    value={textAreaValue}
                    minRows={3}
                    maxRows={10}
                    endDecorator={
                        <Button
                            color="primary"
                            onClick={handleClick}
                            size="lg"
                            sx={{ ml: 'auto' }}
                        >
                            Submit
                        </Button>
                    }
                    onKeyDown={(event) => {
                        if (
                            event.key === 'Enter' &&
                            (event.metaKey || event.ctrlKey)
                        ) {
                            handleClick();
                        }
                    }}
                    sx={{
                        '& textarea:first-of-type': {
                            minHeight: 72,
                        },
                    }}
                />
            </FormControl>
        </Box>
    );
};
