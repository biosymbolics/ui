'use client';

import React, {
    ReactNode,
    createContext,
    useCallback,
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
    /**
     * Set url & navigating (wraps next/router.push)
     * @param url
     * @param options
     */
    navigate: (url: string, options?: NavigateOptions) => void;
    params: ReadonlyURLSearchParams;
    /**
     * Set parameter in url
     * @param key
     * @param value
     * @param nagivate if true, will navigate to new url (next/router.push)
     */
    setParam: (key: string, value: string, nagivate?: boolean) => void;
    /**
     * Set multiple parameters in url
     * @param newParamsValues
     * @param nagivate if true, will navigate to new url (next/router.push)
     */
    setParams: (newParamsValues: ParamValues, nagivate?: boolean) => void;
};

const NavigationContext = createContext<NavigationContextType>({
    isPending: false,
    navigate: (url: string) => {
        console.warn(`No impl when attempting to route to ${url}`);
    },
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

/**
 * Navigation provider that makes it easier to manage state as parameters in the url
 */
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const Router = useRouter();
    const params = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const setParams = useCallback(
        (newParamsValues: ParamValues, nagivate: boolean = false) => {
            const newParams = new URLSearchParams(params);
            Object.entries(newParamsValues).forEach(([k, v]) =>
                newParams.set(k, `${v}`)
            );
            if (nagivate) {
                startTransition(() => {
                    Router.push(`?${newParams.toString()}`);
                });
            } else {
                Router.replace(`?${newParams.toString()}`);
            }
        },
        [Router, params]
    );

    const context: NavigationContextType = useMemo(
        () => ({
            isPending,
            navigate: (url: string, options?: NavigateOptions) => {
                startTransition(() => {
                    Router.push(url, options);
                });
            },
            params,
            setParam: (
                key: string,
                value: string,
                nagivate: boolean = false
            ) => {
                setParams({ [key]: value }, nagivate);
            },
            setParams,
        }),
        [Router, isPending, setParams, params]
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
