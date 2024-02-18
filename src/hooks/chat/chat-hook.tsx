'use client';

import React, {
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react';

import { MockChatMessage } from '@/types/chat';

import { send } from './chat-actions';

type ChatContextType = {
    clearMessages: () => void;
    error: string | null;
    isPending: boolean;
    messages: MockChatMessage[];
    send: (args: MockChatMessage) => Promise<MockChatMessage | null>;
};

const ChatContext = createContext<ChatContextType>({
    clearMessages: () => {},
    error: null,
    isPending: false,
    messages: [],
    send,
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [messages, setMessages] = useState<MockChatMessage[]>([]);

    const context: ChatContextType = useMemo(
        () => ({
            clearMessages: () => setMessages([]),
            error,
            isPending,
            messages,
            send: async (message) => {
                setIsPending(true);
                setError(null);
                setMessages((prev) => [...prev, { ...message, sender: 'ME' }]);

                try {
                    const response = await send(message);
                    setMessages((prev) => [...prev, response]);
                    setIsPending(false);
                    return response;
                } catch (e) {
                    setError('Failed to send message');
                    setIsPending(false);
                    return null;
                }
            },
        }),
        [error, isPending, messages]
    );

    return (
        <ChatContext.Provider value={context}>{children}</ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
