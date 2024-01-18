'use client';

import { ReactNode } from 'react';

/**
 * Basic layout component
 */
const Layout = ({
    children,
    modal,
}: {
    children: ReactNode;
    modal: ReactNode;
}) => (
    <>
        {children}
        {modal}
    </>
);

export default Layout;
