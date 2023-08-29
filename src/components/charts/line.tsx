'use client';

import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import { useNavigation } from '@/hooks/navigation';
import theme from '@/theme';

import { AnnotationSpec, ChartOptions, BasicChartProps } from './types';

type LineChartProps = BasicChartProps;

const defaultColor = theme.colorSchemes.light.palette.primary[400];
const defaultColorDark = theme.colorSchemes.light.palette.primary[700];

const getAnnotations = (
    annotations: AnnotationSpec[],
    setAnnotation: (label: string | null) => void
) =>
    annotations
        .filter((a) => !a.type || a.type === 'xaxis')
        .map(({ color, label, x }) => ({
            x: new Date(x).getTime(),
            borderColor: color || defaultColor,
            strokeDashArray: 5,
            marker: {
                size: 12,
                fillColor: 'white',
                strokeColor: color || defaultColor,
            },
            label: {
                style: {
                    fontSize: '12px',
                    color: 'white',
                    background: defaultColorDark,
                },
                offsetX: 0,
                offsetY: -5,
                text: x,
                mouseEnter: () => setAnnotation(label),
                mouseLeave: () => setAnnotation(null),
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
            <Sheet
                color={annotation ? 'primary' : undefined}
                sx={{ minHeight: 100, p: 3 }}
                variant={annotation ? 'outlined' : undefined}
            >
                {annotation && (
                    <Typography level="body-md">{annotation}</Typography>
                )}
            </Sheet>
            <Chart {...props} options={options} series={series} type="line" />
        </>
    );
};
