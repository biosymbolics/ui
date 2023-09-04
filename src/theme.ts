/* eslint-disable @typescript-eslint/naming-convention */
import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
    // No custom tokens found, you can skip the theme augmentation.
}

const theme = extendTheme({
    fontFamily: {
        body: 'Abel, SF Pro Text, var(--gh-fontFamily-fallback)',
    },
    components: {
        JoyCard: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                },
            },
        },
        JoyTabPanel: {
            styleOverrides: {
                root: {
                    paddingRight: 0,
                    paddingLeft: 0,
                },
            },
        },
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    '50': '#eef2ff',
                    '100': '#e0e7ff',
                    '200': '#c7d2fe',
                    '300': '#a5b4fc',
                    '400': '#818cf8',
                    '500': '#6366f1',
                    '600': '#4f46e5',
                    '700': '#4338ca',
                    '800': '#3730a3',
                    '900': '#312e81',
                },
                neutral: {
                    '50': '#f8fafc',
                    '100': '#f1f5f9',
                    '200': '#e2e8f0',
                    '300': '#cbd5e1',
                    '400': '#94a3b8',
                    '500': '#64748b',
                    '600': '#475569',
                    '700': '#334155',
                    '800': '#1e293b',
                    '900': '#0f172a',
                },
                danger: {
                    '50': '#fff1f2',
                    '100': '#ffe4e6',
                    '200': '#fecdd3',
                    '300': '#fda4af',
                    '400': '#fb7185',
                    '500': '#f43f5e',
                    '600': '#e11d48',
                    '700': '#be123c',
                    '800': '#9f1239',
                    '900': '#881337',
                },
                success: {
                    '50': '#f0fdf4',
                    '100': '#dcfce7',
                    '200': '#bbf7d0',
                    '300': '#86efac',
                    '400': '#4ade80',
                    '500': '#22c55e',
                    '600': '#16a34a',
                    '700': '#15803d',
                    '800': '#166534',
                    '900': '#14532d',
                },
                warning: {
                    '50': '#fff7ed',
                    '100': '#ffedd5',
                    '200': '#fed7aa',
                    '300': '#fdba74',
                    '400': '#fb923c',
                    '500': '#f97316',
                    '600': '#ea580c',
                    '700': '#c2410c',
                    '800': '#9a3412',
                    '900': '#7c2d12',
                },
                background: {
                    body: 'var(--joy-palette-background-level1)',
                },
            },
        },
        dark: {
            palette: {},
        },
    },
});

export default theme;
