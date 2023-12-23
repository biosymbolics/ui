'use client';

import Typography from '@mui/joy/Typography';
import { Vega, VisualizationSpec } from 'react-vega';

import { PatentCharacteristics } from '@/types/patents';

import { BaseChartProps } from './types';

type HeatmapProps = BaseChartProps & {
    data: PatentCharacteristics;
};

const spec: VisualizationSpec = {
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
        x: { field: 'head', type: 'nominal', title: '' },
        y: { field: 'tail', type: 'nominal', title: '' },
        fill: {
            scale: { scheme: 'lightorange' },
            field: 'size',
            type: 'quantitative',
        },
        fillOpacity: {
            condition: { param: 'highlight', value: 0.9 },
            value: 1,
        },
    },
    config: {
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
};

/**
 * Graph chart
 */
export const Heatmap = ({ data, title }: HeatmapProps): JSX.Element => {
    const handleSelect = (...args: unknown[]) => {
        console.info(args);
    };

    const signalListeners = {
        select: handleSelect,
    };
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
