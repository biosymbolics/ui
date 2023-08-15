'use client';

import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';

import { ChartOptions, BasicChartProps } from './types';

type BarChartProps = BasicChartProps & {
    labels: string[];
};

// grouped = (
//     col_df.groupby(column).agg(pl.count()).sort("count").reverse().limit(LIMIT)
// )

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

    const options: ChartOptions = {
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
