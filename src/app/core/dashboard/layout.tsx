'use client';

import {
    DefaultLayout,
    DefaultLayoutProps,
} from '@/components/layout/default-layout';
import { useNavigation } from '@/hooks/navigation';

/**
 * Basic layout compound
 */
export const Layout = (props: DefaultLayoutProps) => {
    const { isPending } = useNavigation();
    return <DefaultLayout isPending={isPending} {...props} />;
};

export default Layout;
