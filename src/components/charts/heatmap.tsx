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
            labelFontSize: 14,
            labelAngle: 0,
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
    clickField,
    colorField,
    pathname,
    title,
    xField,
    yField,
    xFieldTitle = '',
    yFieldTitle = '',
}: HeatmapProps): JSX.Element => {
    const router = useRouter();
    const signalListeners = {
        select: (_: unknown, value: unknown) => {
            console.info(value);
            if (!clickField || typeof value !== 'object') {
                return;
            }
            const obj = value as Record<string, unknown>;
            const urlTerms = (obj[clickField] as string[]).join(';');
            console.info('Going to ', `${pathname}?terms=${urlTerms}`);
            router.push(`${pathname}?terms=${urlTerms}`);
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
