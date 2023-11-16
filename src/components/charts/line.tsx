'use client';

import theme from '@/theme';

import { ChartOptions, BaseApexChartProps } from './types';
import { BaseApexChart } from './base-apex';

type LineChartProps = BaseApexChartProps;

/**
 * Line chart
 */
export const Line = (props: LineChartProps): JSX.Element => {
    const colors = [
        theme.colorSchemes.light.palette.primary[400],
        theme.colorSchemes.light.palette.success[400],
        theme.colorSchemes.light.palette.warning[400],
        theme.colorSchemes.light.palette.danger[400],
        theme.colorSchemes.light.palette.primary[600],
        theme.colorSchemes.light.palette.success[600],
        theme.colorSchemes.light.palette.warning[600],
        theme.colorSchemes.light.palette.danger[600],
        theme.colorSchemes.light.palette.primary[800],
        theme.colorSchemes.light.palette.success[800],
        theme.colorSchemes.light.palette.warning[800],
        theme.colorSchemes.light.palette.danger[800],
    ];

    const options: ChartOptions = {
        stroke: { curve: 'straight' },
    };

    return (
        <BaseApexChart
            {...props}
            additionalOptions={options}
            colors={colors}
            type="line"
        />
    );
};
