import link from 'next/link'
import { default as JoyChip, ChipProps as JoyChipProps } from '@mui/joy/Chip'
import Tooltip from '@mui/joy/Tooltip'

type ChipProps = {
    children: JoyChipProps['children']
    color?: JoyChipProps['color']
    component?: JoyChipProps['component']
    href?: string
    icon?: React.ReactNode
    onClick?: JoyChipProps['onClick']
    size?: JoyChipProps['size']
    tooltip?: string | JSX.Element
    variant?: JoyChipProps['variant']
}

/**
 * Chip component
 */
export const Chip = ({
    children,
    href,
    icon,
    tooltip,
    ...props
}: ChipProps) => {
    const chip = (
        <JoyChip
            slotProps={href ? { action: { component: link, href: href } } : {}}
            startDecorator={icon}
            variant="soft"
            {...props}
        >
            {children}
        </JoyChip>
    )

    if (tooltip) {
        ;<Tooltip title={tooltip} variant="outlined">
            {chip}
        </Tooltip>
    }
}
