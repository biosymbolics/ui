import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import MuiXLicense from '@/components/data/mui-license';
import { NavigationProvider } from '@/hooks/navigation';

import ThemeRegistry from './theme-registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Biosymbolics - Patents',
    description: 'Intelligent IP search for biotech and pharma',
};

export const RootLayout = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => (
    <html lang="en">
        <body className={inter.className}>
            <ThemeRegistry options={{ key: 'joy' }}>
                <NavigationProvider>{children}</NavigationProvider>
                <MuiXLicense />
            </ThemeRegistry>
        </body>
    </html>
);

export default RootLayout;
