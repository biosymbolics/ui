'use server';

import 'server-only';

import NextLink from 'next/link';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import startCase from 'lodash/fp/startCase';

import { ChatPane } from '@/components/chat';

import { getChats } from './data';

export const Contents = async ({ chatId }: { chatId: string | null }) => {
    const chats = await getChats();

    if (!chatId || !chats[chatId]) {
        return (
            <Box>
                <Typography level="h2">Available Chats</Typography>
                <List marker="circle">
                    {Object.keys(chats).map((c) => (
                        <ListItem key={c}>
                            <Link
                                component={NextLink}
                                href={`/core/chat?chatId=${c}`}
                            >
                                {startCase(c)}
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
