'use client';

import Typography from '@mui/joy/Typography';
import CytoscapeComponent from 'react-cytoscapejs';

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
        data: { ...node, label: node.id },
    })),
});

/**
 * Graph chart
 *
 * @see https://github.com/cytoscape/cytoscape.js
 */
export const Graph = ({ data, title, ...props }: GraphProps): JSX.Element => (
    <>
        {title && <Typography level="title-md">{title}</Typography>}
        <CytoscapeComponent
            {...props}
            elements={CytoscapeComponent.normalizeElements(transform(data))}
            layout={{
                name: 'random',
                fit: true,
                padding: 30,
            }}
            style={{ width: '100%', height: '100%' }}
        />
    </>
);
