'use client';

import { ReactNode } from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

import { SideNav } from '@/components/navigation/menu';
import { useNavigation } from '@/hooks/navigation';

/**
 * Basic layout compound
 */
export const Layout = ({ children }: { children: ReactNode }) => {
    const { isPending } = useNavigation();

    if (isPending) {
        return <Skeleton height="lg" />;
    }
    return (
        <>
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
        </>
    );
};

export default Layout;
