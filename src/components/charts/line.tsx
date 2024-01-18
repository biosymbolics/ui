'use client';

import Typography from '@mui/joy/Typography';
import {
    LineChart as MuiLineChart,
    LineChartProps as MuiLineChartProps,
} from '@mui/x-charts/LineChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';

import { BaseChartProps } from './types';

type LineChartProps = BaseChartProps & {
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
 * Line chart
 */
export const Line = ({
    isArea = true,
    series,
    title,
    tooltip,
    ...props
}: LineChartProps): JSX.Element => {
    const xTicks = getXTicks(series);
    return (
        <>
            {title && <Typography level="h4">{title}</Typography>}
            <MuiLineChart
                {...props}
                colors={mangoFusionPalette}
                series={series.map((s) => ({
                    area: isArea,
                    label: s.name,
                    data: s.data.map(({ y }) => y),
                    showMark: ({ index }) => s.data[index].showMark || false,
                    stack: 'total',
                    valueFormatter: (value) =>
                        value == null ? 'NaN' : `${value}`,
                }))}
                slotProps={{ legend: { hidden: true } }}
                tooltip={tooltip}
                xAxis={[{ data: xTicks, id: 'Years', scaleType: 'point' }]}
            />
        </>
    );
};
