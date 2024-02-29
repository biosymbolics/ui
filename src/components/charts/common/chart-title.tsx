import Typography from '@mui/joy/Typography';

import { ChartVariant } from '../types';

type ChartTitleProps = {
    subtitle?: string;
    title?: string;
    variant?: ChartVariant;
};

export const ChartTitle = ({ subtitle, title, variant }: ChartTitleProps) => (
    <>
        {title && (
            <Typography level={variant === 'minimal' ? 'title-md' : 'h4'}>
                {title}
            </Typography>
        )}
        {subtitle && (
            <Typography level={variant === 'minimal' ? 'title-sm' : 'title-md'}>
                <i>{subtitle}</i>
            </Typography>
        )}
    </>
);
