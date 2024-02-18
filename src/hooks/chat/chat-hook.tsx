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
    isPending: boolean;
    messages: MockChatMessage[];
    send: (args: MockChatMessage) => Promise<MockChatMessage>;
};

const ChatContext = createContext<ChatContextType>({
    clearMessages: () => {},
    isPending: false,
    messages: [],
    send,
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [isPending, setIsPending] = useState(false);
    const [messages, setMessages] = useState<MockChatMessage[]>([]);

    const context: ChatContextType = useMemo(
        () => ({
            clearMessages: () => setMessages([]),
            isPending,
            messages,
            send: async (message) => {
                setIsPending(true);
                setMessages((prev) => [...prev, { ...message, sender: 'ME' }]);
                const response = await send(message);
                setMessages((prev) => [...prev, response]);
                setIsPending(false);
                return response;
            },
        }),
        [isPending, messages]
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
