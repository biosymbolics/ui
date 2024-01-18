'use client';

import { DefaultLayoutProps } from '@/components/layout/default-layout';

/**
 * Basic layout component
 */
const Layout = ({ children, modal }: DefaultLayoutProps) => (
    <>
        {children}
        {modal}
    </>
);

export default Layout;
