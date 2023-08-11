import Box from '@mui/joy/Box';
import { ReactElement, ReactNode } from 'react';

type SectionProps = {
    children: ReactNode;
    mx?: number;
};

/**
 * Section
 */
export const Section = ({
    children,
    mx,
    ...props
}: SectionProps): ReactElement<SectionProps> => (
    <Box {...props} sx={{ position: 'relative', mx: mx || 0, my: 3 }}>
        {children}
    </Box>
);
