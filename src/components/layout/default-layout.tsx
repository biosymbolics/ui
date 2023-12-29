'use client';

import { ReactNode } from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

import { SideNav } from '@/components/navigation/menu';

export type DefaultLayoutProps = {
    children: ReactNode;
    modal: ReactNode;
};

/**
 * Basic layout compound
 */
export const DefaultLayout = ({
    isPending,
    children,
    modal,
}: DefaultLayoutProps & { isPending: boolean }) => {
    if (isPending) {
        return <Skeleton height="lg" />;
    }
    return (
        <Box mt={3}>
            <Box
                sx={{
                    display: 'flex',
                    position: 'fixed',
                    top: 0,
                    height: 'fit-content',
                    zIndex: 1000,
                }}
            >
                <SideNav />
            </Box>
            <Box
                sx={{
                    maxWidth: 1200,
                    mx: 'auto',
                }}
            >
                <main>{children}</main>
            </Box>
            {modal}
        </Box>
    );
};
