'use client';

import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';
import get from 'lodash/fp/get';

import { useNavigation } from '@/hooks/navigation';

import { AnnotationSpec, ChartOptions, BasicChartProps } from './types';

type LineChartProps = BasicChartProps & { pathname: string };

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
    pathname,
    series,
    title,
    ...props
}: LineChartProps): JSX.Element => {
    const { navigate } = useNavigation();

    if (isEmpty(series)) {
        return <span>No data</span>;
    }

    const options: ChartOptions = {
        annotations: {
            points: getPointAnnotations(annotations),
        },
        chart: {
            events: {
                dataPointSelection: (
                    event,
                    chartContext,
                    config: Record<string, unknown>
                ) => {
                    const idx = get('dataPointIndex', config);
                    const term = idx;

                    if (!term) {
                        console.warn("Couldn't find term for index", idx);
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

    return <Chart {...props} options={options} series={series} type="line" />;
};
