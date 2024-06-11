'use client';

import { useRouter } from 'next/navigation';
import { Vega, VisualizationSpec } from 'react-vega';

import { DEFAULT_VEGA_THEME } from './constants';
import { BaseChartProps } from './types';
import { ChartTitle } from './common/chart-title';

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

/**
 * Get Vega spec for Gantt chart
 */
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
 * Gantt chart
 */
export const Gantt = <DT extends Record<string, unknown>>({
    data,
    colorField,
    getClickUrl,
    subtitle,
    tooltipFields = [],
    title,
    variant,
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
            <ChartTitle subtitle={subtitle} title={title} variant={variant} />

            <Vega
                actions={false}
                spec={spec}
                data={{ data }}
                signalListeners={signalListeners}
                theme={DEFAULT_VEGA_THEME}
                width={width}
            />
        </>
    );
};
