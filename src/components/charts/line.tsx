'use client';

import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';

import { AnnotationSpec, ChartOptions, BasicChartProps } from './types';

type LineChartProps = BasicChartProps;

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
        }));

/**
 * Line chart
 * - supports annotations
 */
export const Line = ({
    annotations = [],
    series,
    title,
    ...props
}: LineChartProps): JSX.Element => {
    if (isEmpty(series)) {
        return <span>No data</span>;
    }

    const options: ChartOptions = {
        // annotations: {
        //     points: getPointAnnotations(annotations),
        // },
        // dataLabels: { enabled: false },
        // stroke: { curve: 'straight' },
        // grid: { padding: { right: 30, left: 20 } },
        series,
        // title: { text: title, align: 'left' },
        xaxis: { type: 'datetime' }, // datetime
        // yaxis: {
        //     labels: {
        //         offsetX: 100,
        //     },
        // },
    };

    return <Chart {...props} options={options} series={series} type="line" />;
};
