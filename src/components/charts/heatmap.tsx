'use client';

import { BaseApexChart } from './base-apex';
import { BasicChartProps } from './types';

type HeatmapProps = BasicChartProps;

/**
 * Heatmap
 */
export const Heatmap = ({ ...props }: HeatmapProps): JSX.Element => (
    <BaseApexChart {...props} type="heatmap" />
);
