import { default as JoyChip, ChipProps as JoyChipProps } from '@mui/joy/Chip'

type ChipProps = {
    children: JoyChipProps['children']
    color?: JoyChipProps['color']
    component?: JoyChipProps['component']
    onClick?: JoyChipProps['onClick']
    size?: JoyChipProps['size']
    variant?: JoyChipProps['variant']
}

/**
 * Chip component
 */
export const Chip = ({ children, ...props }: ChipProps) => (
    <JoyChip variant="soft" {...props}>
        {children}
    </JoyChip>
)
