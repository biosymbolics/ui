'use client';

/* eslint-disable @typescript-eslint/naming-convention */

import Typography from '@mui/joy/Typography';
import CytoscapeComponent from 'react-cytoscapejs';
import { Stylesheet } from 'cytoscape';

import { PatentGraph, PatentEdge, PatentNode } from '@/types/patents';

import { BaseChartProps } from './types';

type GraphProps = BaseChartProps & {
    data: PatentGraph;
};

const transform = (data: PatentGraph) => ({
    edges: data.edges.map((edge: PatentEdge) => ({
        data: edge,
    })),
    nodes: data.nodes.map((node: PatentNode) => ({
        data: {
            ...node,
            color: node.group === 'patent' ? 'blue' : 'red',
            label: node.id,
            weight: node.group === 'patent' ? 60 : 20,
        },
        // group: node.group,
        position: {
            x: (node.position.x + 1) * 1000,
            y: (node.position.y + 1) * 1000,
        },
    })),
});

const styles: Stylesheet[] = [
    {
        selector: 'node',
        style: {
            content: 'data(name)',
            label: 'data(id)',
            'font-size': '18px',
            'text-valign': 'top',
            'text-halign': 'center',
            'background-color': 'data(color)',
            'overlay-padding': '6px',
            width: 'data(weight)',
            height: 'data(weight)',
        },
    },
    {
        selector: 'edge',
        style: {
            opacity: '0.3',
            'line-color': '#bbb',
            'overlay-padding': '3px',
        },
    },
] as Stylesheet[];

/**
 * Graph chart
 *
 * @see https://github.com/cytoscape/cytoscape.js
 */
export const Graph = ({ data, title, ...props }: GraphProps): JSX.Element => {
    console.info('Graph', data);

    return (
        <>
            {title && <Typography level="title-md">{title}</Typography>}
            <CytoscapeComponent
                {...props}
                elements={CytoscapeComponent.normalizeElements(transform(data))}
                layout={{
                    name: 'preset',
                    fit: true,
                    padding: 30,
                }}
                stylesheet={styles}
                style={{ width: '100%', height: '100%' }}
            />
        </>
    );
};
