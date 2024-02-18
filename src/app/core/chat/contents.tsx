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

const CONVERSATION_IDS = [
    'findExceptionalCompanies',
    'tradingBelowCash',
    'clinicalTrialHighDropout',
    'drugDeliverySystems',
];

export const Contents = ({
    conversationId,
}: {
    conversationId: string | null;
}) => {
    if (!conversationId || !CONVERSATION_IDS.includes(conversationId)) {
        return (
            <Box>
                <Typography level="h2">Available Chats</Typography>
                <List marker="circle">
                    {CONVERSATION_IDS.map((cId) => (
                        <ListItem key={cId}>
                            <Link
                                component={NextLink}
                                href={`/core/chat?conversationId=${cId}`}
                            >
                                {startCase(cId)}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }

    return <ChatPane conversationId={conversationId} />;
};
