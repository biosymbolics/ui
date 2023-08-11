import Tooltip from '@mui/joy/Tooltip';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

type MetricProps = {
    label: string;
    tooltip?: string | JSX.Element;
    value: number;
};

/**
 * Metric component
 */
export const Metric = ({ label, tooltip, value }: MetricProps): JSX.Element => {
    const metric = (
        <Card sx={{ maxWidth: 200, textAlign: 'center' }} variant="soft">
            <Typography level="title-md">{label}</Typography>
            <CardContent>
                <Typography level="h1">{value.toPrecision(2)}</Typography>
            </CardContent>
        </Card>
    );

    if (tooltip) {
        return (
            <Tooltip title={tooltip} variant="outlined">
                {metric}
            </Tooltip>
        );
    }
    return metric;
};
