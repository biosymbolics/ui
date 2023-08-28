import Chart from 'react-apexcharts';

import { useNavigation } from '@/hooks/navigation';

import { ChartOptions, BasicChartProps } from './types';

/**
 * Timeline/gantt-style bar chart
 */
export const Timeline = ({
    height,
    pathname,
    series,
    title,
}: BasicChartProps): JSX.Element => {
    const { navigate } = useNavigation();

    const options: ChartOptions = {
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        chart: {
            events: {
                click: (
                    event,
                    chartContext,
                    config: {
                        globals: { seriesNames: string[] };
                        seriesIndex: number;
                    }
                ) => {
                    const seriesIdx = config?.seriesIndex || 0;
                    const term = config.globals?.seriesNames?.[seriesIdx];

                    if (!term) {
                        console.warn("Couldn't find term for index", seriesIdx);
                        return;
                    }
                    navigate(`${pathname}?terms=${term}`);
                },
            },
        },
        grid: { padding: { right: 30, left: 20 } },
        series,
        stroke: { curve: 'straight' },
        title: { text: title, align: 'left' },
        xaxis: { type: 'datetime' },
    };

    return <Chart height={height} options={options} type="rangeBar" />;
};
