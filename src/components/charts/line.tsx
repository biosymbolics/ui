'use client';

import {
    LineChart as MuiLineChart,
    LineChartProps as MuiLineChartProps,
} from '@mui/x-charts/LineChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';

import { BaseChartProps } from './types';
import { ChartTitle } from './common/chart-title';

type ChartStackType = string; // 'total'

type LineChartProps = BaseChartProps & {
    controls?: React.ReactNode;
    defaultStack?: ChartStackType;
    isArea?: boolean;
    series: {
        name: string;
        data: { showMark?: boolean; x: string | number; y: number }[];
    }[];
    tooltip?: MuiLineChartProps['tooltip'];
};

/**
 * Get x ticks (taken from the longest series)
 * @param series
 * @returns x ticks
 */
const getXTicks = (series: LineChartProps['series']) =>
    (
        series.sort((a, b) => b.data.length - a.data.length).slice(0)[0] || {
            data: [],
        }
    ).data.map(({ x }) => `${x}`);

/**
 * Line chart component (using MUI charts)
 */
export const Line = ({
    controls,
    defaultStack,
    isArea = true,
    series,
    subtitle,
    title,
    tooltip,
    variant = 'default',
    ...props
}: LineChartProps): JSX.Element => {
    const xTicks = getXTicks(series);
    return (
        <>
            <ChartTitle
                controls={controls}
                subtitle={subtitle}
                title={title}
                variant={variant}
            />
            <MuiLineChart
                {...props}
                colors={mangoFusionPalette}
                series={series.map((s) => ({
                    area: isArea,
                    label: s.name,
                    data: s.data.map(({ y }) => y),
                    showMark: ({ index }) => s.data[index].showMark || false,
                    stack: defaultStack || isArea ? 'total' : undefined,
                    valueFormatter: (value) =>
                        value == null ? 'NaN' : `${value}`,
                }))}
                slotProps={{ legend: { hidden: false } }}
                tooltip={tooltip}
                xAxis={[{ data: xTicks, id: 'Years', scaleType: 'point' }]}
            />
        </>
    );
};
