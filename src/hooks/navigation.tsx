'use client';

import React, {
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useTransition,
} from 'react';
import { useRouter } from 'next/navigation';

type NavigationContextType = {
    isPending: boolean;
    navigate: (url: string) => void;
};

const NavigationContext = createContext({
    isPending: false,
    navigate: (url: string) => {
        console.warn(`No impl when attempting to route to ${url}`);
    },
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const Router = useRouter();
    const [isPending, startTransition] = useTransition();

    const context: NavigationContextType = useMemo(
        () => ({
            isPending,
            navigate: (url: string) => {
                startTransition(() => {
                    Router.push(url);
                });
            },
        }),
        [Router, isPending]
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
