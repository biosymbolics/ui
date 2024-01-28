'use server';

import { ChatPane } from '@/components/chat';

import { chats } from './data';

const Page = () => <ChatPane chat={chats[0]} />;

export default Page;
