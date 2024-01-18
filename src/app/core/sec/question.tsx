'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import { useNavigation } from '@/hooks/navigation';
import { Button, TextArea } from '@/components/input';

export const Question = ({ initial }: { initial: string }) => {
    const { navigate } = useNavigation();
    const pathname = usePathname();

    const [question, setQuestion] = useState<string>(initial);

    return (
        <Stack spacing={2}>
            <TextArea
                defaultValue={question}
                minRows={4}
                onChange={(e) => setQuestion(e.target.value)}
                size="lg"
            />
            <Box>
                <Button
                    onClick={() => {
                        navigate(`${pathname}?question=${question}`);
                    }}
                    sx={{ ml: 'auto' }}
                >
                    Ask
                </Button>
            </Box>
        </Stack>
    );
};
