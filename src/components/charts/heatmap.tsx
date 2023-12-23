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
    data: {
        name: 'data',
    },
    mark: 'rect',
    encoding: {
        y: { field: 'tail', type: 'nominal' },
        x: { field: 'head', type: 'nominal' },
        color: {
            field: 'size',
        },
        fill: {
            field: 'size',
            type: 'quantitative',
            scale: {
                range: ['lightgrey', 'purple'],
            },
        },
    },
    config: {
        axis: { grid: true, tickBand: 'extent' },
    },
};

/**
 * Graph chart
 */
export const Heatmap = ({
    data,
    title,
    ...props
}: HeatmapProps): JSX.Element => (
    <>
        {title && <Typography level="title-md">{title}</Typography>}

        <Vega spec={spec} data={{ data }} {...props} />
    </>
);
