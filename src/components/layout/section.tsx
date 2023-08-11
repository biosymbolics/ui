import Box from '@mui/joy/Box';
import { ReactElement, ReactNode } from 'react';

type SectionProps = {
    children: ReactNode;
};

/**
 * Section
 */
export const Section = ({
    children,
    ...props
}: SectionProps): ReactElement<SectionProps> => (
    <Box {...props} sx={{ position: 'relative', my: 3 }}>
        {children}
    </Box>
);
