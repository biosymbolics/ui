import NextLink from 'next/link';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { ReactNode } from 'react';

type TitleVariant = 'outlined' | 'soft' | 'plain' | 'solid';

const MAX_WIDTH = 800;

/**
 * Title component for pages or sections
 *
 * @param props.children
 * @param props.description
 * @param props.link
 * @param props.title
 * @param props.variant - outlined, soft, plain, solid
 */
export const Title = ({
    children,
    description,
    link,
    title,
    variant = 'plain',
}: {
    children?: ReactNode;
    title: string;
    description?: string;
    link?: { label: string; url: string };
    variant?: TitleVariant;
}) => (
    <Sheet variant={variant} sx={{ mx: -3, mb: 2, mt: -3, px: 3, py: 2 }}>
        <Typography gutterBottom level="h3" maxWidth={MAX_WIDTH}>
            {title}
        </Typography>
        {description && (
            <Typography gutterBottom level="body-md" maxWidth={MAX_WIDTH}>
                {description}
            </Typography>
        )}
        {link && (
            <Link component={NextLink} href={link.url} target="_blank">
                {link.label}
            </Link>
        )}
        {children}
    </Sheet>
);
