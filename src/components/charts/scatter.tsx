'use client';

import { BaseApexChart } from './base-apex';
import { BaseApexChartProps } from './types';

type ScatterProps = BaseApexChartProps;

/**
 * Scatter
 */
export const Scatter = ({ ...props }: ScatterProps): JSX.Element => (
    <BaseApexChart {...props} type="scatter" />
);
