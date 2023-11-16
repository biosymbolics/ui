'use client';

import { usePathname } from 'next/navigation';
import Chart from 'react-apexcharts';
import get from 'lodash/fp/get';
import isEmpty from 'lodash/fp/isEmpty';
import isNumber from 'lodash/fp/isNumber';

import { useNavigation } from '@/hooks/navigation';

import { ChartOptions, BaseApexChartProps } from './types';

type BarChartProps = BaseApexChartProps & {
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
    const pathname = usePathname();
    const { navigate } = useNavigation();

    if (isEmpty(series)) {
        return <span>No data</span>;
    }

    const options: ChartOptions = {
        chart: {
            events: {
                dataPointSelection: (
                    event,
                    chartContext,
                    config: Record<string, unknown>
                ) => {
                    const idx = get('dataPointIndex', config);
                    const term = idx && isNumber(idx) ? labels[idx] : null;

                    if (!term) {
                        console.warn("Couldn't find term for index", idx);
                        return;
                    }
                    navigate(`${pathname}?terms=${term}`);
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
            labels: {
                maxHeight: 400,
            },
        },
        yaxis: {
            labels: {
                offsetX: 100,
            },
        },
    };

    return <Chart {...props} options={options} series={series} type="bar" />;
};
