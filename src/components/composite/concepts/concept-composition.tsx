import NextLink from 'next/link';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';

import { ConceptDecompositionReport } from '@/types/chat';
import { Line } from '@/components/charts/line';
import { DEFAULT_PATHNAME } from '@/constants';

export const ConceptDecompositionSummary = ({
    concepts,
}: {
    concepts: ConceptDecompositionReport;
}) => (
    <>
        <List sx={{ ml: 3 }}>
            {concepts.map((concept) => (
                <ListItem key={concept.name} sx={{ display: 'list-item' }}>
                    <ListItemContent>
                        <Link
                            component={NextLink}
                            href={`/core/dashboard?description=${concept.description}&type=companies`}
                            target="_blank"
                        >
                            <b>{concept.name}</b>
                        </Link>
                        {':  '}
                        {concept.description}
                    </ListItemContent>
                </ListItem>
            ))}
        </List>
        <Box sx={{ my: 2 }}>
            <Line
                height={300}
                pathname={DEFAULT_PATHNAME}
                series={concepts.map((c) => ({
                    name: c.name,
                    data: c.report
                        .map((d) => ({
                            x: d.year,
                            y: d.count,
                        }))
                        .sort((a, b) => a.x - b.x),
                }))}
                subtitle="(WIPO Patents and Trials)"
                title="Activity Over Time"
                variant="minimal"
            />
        </Box>
    </>
);
