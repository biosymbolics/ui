'use client';

import React, {
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react';

import { MockChatMessage } from '@/types/chat';

type ChatContextType = {
    addMessage: (message: MockChatMessage) => void;
    clearMessages: () => void;
    isPending: boolean;
    messages: MockChatMessage[];
};

const ChatContext = createContext<ChatContextType>({
    addMessage: () => {},
    clearMessages: () => {},
    isPending: false,
    messages: [],
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<MockChatMessage[]>([]);

    const context: ChatContextType = useMemo(
        () => ({
            addMessage: (message) => setMessages((prev) => [...prev, message]),
            clearMessages: () => setMessages([]),
            isPending: false,
            messages,
        }),
        [messages]
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
