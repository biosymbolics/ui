'use client';

import { BaseApexChart } from './base-apex';
import { BasicChartProps } from './types';

type ScatterProps = BasicChartProps;

/**
 * Scatter
 */
export const Scatter = ({ ...props }: ScatterProps): JSX.Element => (
    <BaseApexChart {...props} type="scatter" />
);
