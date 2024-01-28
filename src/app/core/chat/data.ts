import { ChatsProps, UserProps } from '@/components/chat';

export const users: UserProps[] = [
    {
        name: 'Steve E.',
        username: '@steveEberger',
        avatar: '/static/images/avatar/2.jpg',
        online: true,
    },
];

export const chats: ChatsProps[] = [
    {
        id: '1',
        sender: users[0],
        messages: [
            {
                id: '1',
                content: 'Hi Olivia, I am currently working on the project.',
                timestamp: 'Wednesday 9:00am',
                sender: users[0],
            },
            {
                id: '2',
                content: 'That sounds great, Mabel! Keep up the good work.',
                timestamp: 'Wednesday 9:10am',
                sender: 'You',
            },
            {
                id: '3',
                timestamp: 'Wednesday 11:30am',
                sender: users[0],
                content: 'I will send the draft by end of the day.',
            },
            {
                id: '4',
                timestamp: 'Wednesday 2:00pm',
                sender: 'You',
                content: 'Sure, I will be waiting for it.',
            },
            {
                id: '5',
                timestamp: 'Wednesday 4:30pm',
                sender: users[0],
                content: 'Just a heads up, I am about to send the draft.',
            },
        ],
    },
];
