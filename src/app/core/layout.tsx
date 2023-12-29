'use client';

import { useNavigation } from '@/hooks/navigation';
import {
    DefaultLayout,
    DefaultLayoutProps,
} from '@/components/layout/default-layout';

/**
 * Basic layout compound
 */
export const Layout = (props: DefaultLayoutProps) => {
    const { isPending } = useNavigation();

    return <DefaultLayout isPending={isPending} {...props} />;
};

export default Layout;
