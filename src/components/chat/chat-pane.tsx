'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';

import { Avatar } from './avatar';
import { ChatBubble } from './chat-bubble';
import { ChatInput } from './chat-input';
import { ChatProps, ChatsProps } from './types';

type MessagesPaneProps = {
    chat: ChatsProps;
};

export const ChatPane = ({ chat }: MessagesPaneProps) => {
    const [chatMessages, setChatMessages] = useState(chat.messages);

    useEffect(() => {
        setChatMessages(chat.messages);
    }, [chat.messages]);

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
                    {chatMessages.map((message: ChatProps, index: number) => (
                        <Stack key={index} direction="row" spacing={2}>
                            <Avatar>
                                {message.sender !== 'You' ? 'BSY' : 'ME'}
                            </Avatar>
                            <ChatBubble {...message} />
                        </Stack>
                    ))}
                </Stack>
            </Box>
            <ChatInput
                onSubmit={(value: string) => {
                    const newId = chatMessages.length + 1;
                    const newIdString = newId.toString();
                    setChatMessages([
                        ...chatMessages,
                        {
                            id: newIdString,
                            sender: 'You',
                            content: value,
                            timestamp: 'Just now',
                        },
                    ]);
                }}
            />
        </Sheet>
    );
};
