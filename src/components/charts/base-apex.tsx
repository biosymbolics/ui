'use client';

import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';
import { useColorScheme } from '@mui/joy/styles';

import { useNavigation } from '@/hooks/navigation';
import theme from '@/theme';

import { ChartOptions, BasicChartProps } from './types';
import { AnnotationDetail, getAnnotations } from './annotation';

type BaseApexChartProps = BasicChartProps & {
    additionalOptions?: ChartOptions;
    type: 'heatmap' | 'line' | 'scatter';
};

/**
 * Base chart
 */
export const BaseApexChart = ({
    additionalOptions,
    annotations = [],
    colors,
    pathname,
    series,
    title,
    type,
    ...props
}: BaseApexChartProps): JSX.Element => {
    const { mode } = useColorScheme();
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
        colors: colors || [theme.colorSchemes.light.palette.primary[400]],
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
                    navigate(`${pathname}?terms=${term}`);
                },
            },
            type: 'scatter',
        },
        dataLabels: {
            enabled: false,
        },
        grid: { padding: { right: 30, left: 20 } },
        series,
        title: {
            text: title,
            align: 'left',
            style: mode === 'dark' ? { color: 'white' } : {},
        },
        xaxis: {
            type: 'datetime',
            labels: mode === 'dark' ? { style: { colors: 'white' } } : {},
        },
        yaxis: {
            labels: mode === 'dark' ? { style: { colors: 'white' } } : {},
        },
        ...additionalOptions,
    };

    return (
        <>
            <Chart {...props} options={options} series={series} type={type} />
            <AnnotationDetail annotation={annotation} />
        </>
    );
};
