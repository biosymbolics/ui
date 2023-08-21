import { ApexOptions } from 'apexcharts';

export type ChartSeries = {
    data: { x: string; y: [number, number] }[];
};

export type ChartOptions = ApexOptions;

type AnnotationType = 'point'; // TODO more

export type AnnotationSpec = {
    color: string;
    x: string;
    y: number;
    label: string;
    type: AnnotationType;
};

export type BasicChartProps = {
    annotations?: AnnotationSpec[];
    height?: number;
    series: ApexOptions['series'];
    title?: string;
    width?: number;
};

export type SparklineProps = {
    data: number[];
    height: number;
    width: number;
};

export type DataSpec = { label: string; value: number; url?: string };
