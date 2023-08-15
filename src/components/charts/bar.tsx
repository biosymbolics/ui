'use client';

import { usePathname } from 'next/navigation';
import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';

import { useNavigation } from '@/hooks/navigation';

import { ChartOptions, BasicChartProps } from './types';

type BarChartProps = BasicChartProps & {
    labels: string[];
};

/**
 * Standard bar chart
 */
export const Bar = ({
    labels,
    series,
    ...props
}: BarChartProps): JSX.Element | null => {
    if (isEmpty(series)) {
        return <span>No data</span>;
    }

    const pathname = usePathname();
    const { navigate } = useNavigation();

    const options: ChartOptions = {
        chart: {
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    navigate(
                        `${pathname}?terms=${labels[config.dataPointIndex]}`
                    );
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        series,
        xaxis: {
            categories: labels,
        },
    };

    return <Chart {...props} options={options} series={series} type="bar" />;
};
