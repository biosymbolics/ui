'use client';

import { useRouter } from 'next/navigation';
import Typography from '@mui/joy/Typography';
import { Vega, VisualizationSpec } from 'react-vega';

import { PatentCharacteristics } from '@/types/patents';

import { BaseChartProps } from './types';

type HeadmapSpecProps = {
    colorField?: string;
    xField: string;
    yField: string;
    xFieldTitle?: string;
    yFieldTitle?: string;
};

type HeatmapProps = BaseChartProps & {
    clickBaseUrl?: string; // TODO: both or neither with clickField
    clickField?: string;
    data: PatentCharacteristics;
} & HeadmapSpecProps;

const getSpec: (props: HeadmapSpecProps) => VisualizationSpec = ({
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
                fields: ['patents'],
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
            { field: 'patents' },
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
export const Heatmap = ({
    data,
    clickBaseUrl,
    clickField,
    colorField,
    title,
    xField,
    yField,
    xFieldTitle = '',
    yFieldTitle = '',
}: HeatmapProps): JSX.Element => {
    const router = useRouter();
    const signalListeners = {
        select: (_: unknown, value: unknown) => {
            if (!clickField || typeof value !== 'object') {
                return;
            }
            const obj = value as Record<string, unknown>;
            const urlParams = (obj[clickField] as string[]).join(';');
            router.push(`${clickBaseUrl}${urlParams}`);
        },
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
        </>
    );
};
