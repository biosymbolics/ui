import { ApexOptions } from 'apexcharts'

export type ChartSeries = {
    data: { x: string; y: [number, number] }[]
}

export type ChartOptions = ApexOptions

export type BasicChartProps = {
    data: ApexOptions['series']
    height: number
}
