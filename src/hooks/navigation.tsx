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

type ParamValues = {
    [key: string]: string | boolean | number;
};

type NavigationContextType = {
    isPending: boolean;
    navigate: (url: string, options?: NavigateOptions) => void;
    params: ReadonlyURLSearchParams;
    setParam: (key: string, value: string) => void;
    setParams: (newParamsValues: ParamValues) => void;
};

const NavigationContext = createContext({
    isPending: false,
    navigate: ((url: string) => {
        console.warn(`No impl when attempting to route to ${url}`);
    }) as NavigationContextType['navigate'],
    params: new URLSearchParams() as ReadonlyURLSearchParams,
    setParam: (key: string, value: string) => {
        console.warn(`No impl when attempting to set param ${key} to ${value}`);
    },
    setParams: (newParams: ParamValues) => {
        console.warn(
            `No impl when attempting to set params ${JSON.stringify(newParams)}`
        );
    },
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
                    Router.push(url, options);
                });
            },
            setParam: (key: string, value: string) => {
                const newParams = new URLSearchParams(params);
                newParams.set(key, value);
                Router.replace(`?${newParams.toString()}`, {
                    scroll: false, // TODO!
                });
            },
            setParams: (newParamsValues: ParamValues) => {
                const newParams = new URLSearchParams(params);
                Object.entries(newParamsValues).forEach(([k, v]) =>
                    newParams.set(k, `${v}`)
                );
                Router.replace(`?${newParams.toString()}`, {
                    scroll: false, // TODO!
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
