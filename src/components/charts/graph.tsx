'use client';

import Typography from '@mui/joy/Typography';
import { Vega } from 'react-vega';

import { PatentGraph } from '@/types/patents';

import { BaseChartProps } from './types';

type GraphProps = BaseChartProps & {
    data: PatentGraph;
};

const spec = {
    $schema: 'https://vega.github.io/schema/vega/v5.json',
    description:
        'A network diagram of software dependencies, with edges grouped via hierarchical edge bundling.',
    padding: 20,
    width: 1000,
    height: 1000,
    autosize: 'none',

    signals: [
        {
            name: 'tension',
            value: 0.95,
        },
        {
            name: 'radius',
            value: 280,
        },
        {
            name: 'extent',
            value: 360,
        },
        {
            name: 'rotate',
            value: 0,
        },
        {
            name: 'textSize',
            value: 12,
        },
        {
            name: 'textOffset',
            value: 3,
        },
        {
            name: 'layout',
            value: 'cluster',
        },
        { name: 'colorIn', value: 'blue' },
        { name: 'colorOut', value: 'blue' },
        { name: 'originX', update: 'width / 2' },
        { name: 'originY', update: 'height / 2' },
        {
            name: 'active',
            value: null,
            on: [
                { events: 'text:pointerover', update: 'datum.id' },
                { events: 'pointerover[!event.item]', update: 'null' },
            ],
        },
    ],

    data: [
        {
            name: 'nodes',
            transform: [
                {
                    type: 'stratify',
                    key: 'id',
                    parentKey: 'parent',
                },
                {
                    type: 'tree',
                    method: { signal: 'layout' },
                    size: [1, 1],
                    as: ['alpha', 'beta', 'depth', 'children'],
                },
                {
                    type: 'formula',
                    expr: '(rotate + extent * datum.alpha + 270) % 360',
                    as: 'angle',
                },
                {
                    type: 'formula',
                    expr: 'inrange(datum.angle, [90, 270])',
                    as: 'leftside',
                },
                {
                    type: 'formula',
                    expr: 'originX + radius * datum.beta * cos(PI * datum.angle / 180)',
                    as: 'x',
                },
                {
                    type: 'formula',
                    expr: 'originY + radius * datum.beta * sin(PI * datum.angle / 180)',
                    as: 'y',
                },
            ],
        },
        {
            name: 'leaves',
            source: 'nodes',
            transform: [
                {
                    type: 'filter',
                    expr: '!datum.children',
                },
            ],
        },
        {
            name: 'edges',
            transform: [
                {
                    type: 'formula',
                    expr: "treePath('nodes', datum.source, datum.target)",
                    as: 'treepath',
                    initonly: true,
                },
            ],
        },
        {
            name: 'selected',
            source: 'edges',
            transform: [
                {
                    type: 'filter',
                    expr: 'datum.source === active || datum.target === active',
                },
            ],
        },
    ],

    marks: [
        {
            type: 'text',
            from: { data: 'leaves' },
            encode: {
                enter: {
                    text: { field: 'label' },
                    baseline: { value: 'middle' },
                },
                update: {
                    x: { field: 'x' },
                    y: { field: 'y' },
                    dx: { signal: 'textOffset * (datum.leftside ? -1 : 1)' },
                    angle: {
                        signal: 'datum.leftside ? datum.angle - 180 : datum.angle',
                    },
                    align: { signal: "datum.leftside ? 'right' : 'left'" },
                    fontSize: { signal: 'textSize' },
                    fontWeight: [
                        {
                            test: "indata('selected', 'source', datum.id)",
                            value: 'bold',
                        },
                        {
                            test: "indata('selected', 'target', datum.id)",
                            value: 'bold',
                        },
                        { value: null },
                    ],
                    fill: [
                        { test: 'datum.id === active', value: 'black' },
                        {
                            test: "indata('selected', 'source', datum.id)",
                            signal: 'colorIn',
                        },
                        {
                            test: "indata('selected', 'target', datum.id)",
                            signal: 'colorOut',
                        },
                        { value: 'black' },
                    ],
                },
            },
        },
        {
            type: 'group',
            from: {
                facet: {
                    name: 'path',
                    data: 'edges',
                    field: 'treepath',
                },
            },
            marks: [
                {
                    type: 'line',
                    interactive: false,
                    from: { data: 'path' },
                    encode: {
                        enter: {
                            interpolate: { value: 'bundle' },
                            strokeWidth: { value: 1.5 },
                        },
                        update: {
                            stroke: [
                                {
                                    test: 'parent.source === active',
                                    signal: 'colorOut',
                                },
                                {
                                    test: 'parent.target === active',
                                    signal: 'colorIn',
                                },
                                { value: 'steelblue' },
                            ],
                            strokeOpacity: [
                                {
                                    test: 'parent.source === active || parent.target === active',
                                    value: 1,
                                },
                                { value: 0.2 },
                            ],
                            tension: { signal: 'tension' },
                            x: { field: 'x' },
                            y: { field: 'y' },
                        },
                    },
                },
            ],
        },
    ],

    scales: [
        {
            name: 'color',
            type: 'ordinal',
            domain: ['depends on', 'imported by'],
            range: [{ signal: 'colorIn' }, { signal: 'colorOut' }],
        },
    ],
};

/**
 * Graph chart
 */
export const Graph = ({ data, title, ...props }: GraphProps): JSX.Element => (
    <>
        {title && <Typography level="title-md">{title}</Typography>}
        <Vega spec={spec} data={data} {...props} />
    </>
);
