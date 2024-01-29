'use client';

import { useRouter } from 'next/navigation';
import Typography from '@mui/joy/Typography';
import { Vega, VisualizationSpec } from 'react-vega';

import { BaseChartProps } from './types';

type GanttSpecProps = {
    colorField?: string;
    tooltipFields?: string[];
    xField: string;
    x2Field: string;
    yField: string;
    xFieldTitle?: string;
    yFieldTitle?: string;
};

type GanttProps<DT extends Record<string, unknown>> = BaseChartProps & {
    data: DT[];
    getClickUrl?: (obj: DT) => string;
    width?: number;
} & GanttSpecProps;

const getSpec: (props: GanttSpecProps) => VisualizationSpec = ({
    tooltipFields = [],
    xField,
    x2Field,
    xFieldTitle,
    yField,
    yFieldTitle,
    colorField,
}) => ({
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: { step: 60 },
    background: 'transparent',
    data: {
        name: 'data',
    },
    mark: {
        type: 'bar',
        cursor: 'pointer',
        tooltip: true,
        width: { band: 0.7 },
    },
    params: [
        {
            name: 'highlight',
            select: { type: 'point', on: 'pointerover' },
        },
        {
            name: 'select',
            select: {
                fields: tooltipFields,
                on: 'click',
                type: 'point',
            },
        },
    ],
    encoding: {
        color: { field: colorField },
        x: { field: xField, type: 'quantitative', title: xFieldTitle },
        x2: { field: x2Field, title: xFieldTitle },
        y: { field: yField, type: 'ordinal', title: yFieldTitle },
        tooltip: [
            { field: xField, type: 'quantitative', title: 'start' }, // TODO
            { field: x2Field, type: 'quantitative', title: 'end' }, // TODO
            { field: yField, type: 'ordinal', title: yFieldTitle || yField },
            ...tooltipFields.map((f) => ({ field: f })),
        ],
    },
    config: {
        font: 'monospace',
        axisX: {
            orient: 'bottom',
            labelFontSize: 12,
        },
        axisY: {
            labelFontSize: 12,
            labelLimit: 250,
        },
    },
});

/**
 * Graph chart
 */
export const Gantt = <DT extends Record<string, unknown>>({
    data,
    colorField,
    getClickUrl,
    tooltipFields = [],
    title,
    xField = 'start',
    x2Field = 'end',
    yField,
    xFieldTitle = '',
    yFieldTitle = '',
    width = 800,
}: GanttProps<DT>): JSX.Element => {
    const router = useRouter();
    const signalListeners = {
        select: (_: unknown, value: unknown) => {
            if (!getClickUrl || typeof value !== 'object') {
                return;
            }
            const obj = value as DT;
            const url = getClickUrl(obj);
            router.push(url);
        },
    };

    const spec = getSpec({
        colorField,
        tooltipFields,
        xField,
        x2Field,
        yField,
        xFieldTitle,
        yFieldTitle,
    });
    return (
        <>
            {title && <Typography level="title-md">{title}</Typography>}

            <Vega
                spec={spec}
                data={{ data }}
                signalListeners={signalListeners}
                width={width}
            />
        </>
    );
};
