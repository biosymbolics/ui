'use client';

import Typography from '@mui/joy/Typography';
import ForceGraph3D from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

import { BaseChartProps, PatentGraph, PatentLink } from './types';

type ForceDirectedProps = BaseChartProps & {
    data: PatentGraph;
};
const CoordValues = {
    x: 'x',
    y: 'y',
    z: 'z',
};
type Coords = Record<keyof typeof CoordValues, number>;

/**
 * Force direted chart
 * @see https://github.com/vasturiano/react-force-graph
 */
export const ForceDirected = ({
    data,
    ...props
}: ForceDirectedProps): JSX.Element => (
    <>
        <Typography level="title-md">Force Directed Graph</Typography>
        <ForceGraph3D
            {...props}
            linkThreeObjectExtend
            graphData={data}
            linkSource="source"
            linkTarget="target"
            linkThreeObject={(link: PatentLink) =>
                new SpriteText(
                    `${link.source} > ${link.target}`,
                    1.5,
                    'lightgrey'
                )
            }
            linkPositionUpdate={(
                sprite: { position: Coords },
                { start, end }: { start: Coords; end: Coords }
            ) => {
                const middlePos = {
                    x: (start.x + end.x) / 2,
                    y: (start.y + end.y) / 2,
                    z: (start.z + end.z) / 2,
                };

                // Position sprite
                Object.assign(sprite.position, middlePos);
            }}
            nodeId="id"
        />
    </>
);
