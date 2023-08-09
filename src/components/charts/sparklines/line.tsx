import Chart from 'react-apexcharts'

import { ChartOptions, SparklineProps } from '../types'

/**
 * Sparkline line
 */
export const Sparkline = ({
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
        series: data,
    }

    return (
        <Chart
            height={height}
            options={options}
            sparkline={{ enabled: true }}
            type="line"
            width={width}
        />
    )
}
