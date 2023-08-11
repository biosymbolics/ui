import link from 'next/link';
import { default as JoyChip, ChipProps as JoyChipProps } from '@mui/joy/Chip';
import Tooltip from '@mui/joy/Tooltip';

type ChipProps = {
    children: JoyChipProps['children'];
    color?: JoyChipProps['color'];
    component?: JoyChipProps['component'];
    href?: string;
    icon?: React.ReactNode;
    onClick?: JoyChipProps['onClick'];
    size?: JoyChipProps['size'];
    sx?: JoyChipProps['sx'];
    tooltip?: string | JSX.Element;
    variant?: JoyChipProps['variant'];
};

/**
 * Chip component
 */
export const Chip = ({
    children,
    href,
    icon,
    tooltip,
    ...props
}: ChipProps): JSX.Element => {
    const chip = (
        <JoyChip
            slotProps={
                href
                    ? { action: { component: link, href, target: '_blank' } }
                    : {}
            }
            startDecorator={icon}
            variant="soft"
            {...props}
        >
            {children}
        </JoyChip>
    );

    if (tooltip) {
        return (
            <Tooltip title={tooltip} variant="outlined">
                {chip}
            </Tooltip>
        );
    }
    return chip;
};
