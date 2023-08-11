import { ReactNode } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

import { SideNav } from '@/components/navigation/menu';

/**
 * Basic layout compound
 */
export const Layout = ({ children }: { children: ReactNode }) => (
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
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Sheet sx={{ p: 3 }}>
                <main>{children}</main>
            </Sheet>
        </Box>
    </>
);

export default Layout;
