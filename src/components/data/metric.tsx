import Box from '@mui/joy/Box';
import Card, { CardProps } from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import isNumber from 'lodash/fp/isNumber';

import { formatLabel } from '@/utils/string';

type MetricProps = {
    color?: CardProps['color'];
    formatter?: (value: number | string) => string;
    label: string;
    tooltip?: string | JSX.Element;
    value: number | string;
};

/**
 * Metric component
 */
export const Metric = ({
    color,
    formatter,
    label,
    tooltip,
    value,
}: MetricProps): JSX.Element => {
    const format =
        formatter ||
        ((v: number | string) =>
            isNumber(v) ? `${parseFloat(v.toPrecision(2))}` : formatLabel(v));

    const metric = (
        <Card color={color} sx={{ textAlign: 'center' }} variant="soft">
            <Typography level="title-sm">{label}</Typography>
            <CardContent>
                <Typography level="h3">{format(value)}</Typography>
            </CardContent>
        </Card>
    );

    if (tooltip) {
        return (
            <Tooltip
                title={<Box sx={{ maxWidth: '300px' }}>{tooltip}</Box>}
                variant="outlined"
            >
                {metric}
            </Tooltip>
        );
    }
    return metric;
};
