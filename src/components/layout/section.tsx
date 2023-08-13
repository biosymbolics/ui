import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import { BoxProps } from '@mui/material/Box';
import { ReactElement, ReactNode } from 'react';

const SectionTypes = {
    l1: 'l1', // primary section, 3 units of space in between
    l2: 'l2', // subsection, 1 unit of space in between
    main: 'main', // page; on a sheeet and full height
    separated: 'separated', // on a  sheet
};

type SectionProps = {
    children: ReactNode;
    mx?: number;
    sx?: BoxProps['sx'];
    variant?: keyof typeof SectionTypes;
};

/**
 * Section
 */
export const Section = ({
    children,
    mx,
    variant = 'l1',
    ...props
}: SectionProps): ReactElement<SectionProps> => {
    const sxProps = {
        display: 'flex',
        flexDirection: 'column',
        mx: mx || 0,
        my: variant === 'l2' ? 1 : 3,
    };

    if (variant === 'separated') {
        return (
            <Sheet {...props} sx={{ p: 3, ...sxProps }}>
                {children}
            </Sheet>
        );
    }

    if (variant === 'main') {
        return (
            <Sheet {...props} sx={{ minHeight: 1000, p: 3, ...sxProps }}>
                {children}
            </Sheet>
        );
    }

    // not on a sheet
    return (
        <Box {...props} sx={{ position: 'relative', ...sxProps }}>
            {children}
        </Box>
    );
};
