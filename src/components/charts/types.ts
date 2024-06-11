export type ChartVariant = 'default' | 'minimal';

export type BaseChartProps = {
    height?: number;
    pathname: string;
    subtitle?: string;
    title?: string;
    variant?: ChartVariant;
    width?: number;
};

export type DataSpec = { label: string | number; value: number; url?: string };
