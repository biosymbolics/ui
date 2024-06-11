import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import { ChartVariant } from '../types';

type ChartTitleProps = {
    controls?: React.ReactNode;
    subtitle?: string;
    title?: string;
    variant?: ChartVariant;
};

/**
 * Chart title component
 */
export const ChartTitle = ({
    controls,
    subtitle,
    title,
    variant,
}: ChartTitleProps) => (
    <Box display="flex" justifyContent="space-between">
        <Box>
            {title && (
                <Typography level={variant === 'minimal' ? 'title-md' : 'h4'}>
                    {title}
                </Typography>
            )}
            {subtitle && (
                <Typography
                    level={variant === 'minimal' ? 'title-sm' : 'title-md'}
                >
                    <i>{subtitle}</i>
                </Typography>
            )}
        </Box>

        {controls}
    </Box>
);
