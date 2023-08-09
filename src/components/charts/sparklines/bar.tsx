import Chart from 'react-apexcharts'

import { ChartOptions, SparklineProps } from '../types'

/**
 * Sparkline bar
 */
export const Sparkbar = ({
    data,
    height = 35,
    width = 100,
}: SparklineProps): JSX.Element => {
    const options: ChartOptions = {
        tooltip: {
            fixed: { enabled: false },
            x: { show: false },
            y: { title: { formatter: () => '' } },
            marker: { show: false },
        },
        plotOptions: {
            bar: {
                columnWidth: '80%',
            },
        },
        xaxis: {
            crosshairs: {
                width: 1,
            },
        },
        series: data,
    }

    return (
        <Chart
            height={height}
            options={options}
            sparkline={{ enabled: true }}
            type="bar"
            width={width}
        />
    )
}
