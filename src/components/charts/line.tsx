'use client';

import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import isEmpty from 'lodash/fp/isEmpty';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import { useNavigation } from '@/hooks/navigation';

import { AnnotationSpec, ChartOptions, BasicChartProps } from './types';

type LineChartProps = BasicChartProps;

const getPointAnnotations = (
    annotations: AnnotationSpec[],
    setAnnotation: (label: string | null) => void
) =>
    annotations
        .filter((a) => !a.type || a.type === 'point')
        .map(({ color, label, x, y }) => ({
            x: new Date(x).getTime(),
            y,
            marker: {
                size: 12,
                fillColor: 'white',
                strokeColor: color || '#fb923c',
                radius: 2,
            },
            label: {
                borderColor: color || '#fb923c',
                offsetY: 0,
                style: {
                    color: '#fff',
                    background: color || '#fb923c',
                },
                // text: label,
            },
            mouseEnter: () => setAnnotation(label),
            mouseLeave: () => setAnnotation(null),
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
    const pointAnnotations = useMemo(
        () => getPointAnnotations(annotations, setAnnotation),
        [annotations]
    );

    if (isEmpty(series)) {
        return <span>No data</span>;
    }

    const options: ChartOptions = {
        annotations: {
            points: pointAnnotations,
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

            <Sheet
                color={annotation ? 'warning' : undefined}
                sx={{ minHeight: 100, p: 3 }}
                variant="outlined"
            >
                {annotation && (
                    <Typography level="body-md">{annotation}</Typography>
                )}
            </Sheet>
        </>
    );
};
