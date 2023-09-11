/* eslint-disable @typescript-eslint/naming-convention */
import { extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
    // No custom tokens found, you can skip the theme augmentation.
}

const theme = extendTheme({
    fontFamily: {
        body: 'Mulish, SF Pro Text, var(--gh-fontFamily-fallback)',
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
                    '50': '#e8eaf6',
                    '100': '#c5cae9',
                    '200': '#9fa8da',
                    '300': '#7986cb',
                    '400': '#5c6bc0',
                    '500': '#3f51b5',
                    '600': '#3949ab',
                    '700': '#303f9f',
                    '800': '#283593',
                    '900': '#1a237e',
                },
                neutral: {
                    '50': '#eceff1',
                    '100': '#cfd8dc',
                    '200': '#b0bec5',
                    '300': '#90a4ae',
                    '400': '#78909c',
                    '500': '#607d8b',
                    '600': '#546e7a',
                    '700': '#455a64',
                    '800': '#37474f',
                    '900': '#263238',
                },
                danger: {
                    '50': '#fef2f2',
                    '100': '#fee2e2',
                    '200': '#fecaca',
                    '300': '#fca5a5',
                    '400': '#f87171',
                    '500': '#ef4444',
                    '600': '#dc2626',
                    '700': '#b91c1c',
                    '800': '#991b1b',
                    '900': '#7f1d1d',
                },
                success: {
                    '50': '#ecfdf5',
                    '100': '#d1fae5',
                    '200': '#a7f3d0',
                    '300': '#6ee7b7',
                    '400': '#34d399',
                    '500': '#10b981',
                    '600': '#059669',
                    '700': '#047857',
                    '800': '#065f46',
                    '900': '#064e3b',
                },
                warning: {
                    '50': '#fbe9e7',
                    '100': '#ffccbc',
                    '200': '#ffab91',
                    '300': '#ff8a65',
                    '400': '#ff7043',
                    '500': '#ff5722',
                    '600': '#f4511e',
                    '700': '#e64a19',
                    '800': '#d84315',
                    '900': '#bf360c',
                },
            },
        },
        dark: {
            palette: {
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
                primary: {
                    '50': '#e8eaf6',
                    '100': '#c5cae9',
                    '200': '#9fa8da',
                    '300': '#7986cb',
                    '400': '#5c6bc0',
                    '500': '#3f51b5',
                    '600': '#3949ab',
                    '700': '#303f9f',
                    '800': '#283593',
                    '900': '#1a237e',
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
                success: {
                    '50': '#ecfdf5',
                    '100': '#d1fae5',
                    '200': '#a7f3d0',
                    '300': '#6ee7b7',
                    '400': '#34d399',
                    '500': '#10b981',
                    '600': '#059669',
                    '700': '#047857',
                    '800': '#065f46',
                    '900': '#064e3b',
                },
            },
        },
    },
});

export default theme;
