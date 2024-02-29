export type ChartSeries = {
    data: { x: string; y: [number, number] }[];
};

type AnnotationType = 'xaxis'; // TODO more

export type AnnotationSpec = {
    color?: string;
    x: string;
    y?: number;
    label: string;
    type?: AnnotationType;
};

export type BaseChartProps = {
    height?: number;
    pathname: string;
    subtitle?: string;
    title?: string;
    width?: number;
};

export type SparklineProps = {
    data: number[];
    height: number;
    width: number;
};

export type DataSpec = { label: string | number; value: number; url?: string };
