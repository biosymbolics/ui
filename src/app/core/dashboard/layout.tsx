'use client';

import { DefaultLayoutProps } from '@/components/layout/default-layout';

/**
 * Basic layout compound
 */
export const Layout = ({ children, modal }: DefaultLayoutProps) => (
    <>
        {children}
        {modal}
    </>
);

export default Layout;
