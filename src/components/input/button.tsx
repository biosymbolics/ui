import { ReactElement } from 'react';
import {
    default as JoyButton,
    ButtonProps as JoyButtonProps,
} from '@mui/joy/Button';
import NextLink from 'next/link';

import { XOR } from '@/types/helpers';

export type ButtonProps = {
    children: JoyButtonProps['children'];
    color?: JoyButtonProps['color'];
    disabled?: JoyButtonProps['disabled'];
    endDecorator?: JoyButtonProps['endDecorator'];
    fullWidth?: JoyButtonProps['fullWidth'];
    isLoading?: JoyButtonProps['loading'];
    size?: JoyButtonProps['size'];
    sx?: JoyButtonProps['sx'];
    variant?: JoyButtonProps['variant'];
} & XOR<{ onClick: JoyButtonProps['onClick'] }, { href: string }>;

/**
 * Button wrapper
 */
export const Button = ({
    children,
    href,
    isLoading,
    ...props
}: ButtonProps): ReactElement<ButtonProps> => {
    const linkProps = href
        ? {
              component: NextLink,
              href,
          }
        : {};
    return (
        <JoyButton variant="soft" {...props} {...linkProps} loading={isLoading}>
            {children}
        </JoyButton>
    );
};
