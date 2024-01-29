'use client';

import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import ReactMarkdown from 'react-markdown';

import { Gantt } from '@/components/charts/gantt';
import { Heatmap } from '@/components/charts/heatmap';
import { ClindevResponseSchema } from '@/types/clindev';
import { InterventionDropoutReportSchema } from '@/types/chat';

import { ChatProps } from './types';

type ChatBubbleProps = ChatProps;

const getChild = (
    type: string,
    content: string,
    description: string | null = null
) => {
    if (type === 'heatmap') {
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
            <Heatmap
                data={data}
                pathname=""
                tooltipFields={['reason', 'intervention']}
                xField="reason"
                yField="intervention"
                width={600}
            />
        );
    }
    if (type === 'timeline') {
        if (typeof window === 'undefined') {
            return <span />;
        }
        const parsed = ClindevResponseSchema.safeParse(JSON.parse(content));
        if (parsed.success === false) {
            const message = `Failed to parse: ${parsed.error.toString()}`;
            console.error(message, parsed);
            throw new Error(message);
        }
        const { data } = parsed;
        return (
            <Box sx={{ my: 2 }}>
                {description || ''}
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
                        x2: d.offset + d.median_duration,
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
    type = 'text',
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
                <Box sx={{ color: 'text.secondary' }}>
                    {getChild(type, content, description)}
                </Box>
            </Sheet>
        </Box>
    </Box>
);
