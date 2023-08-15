'use client';

/* eslint-disable react/no-array-index-key */

import { styled } from '@mui/joy/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import max from 'lodash/fp/max';

import { getSelectableId } from '@/utils/string';

const StyledTr = styled('tr')(({ theme }) => ({
    background: theme.palette.background.level1,
    height: '30px',
    position: 'relative',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '& div': {
        display: 'flex',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        fontWeight: 'bold',
        // width: '90%',
    },
}));

type BarChartProps = {
    label: string;
    data: { label: string; value: number }[];
};

const StyledBar = styled('div')(({ theme }) => ({
    background: theme.palette.primary[300], // MUI primary color
    cursor: 'pointer',
    height: '100%',
    transition: 'background-color 0.3s',
    whiteSpace: 'nowrap',
    position: 'relative',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '&:hover': {
        backgroundColor: theme.palette.primary[500], // Darkened color on hover
    },
}));

export const Bar = ({ data, label }: BarChartProps) => {
    const maxValue = max(data.map((item) => item.value)) ?? 0;
    return (
        <Grid xs={12} sm={6} md={4}>
            <Typography level="h3">{label}</Typography>
            <table style={{ width: '100%' }}>
                <tbody>
                    {data.map((item, index) => (
                        <StyledTr key={`${getSelectableId(label)}-${index}`}>
                            <td style={{ width: '100%' }}>
                                <StyledBar
                                    sx={{
                                        width: `${
                                            (item.value / maxValue) * 100
                                        }%`,
                                    }}
                                >
                                    <Box sx={{ left: '10px' }}>
                                        <span>{item.label}</span>
                                    </Box>
                                </StyledBar>
                                <Box right={10}>{item.value}</Box>
                            </td>
                        </StyledTr>
                    ))}
                </tbody>
            </table>
        </Grid>
    );
};

export const Bars = ({ specs }: { specs: BarChartProps[] }): JSX.Element => (
    <Grid container spacing={2}>
        {specs.map((spec) => (
            <Bar {...spec} />
        ))}
    </Grid>
);
