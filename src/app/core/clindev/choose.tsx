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

    const [indication, setIndiciation] = useState<string>(initial);

    return (
        <Stack spacing={2}>
            <Input
                defaultValue={indication}
                label="Specify an indication"
                onChange={(e) => setIndiciation(e.target.value)}
                size="lg"
            />
            <Box>
                <Button
                    onClick={() => {
                        navigate(`${pathname}?indication=${indication}`);
                    }}
                    sx={{ ml: 'auto' }}
                >
                    Submit
                </Button>
            </Box>
        </Stack>
    );
};
