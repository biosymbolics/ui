'use client';

import { useState } from 'react';
import Typography from '@mui/joy/Typography';
import { Vega, VisualizationSpec } from 'react-vega';

import { PatentCharacteristics } from '@/types/patents';

import { BaseChartProps } from './types';

type HeadmapSpecProps<T extends Record<string, unknown>> = {
    colorField?: string;
    getRows?: (terms: string[]) => Promise<T[]>;
    xField: string;
    yField: string;
    xFieldTitle?: string;
    yFieldTitle?: string;
};

type HeatmapProps<T extends Record<string, unknown>> = BaseChartProps & {
    data: PatentCharacteristics;
} & HeadmapSpecProps<T>;

const getSpec: <T extends Record<string, unknown>>(
    props: HeadmapSpecProps<T>
) => VisualizationSpec = ({
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
            select: { type: 'point', on: 'click' },
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
            { field: 'patents' },
        ],
    },
    config: {
        font: 'monospace',
        axis: { grid: true, tickBand: 'extent' },
        axisX: {
            orient: 'top',
            labelFontSize: 14,
            labelAngle: 0,
        },
        axisY: {
            labelFontSize: 12,
            labelLimit: 500,
        },
    },
});

/**
 * Graph chart
 */
export const Heatmap = <
    T extends Record<string, unknown> = Record<string, unknown>,
>({
    data,
    getRows,
    title,
    colorField,
    xField,
    yField,
    xFieldTitle = '',
    yFieldTitle = '',
}: HeatmapProps<T>): JSX.Element => {
    const [rows, setRows] = useState<T[]>();
    const handleSelect = async (...args: unknown[]) => {
        if (!getRows) {
            return;
        }
        const newRows = await getRows(args as string[]);
        setRows(newRows);
    };

    const signalListeners = {
        select: handleSelect,
    };

    const spec = getSpec({
        colorField,
        xField,
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
                width={800}
            />

            {rows && JSON.stringify(rows)}
        </>
    );
};
