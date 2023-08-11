import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import MuiXLicense from '@/components/data/mui-license';

import ThemeRegistry from './theme-registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export const RootLayout = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => (
    <html lang="en">
        <body className={inter.className}>
            <ThemeRegistry options={{ key: 'joy' }}>
                {children}
                <MuiXLicense />
            </ThemeRegistry>
        </body>
    </html>
);

export default RootLayout;
