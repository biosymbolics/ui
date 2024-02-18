'use client';

import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';

import { ChatProvider, useChat } from '@/hooks/chat/chat-hook';
import { MockChatMessage } from '@/types/chat';

import { Avatar } from './avatar';
import { ChatBubble } from './chat-bubble';
import { ChatInput } from './chat-input';
import { ChatLoader } from './chat-loader';

type ChatPaneProps = {
    conversationId: string;
};

const ChatPaneInner = ({ conversationId }: ChatPaneProps) => {
    const { isPending, messages, send } = useChat();

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
                        <Stack
                            key={`${message.conversationId}-${message.messageId}`}
                            direction="row"
                            spacing={2}
                        >
                            <Avatar
                                variant={
                                    message.sender === 'ME' ? 'soft' : 'solid'
                                }
                            >
                                {message.sender || 'BSY'}
                            </Avatar>
                            <ChatBubble {...message} />
                        </Stack>
                    ))}
                    <ChatLoader isShowing={isPending} sender="BSY" />
                </Stack>
            </Box>
            <ChatInput
                isPending={isPending}
                onSubmit={(prompt: string) => {
                    send({
                        messageId: messages.length + 1,
                        conversationId,
                        sender: 'ME',
                        content: prompt,
                    }).catch((e) => console.error(e));
                }}
            />
        </Sheet>
    );
};

export const ChatPane = (props: ChatPaneProps) => (
    <ChatProvider>
        <ChatPaneInner {...props} />
    </ChatProvider>
);
