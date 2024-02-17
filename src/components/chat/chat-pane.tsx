'use client';

import { useState } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';

import {
    MockChatMessage,
    MockChatParams,
    MockChatParamsSchema,
} from '@/types/chat';

import { Avatar } from './avatar';
import { ChatBubble } from './chat-bubble';
import { ChatInput } from './chat-input';

type ChatPaneProps = {
    conversationKey: string;
    send: (message: MockChatParams) => Promise<MockChatMessage>;
};

export const ChatPane = ({ conversationKey, send }: ChatPaneProps) => {
    const [messages, setMessages] = useState<MockChatMessage[]>([]);

    return (
        <Sheet
            sx={{
                backgroundColor: 'background.level1',
                display: 'flex',
                flexDirection: 'column',
                height: {
                    xs: 'calc(100dvh)',
                    lg: '100dvh',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 5,
                    overflowY: 'scroll',
                    flexDirection: 'column-reverse',
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    {messages.map((message: MockChatMessage) => (
                        <Stack key={message.id} direction="row" spacing={2}>
                            <Avatar
                                variant={
                                    message.sender !== 'You' ? 'solid' : 'soft'
                                }
                            >
                                {message.sender !== 'You' ? 'BSY' : 'ME'}
                            </Avatar>
                            <ChatBubble {...message} />
                        </Stack>
                    ))}
                </Stack>
            </Box>
            <ChatInput
                onSubmit={(prompt: string) => {
                    console.info(prompt);
                    const newId = messages.length + 1;
                    const data = MockChatParamsSchema.parse({
                        conversationKey,
                        messageKey: (newId + 1).toString(),
                        prompt,
                    });
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: newId.toString(),
                            sender: 'You',
                            content: data.prompt,
                        },
                    ]);

                    send(data)
                        .then((m) => {
                            setMessages((prev) => [...prev, m]);
                        })
                        .catch((e) => console.error(e));

                    return new FormData();
                }}
            />
        </Sheet>
    );
};
