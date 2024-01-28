'use server';

import Typography from '@mui/joy/Typography';

import { ChatPane } from '@/components/chat';

import { chats } from './data';

const Page = () => (
    <>
        <Typography gutterBottom level="h1">
            Chat
        </Typography>
        <ChatPane chat={chats[0]} />
    </>
);

export default Page;
