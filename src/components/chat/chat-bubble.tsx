'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import ReactMarkdown from 'react-markdown';
import camelCase from 'lodash/fp/camelCase';

import { Gantt } from '@/components/charts/gantt';
import { Heatmap } from '@/components/charts/heatmap';
import { ConceptDecompositionSummary } from '@/components/composite/concepts';
import { ClindevResponseSchema } from '@/types/clindev';
import {
    ConceptDecompositionReportSchema,
    InterventionDropoutReportSchema,
    MockChatMessage,
} from '@/types/chat';
import { formatKeys } from '@/utils/object';

type ChatBubbleProps = MockChatMessage;

/**
 * Hacky component to show hard-coded chat message types
 *
 * @param type
 * @param content
 * @param description
 */
const getChild = (
    type: string,
    content: string,
    description: string | null = null
) => {
    if (type === 'CONCEPT_DECOMPOSITION') {
        const parsed = ConceptDecompositionReportSchema.safeParse(
            formatKeys(JSON.parse(content), camelCase)
        );
        if (parsed.success === false) {
            const message = `Failed to parse: ${parsed.error.toString()}`;
            console.error(message, parsed);
            throw new Error(message);
        }
        const { data } = parsed;
        return <ConceptDecompositionSummary concepts={data} />;
    }
    if (type === 'HEATMAP') {
        const parsed = InterventionDropoutReportSchema.safeParse(
            JSON.parse(content)
        );
        if (parsed.success === false) {
            const message = `Failed to parse: ${parsed.error.toString()}`;
            console.error(message, parsed);
            throw new Error(message);
        }
        const { data } = parsed;
        return (
            <Box sx={{ my: 2 }}>
                {description || ''}
                <Heatmap
                    data={data}
                    pathname=""
                    tooltipFields={['reason', 'intervention']}
                    xField="reason"
                    yField="intervention"
                    width={600}
                />
            </Box>
        );
    }
    if (type === 'TIMELINE') {
        const parsed = ClindevResponseSchema.safeParse(JSON.parse(content));
        if (parsed.success === false) {
            const message = `Failed to parse: ${parsed.error.toString()}`;
            console.error(message, parsed);
            throw new Error(message);
        }
        const { data } = parsed;
        return (
            <Box sx={{ my: 2 }}>
                {description && (
                    <Typography gutterBottom>{description}</Typography>
                )}
                <Gantt
                    height={400}
                    pathname="/core/chat"
                    xField="x"
                    xFieldTitle="Years"
                    x2Field="x2"
                    yField="y"
                    yFieldTitle="Stage"
                    data={data.map((d) => ({
                        y: d.stage || '???',
                        x: d.offset,
                        x2: d.offset + d.medianDuration,
                    }))}
                />
            </Box>
        );
    }
    return <ReactMarkdown>{content}</ReactMarkdown>;
};

export const ChatBubble = ({
    description,
    content,
    type = 'STANDARD',
}: ChatBubbleProps) => (
    <Box sx={{ width: '90%' }}>
        <Box sx={{ position: 'relative' }}>
            <Sheet
                color="primary"
                variant="outlined"
                sx={{
                    px: 2,
                    borderRadius: 'lg',
                }}
            >
                <Box sx={{ color: 'text.secondary', my: 1 }}>
                    {getChild(type, content, description)}
                </Box>
            </Sheet>
        </Box>
    </Box>
);
