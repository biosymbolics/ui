'use client';

import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';

import { useNavigation } from '@/hooks/navigation';
import theme from '@/theme';

import { ChartOptions, BasicChartProps } from './types';
import { AnnotationDetail, getAnnotations } from './annotation';

type LineChartProps = BasicChartProps;

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
    const [annotation, setAnnotation] = useState<string | null>(null);
    const xAxisAnnotations = useMemo(
        () => getAnnotations(annotations, setAnnotation),
        [annotations]
    );

    if (isEmpty(series)) {
        return <span>No data</span>;
    }

    const options: ChartOptions = {
        annotations: {
            xaxis: xAxisAnnotations,
        },
        markers: {
            colors: [theme.colorSchemes.light.palette.primary[400]],
        },
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
                    if (false) {
                        navigate(`${pathname}?terms=${term}`);
                    }
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
        <>
            <Chart {...props} options={options} series={series} type="line" />
            <AnnotationDetail annotation={annotation} />
        </>
    );
};
