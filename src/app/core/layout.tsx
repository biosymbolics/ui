import { ReactNode } from 'react';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';

import { SideNav } from '@/components/navigation/menu';

/**
 * Basic layout compound
 */
export const Layout = ({ children }: { children: ReactNode }) => (
    <Grid container>
        <SideNav />
        <Box sx={{ m: 3 }}>
            <Sheet sx={{ p: 3 }}>
                <main>{children}</main>
            </Sheet>
        </Box>
    </Grid>
);

export default Layout;
