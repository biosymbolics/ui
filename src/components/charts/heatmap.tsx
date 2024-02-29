'use client';

import { useRouter } from 'next/navigation';
import { Vega, VisualizationSpec } from 'react-vega';

import { DEFAULT_VEGA_THEME } from './constants';
import { BaseChartProps } from './types';
import { ChartTitle } from './common/chart-title';

type HeadmapSpecProps = {
    colorField?: string;
    tooltipFields?: string[];
    xField: string;
    yField: string;
    xFieldTitle?: string;
    yFieldTitle?: string;
};

type HeatmapProps<DT extends Record<string, unknown>> = BaseChartProps & {
    data: DT[];
    getClickUrl?: (obj: DT) => string;
    width?: number;
} & HeadmapSpecProps;

const getSpec: (props: HeadmapSpecProps) => VisualizationSpec = ({
    tooltipFields = [],
    xField,
    xFieldTitle,
    yField,
    yFieldTitle,
    colorField = 'count',
}) => ({
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 'container',
    height: { step: 30 },
    background: 'transparent',
    data: {
        name: 'data',
    },
    mark: {
        type: 'rect',
        cursor: 'pointer',
        tooltip: true,
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
        x: { field: xField, type: 'nominal', title: xFieldTitle },
        y: { field: yField, type: 'nominal', title: yFieldTitle },
        fill: {
            scale: { scheme: 'lightorange' },
            field: colorField,
            type: 'quantitative',
        },
        fillOpacity: {
            condition: { param: 'highlight', value: 0.9 },
            value: 1,
        },
        tooltip: [
            { field: xField, type: 'nominal' },
            { field: yField, type: 'nominal' },
            { field: colorField, type: 'quantitative' },
            ...tooltipFields.map((f) => ({ field: f })),
        ],
    },
    config: {
        font: 'monospace',
        axis: { grid: true, tickBand: 'extent' },
        axisX: {
            orient: 'top',
            labelFontSize: 12,
            labelAngle: -30,
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
export const Heatmap = <DT extends Record<string, unknown>>({
    data,
    colorField,
    getClickUrl,
    tooltipFields = [],
    subtitle,
    title,
    xField,
    yField,
    xFieldTitle = '',
    yFieldTitle = '',
    width = 800,
    variant = 'default',
}: HeatmapProps<DT>): JSX.Element => {
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
