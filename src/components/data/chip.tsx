import NextLink from 'next/link';
import React, { ReactNode } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import JoyChip, { ChipProps as JoyChipProps } from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';

import { formatLabel, getSelectableId } from '@/utils/string';

import { Section } from '../layout/section';

export type ChipProps = {
    children: JoyChipProps['children'];
    color?: JoyChipProps['color'];
    component?: JoyChipProps['component'];
    href?: string;
    icon?: React.ReactNode;
    openInNewTab?: boolean;
    onClick?: JoyChipProps['onClick'];
    size?: JoyChipProps['size'];
    sx?: JoyChipProps['sx'];
    tooltip?: string | ReactNode;
    variant?: JoyChipProps['variant'];
};

type ChipsProps = {
    baseUrl?: string;
    color?: ColorPaletteProp;
    isHorizontal?: boolean;
    isWrappable?: boolean;
    items: string[] | null;
    label?: string;
};

/**
 * Chip component wrapper
 */
export const Chip = ({
    children,
    href,
    icon,
    openInNewTab = true,
    tooltip,
    ...props
}: ChipProps): JSX.Element => {
    const chip = (
        <JoyChip
            slotProps={
                href
                    ? {
                          action: {
                              component: NextLink,
                              href,
                              target: openInNewTab ? '_blank' : undefined,
                          },
                      }
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
            <Tooltip
                title={<Box maxWidth={400}>{tooltip}</Box>}
                variant="outlined"
            >
                {chip}
            </Tooltip>
        );
    }
    return chip;
};

/**
 * Multi-chip renderer
 */
export const formatChips = ({
    baseUrl = undefined,
    color = 'primary',
    isHorizontal = true,
    items,
    label,
    isWrappable = true,
}: ChipsProps): ReactNode => {
    const chips = items
        ? items.map((c) => (
              <Chip
                  key={getSelectableId(c)}
                  color={color}
                  href={baseUrl ? `${baseUrl}?terms=${c}` : undefined}
                  sx={{ mr: 0.5, mt: 0.5 }}
              >
                  {formatLabel(c)}
              </Chip>
          ))
        : [];

    const Container = isHorizontal
        ? ({ children }: { children: ReactNode }) => (
              <Grid
                  container
                  alignItems="center"
                  flexWrap={isWrappable ? undefined : 'nowrap'}
              >
                  {children}
              </Grid>
          )
        : React.Fragment;

    if (chips.length === 0) {
        return <span />;
    }

    return (
        <Section variant="l2">
            <Container>
                {label && (
                    <Typography level="title-md" mr={0.5}>
                        {label}:
                    </Typography>
                )}
                {chips}
            </Container>
        </Section>
    );
};

/**
 * Element displaying a list (horiz or vertical) of chips
 */
export const Chips = (props: ChipsProps): ReactNode => formatChips(props);
