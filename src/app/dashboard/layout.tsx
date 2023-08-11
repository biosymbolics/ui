import { ReactNode } from 'react';
import Link from 'next/link';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Sheet from '@mui/joy/Sheet';

import { getSelectableId } from '@/utils/string';

type Crumb = { label: string; url: string };

const NavBar = ({ links }: { links: Crumb[] }) => (
    <Breadcrumbs>
        {links.map(({ label, url }) => (
            <Link key={getSelectableId(label)} color="neutral" href={url}>
                {label}
            </Link>
        ))}
    </Breadcrumbs>
);
const Footer = () => <footer>footer</footer>;

/**
 * Basic layout compound
 */
export const Layout = ({ children }: { children: ReactNode }) => {
    const links: Crumb[] = [{ label: 'dashboard', url: '/dashboard' }];

    return (
        <>
            <NavBar links={links} />
            <Box sx={{ m: 3 }}>
                <Sheet sx={{ p: 3 }}>
                    <main>{children}</main>
                </Sheet>
            </Box>
            <Footer />
        </>
    );
};

export default Layout;
