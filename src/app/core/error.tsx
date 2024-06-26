'use client';

import { useEffect } from 'react';

import { Button } from '@/components/input';

/**
 * Simple fallback error component
 */
export const Error = ({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) => {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    );
};

export default Error;
