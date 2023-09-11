/* eslint-disable */
'use client';

import React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import {
    experimental_extendTheme as materialExtendTheme,
    Experimental_CssVarsProvider as MaterialCssVarsProvider,
    THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';

import theme from '@/theme';

/**
 * required for X-Grid themeing; should be able to remove in the future
 * @see https://mui.com/joy-ui/guides/using-joy-ui-and-material-ui-together/#case-b-material-ui-in-a-joy-ui-project
 */
const materialTheme = materialExtendTheme({});

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
const ThemeRegistry = (props: any) => {
    const { options, children } = props;

    const [{ cache, flush }] = React.useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const newflush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush: newflush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        const styles = names.map((name) => cache.inserted[name]).join('');
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <MaterialCssVarsProvider
                theme={{ [MATERIAL_THEME_ID]: materialTheme }}
            >
                <CssVarsProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </CssVarsProvider>
            </MaterialCssVarsProvider>
        </CacheProvider>
    );
};

export default ThemeRegistry;
