'use client';

/* eslint-disable react/no-array-index-key */

import { styled } from '@mui/joy/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import max from 'lodash/fp/max';

import { getSelectableId } from '@/utils/string';
import { useNavigation } from '@/hooks/navigation';

type BarChartProps = {
    data: { label: string; value: number; url?: string }[];
    label: string;
    maxLength?: number;
};

const StyledTr = styled('tr')(({ theme }) => ({
    background: theme.palette.background.level1,
    height: '30px',
    position: 'relative',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '& div': {
        fontWeight: 'bold',
        display: 'flex',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
    },
}));

const StyledBar = styled('div')(({ theme }) => ({
    background: theme.palette.primary[300],
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
    transition: 'background-color 0.3s',
    whiteSpace: 'nowrap',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&:hover': {
        backgroundColor: theme.palette.primary[500], // Darkened color on hover
    },
}));

/**
 * HTML Bar chart
 */
export const Bar = ({ data, label, maxLength = 100 }: BarChartProps) => {
    const { navigate } = useNavigation();
    const maxValue = max(data.map((item) => item.value)) ?? 0;
    const rows = data.slice(0, maxLength).map((item, index) => (
        <StyledTr
            key={`${getSelectableId(label)}-${index}`}
            onClick={item?.url ? () => navigate(item.url || '') : undefined}
        >
            <td style={{ width: '100%' }}>
                <StyledBar
                    sx={{
                        width: `${(item.value / maxValue) * 100}%`,
                    }}
                >
                    <Box sx={{ left: 10 }}>
                        <span>{item.label}</span>
                    </Box>
                </StyledBar>
                <Box right={10}>{item.value}</Box>
            </td>
        </StyledTr>
    ));

    return (
        <Grid xs={12} sm={6} md={4}>
            <Typography level="h3">{label}</Typography>
            <table style={{ width: '100%' }}>
                <tbody>{rows}</tbody>
            </table>
        </Grid>
    );
};

/**
 * Grid of HTML bars
 */
export const Bars = ({
    maxLength,
    specs,
}: {
    maxLength?: number;
    specs: BarChartProps[];
}): JSX.Element => (
    <Grid container spacing={2}>
        {specs
            .filter((spec) => spec.data.length > 0)
            .map((spec) => (
                <Bar maxLength={maxLength} {...spec} />
            ))}
    </Grid>
);
