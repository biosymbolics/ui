'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import { useNavigation } from '@/hooks/navigation';
import { Button, Input } from '@/components/input';

export const Choose = ({ initial }: { initial: string }) => {
    const { navigate } = useNavigation();
    const pathname = usePathname();

    const [ticker, setTicker] = useState<string>(initial);

    return (
        <Stack spacing={2}>
            <Input
                defaultValue={ticker}
                label="Specify a ticker symbol"
                onChange={(e) => setTicker(e.target.value)}
                size="lg"
            />
            <Box>
                <Button
                    onClick={() => {
                        navigate(`${pathname}?ticker=${ticker}`);
                    }}
                    sx={{ ml: 'auto' }}
                >
                    Submit
                </Button>
            </Box>
        </Stack>
    );
};
