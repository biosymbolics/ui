import { ApexOptions } from 'apexcharts';

export type ChartSeries = {
    data: { x: string; y: [number, number] }[];
};

export type ChartOptions = ApexOptions;

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
    title?: string;
    width?: number;
};

export type BaseApexChartProps = BaseChartProps & {
    annotations?: AnnotationSpec[];
    colors?: string[];
    series: ApexOptions['series'];
};

export type SparklineProps = {
    data: number[];
    height: number;
    width: number;
};

export type DataSpec = { label: string | number; value: number; url?: string };
