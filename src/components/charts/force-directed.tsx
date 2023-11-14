'use client';

import Typography from '@mui/joy/Typography';
import ForceGraph2D, { NodeObject } from 'react-force-graph-2d';

import { PatentGraph, PatentLink, PatentNode } from '@/types/patents';

import { BaseChartProps } from './types';

type ForceDirectedProps = BaseChartProps & {
    data: PatentGraph;
};

type CanvasNode = NodeObject<PatentNode>;

/**
 * Force directed chart
 *
 * Features
 *   - it's 3d (right now - probably want to add 2d option)
 *   - has text labels on nodes
 *   - link width is based on weight (as provided in data)
 *
 * @see https://github.com/vasturiano/react-force-graph
 */
export const ForceDirected = ({
    data,
    title,
    ...props
}: ForceDirectedProps): JSX.Element => (
    <>
        {title && <Typography level="title-md">{title}</Typography>}
        <ForceGraph2D
            {...props}
            graphData={data}
            linkSource="source"
            linkTarget="target"
            linkWidth={(link: PatentLink) => link.weight}
            nodeCanvasObject={(
                node: CanvasNode,
                ctx: CanvasRenderingContext2D,
                globalScale
            ) => {
                if (node.x == null || node.y == null || ctx == null) {
                    return;
                }

                const label = node.id;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                const textWidth = ctx.measureText(label).width;

                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.fillRect(
                    node.x - textWidth + (fontSize * 0.2) / 2,
                    node.y - (fontSize * 2 * 1.2) / 2,
                    textWidth + fontSize * 0.2,
                    fontSize * 2 * 1.2
                );

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#000';
                ctx.fillText(label, node.x, node.y);
            }}
            nodeId="id"
        />
    </>
);
