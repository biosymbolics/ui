'use client';

import { BaseApexChart } from './base-apex';
import { BaseApexChartProps } from './types';

type HeatmapProps = BaseApexChartProps;

/**
 * Heatmap
 */
export const Heatmap = ({ ...props }: HeatmapProps): JSX.Element => (
    <BaseApexChart {...props} type="heatmap" />
);
