export type UserProps = {
    name: string;
    username: string;
    avatar?: string;
};

export type ChatProps = {
    id: string;
    content: string;
    timestamp: string;
    unread?: boolean;
    sender: UserProps | 'You';
};

export type ChatsProps = {
    id: string;
    sender: UserProps;
    messages: ChatProps[];
};
