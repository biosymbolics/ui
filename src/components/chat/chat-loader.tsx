import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';

import { Avatar } from './avatar';

/**
 * Chat loading indicator (avatar with three dots)
 */
export const ChatLoader = ({
    isShowing = true,
    sender,
    variant = 'solid',
}: {
    isShowing?: boolean;
    sender: string;
    variant?: 'solid' | 'soft';
}): JSX.Element | null =>
    isShowing ? (
        <Stack direction="row" sx={{ my: 3 }}>
            <Avatar variant={variant}>{sender}</Avatar>
            <Stack direction="row" alignSelf="center" marginLeft={2}>
                {Array.from(Array(3).keys()).map((k) => (
                    <Skeleton
                        key={k}
                        height={15}
                        width={15}
                        sx={{ mr: 0.5 }}
                        variant="circular"
                    />
                ))}
            </Stack>
        </Stack>
    ) : null;
