'use client';

import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';
import { useColorScheme } from '@mui/joy/styles';

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
        colors: [
            theme.colorSchemes.light.palette.primary[400],
            theme.colorSchemes.light.palette.success[400],
            theme.colorSchemes.light.palette.warning[400],
            theme.colorSchemes.light.palette.danger[400],
            theme.colorSchemes.light.palette.primary[600],
            theme.colorSchemes.light.palette.success[600],
            theme.colorSchemes.light.palette.warning[600],
            theme.colorSchemes.light.palette.danger[600],
            theme.colorSchemes.light.palette.primary[800],
            theme.colorSchemes.light.palette.success[800],
            theme.colorSchemes.light.palette.warning[800],
            theme.colorSchemes.light.palette.danger[800],
        ],
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
        },
        grid: { padding: { right: 30, left: 20 } },
        series,
        stroke: { curve: 'straight' },
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
    };

    return (
        <>
            <Chart {...props} options={options} series={series} type="line" />
            <AnnotationDetail annotation={annotation} />
        </>
    );
};
