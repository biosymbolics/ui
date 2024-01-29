'use client';

import Chart from 'react-apexcharts';
import { useColorScheme } from '@mui/joy/styles';

import { useNavigation } from '@/hooks/navigation';
import theme from '@/theme';

import { ChartOptions, BaseApexChartProps } from './types';

/**
 * Timeline/gantt-style bar chart
 */
export const Timeline = ({
    height,
    pathname,
    series,
    title,
}: BaseApexChartProps): JSX.Element => {
    const { navigate } = useNavigation();
    const { mode } = useColorScheme();

    const options: ChartOptions = {
        dataLabels: {
            enabled: false,
        },
        yaxis: {
            labels: mode === 'dark' ? { style: { colors: 'white' } } : {},
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        colors: [theme.colorSchemes.light.palette.primary[400]],
        chart: {
            events: {
                click: (
                    event,
                    chartContext,
                    config: {
                        globals: { seriesNames: string[] };
                        seriesIndex: number;
                    }
                ) => {
                    const seriesIdx = config?.seriesIndex || 0;
                    const term = config.globals?.seriesNames?.[seriesIdx];

                    if (!term) {
                        console.warn("Couldn't find term for index", seriesIdx);
                        return;
                    }
                    navigate(`${pathname}?terms=${term}`);
                },
            },
        },
        grid: { padding: { right: 30, left: 20 } },
        series,
        stroke: { curve: 'straight' },
        title: { text: title, align: 'left' },
        xaxis: { type: 'datetime' },
    };

    return (
        <Chart
            height={height}
            options={options}
            series={series}
            type="rangeBar"
        />
    );
};
