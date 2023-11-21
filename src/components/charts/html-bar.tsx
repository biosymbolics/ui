'use client';

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-array-index-key */

import { styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import max from 'lodash/fp/max';
import truncate from 'lodash/fp/truncate';

import { useNavigation } from '@/hooks/navigation';
import { getSelectableId, formatLabel } from '@/utils/string';

import { DataSpec } from './types';

type BarChartProps = {
    data: DataSpec[];
    label: string | number;
    maxLength?: number;
};

const StyledTr = styled('tr')(({ theme }) => ({
    [theme.getColorSchemeSelector('dark')]: {},
    [theme.getColorSchemeSelector('light')]: {
        background: theme.palette.primary[50],
    },
    height: '30px',
    overflow: 'hidden',
    position: 'relative',
    textOverflow: 'ellipsis',
    '& div': {
        fontWeight: 'bold',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
    },
}));

const StyledBar = styled('div')(({ theme }) => ({
    [theme.getColorSchemeSelector('dark')]: {
        background: theme.palette.primary[600],
        '&:hover': {
            backgroundColor: theme.palette.primary[800], // Darker on hover
        },
    },
    [theme.getColorSchemeSelector('light')]: {
        background: theme.palette.primary[200],
        '&:hover': {
            backgroundColor: theme.palette.primary[300], // Darker on hover
        },
    },
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
    transition: 'background-color 0.3s',
    whiteSpace: 'nowrap',
}));

/**
 * HTML Bar chart
 */
export const Bar = ({ data, label, maxLength = 100 }: BarChartProps) => {
    const { navigate } = useNavigation();
    const maxValue = max(data.map((item) => item.value)) ?? 0;
    const rows = data.slice(0, maxLength).map((item, index) => (
        <StyledTr
            id={getSelectableId(`${label} ${item.label}`)}
            key={getSelectableId(`${label} ${item.label} ${index}`)}
            onClick={item?.url ? () => navigate(item.url || '') : undefined}
        >
            <td style={{ width: '100%' }}>
                <StyledBar
                    sx={{
                        width: `${(item.value / maxValue) * 100}%`,
                    }}
                >
                    <Box sx={{ left: 10 }}>
                        <span>
                            {formatLabel(
                                truncate(
                                    { length: 38, omission: '...' },
                                    item.label as string
                                ),
                                '^WO-.*$'
                            )}
                        </span>
                    </Box>
                </StyledBar>
                <Box right={10}>{item.value}</Box>
            </td>
        </StyledTr>
    ));

    return (
        <Grid xs={12} sm={6} md={4}>
            <Typography level="h3">{formatLabel(label)}</Typography>
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
                <Bar
                    key={getSelectableId(spec.label)}
                    maxLength={maxLength}
                    {...spec}
                />
            ))}
    </Grid>
);
