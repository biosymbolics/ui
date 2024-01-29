'use server';

import NextLink from 'next/link';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

import { ChatPane } from '@/components/chat';

import { getChats } from './data';

export const Contents = async ({ chatId }: { chatId: string | null }) => {
    const chats = await getChats();

    if (!chatId || !chats[chatId]) {
        return (
            <Box>
                <Typography level="h2">Chat not found</Typography>
                <Typography level="h4">Available chats:</Typography>
                <List marker="circle">
                    {Object.keys(chats).map((c) => (
                        <ListItem key={c}>
                            <Link
                                component={NextLink}
                                href={`/core/chat?chatId=${c}`}
                            >
                                {c}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }
    const chat = chats[chatId];
    return <ChatPane chat={chat} />;
};
