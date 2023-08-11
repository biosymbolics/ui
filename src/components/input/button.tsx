import { ReactElement } from 'react';
import {
    default as JoyButton,
    ButtonProps as JoyButtonProps,
} from '@mui/joy/Button';

type ButtonProps = {
    children: JoyButtonProps['children'];
    color?: JoyButtonProps['color'];
    disabled?: JoyButtonProps['disabled'];
    fullWidth?: JoyButtonProps['fullWidth'];
    isLoading?: JoyButtonProps['loading'];
    onClick?: JoyButtonProps['onClick'];
    size?: JoyButtonProps['size'];
    variant?: JoyButtonProps['variant'];
};

/**
 * Button wrapper
 */
export const Button = ({
    children,
    isLoading,
    ...props
}: ButtonProps): ReactElement<ButtonProps> => (
    <JoyButton variant="soft" {...props} loading={isLoading}>
        {children}
    </JoyButton>
);
