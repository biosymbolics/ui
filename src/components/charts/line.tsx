import Chart from 'react-apexcharts'

import { AnnotationSpec, ChartOptions, BasicChartProps } from './types'

const getPointAnnotations = (annotations: AnnotationSpec[]) =>
    annotations
        .filter((a) => a.type === 'point')
        .map(({ color, label, x, y }) => ({
            x,
            y,
            marker: {
                size: 8,
                fillColor: 'white',
                strokeColor: color,
                radius: 2,
                cssClass: 'apexcharts-custom-class', // TODO
            },
            label: {
                borderColor: color,
                offsetY: 0,
                style: {
                    color: '#fff',
                    background: color,
                },
                text: label,
            },
        }))

/**
 * Line chart
 * - supports annotations
 */
export const Line = ({
    annotations = [],
    data,
    height,
    title,
}: BasicChartProps): JSX.Element => {
    const options: ChartOptions = {
        annotations: {
            points: getPointAnnotations(annotations),
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'straight',
        },
        grid: {
            padding: {
                right: 30,
                left: 20,
            },
        },
        title: {
            text: title,
            align: 'left',
        },
        // labels: data.monthDataSeries1.dates,
        xaxis: {
            type: 'datetime',
        },
        series: data,
    }

    return <Chart height={height} options={options} type="line" />
}
