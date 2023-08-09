import Chart from 'react-apexcharts'

import { ChartOptions, BasicChartProps } from './types'

/**
 * Timeline/gantt-style bar chart
 */
export const Timeline = ({ data, height }: BasicChartProps): JSX.Element => {
    const options: ChartOptions = {
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            type: 'datetime',
        },
        series: data,
    }

    return <Chart height={height} options={options} type="rangeBar" />
}
