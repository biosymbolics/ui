'use client';

import { Button } from '@/components/input/button';

/**
 * Global error
 */
export const GlobalError = ({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) => (
    <html lang="en">
        <body>
            <h2>Something went wrong!</h2>
            <p>{error.message}</p>
            <Button onClick={() => reset()}>Try again</Button>
        </body>
    </html>
);

export default GlobalError;
