'use client';

import React, {
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useTransition,
} from 'react';
import {
    ReadonlyURLSearchParams,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type NavigationContextType = {
    isPending: boolean;
    navigate: (url: string, options?: NavigateOptions) => void;
    params: ReadonlyURLSearchParams;
};

const NavigationContext = createContext({
    isPending: false,
    navigate: ((url: string) => {
        console.warn(`No impl when attempting to route to ${url}`);
    }) as NavigationContextType['navigate'],
    params: new URLSearchParams() as ReadonlyURLSearchParams,
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const Router = useRouter();
    const params = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const context: NavigationContextType = useMemo(
        () => ({
            isPending,
            navigate: (url: string, options?: NavigateOptions) => {
                startTransition(() => {
                    if (options?.scroll === false) {
                        Router.replace(url, options);
                    } else {
                        Router.push(url, options);
                    }
                });
            },
            params,
        }),
        [Router, isPending, params]
    );

    return (
        <NavigationContext.Provider value={context}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error(
            'useNavigation must be used within a NavigationProvider'
        );
    }
    return context;
};
