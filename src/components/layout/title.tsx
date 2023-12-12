import NextLink from 'next/link';
import Link from '@mui/joy/Link';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

type TitleVariant = 'outlined' | 'soft' | 'plain' | 'solid';

const MAX_WIDTH = 800;
export const Title = ({
    title,
    description,
    link,
    variant = 'plain',
}: {
    title: string;
    description?: string;
    link: { label: string; url: string };
    variant: TitleVariant;
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
        <Link component={NextLink} href={link.url} target="_blank">
            {link.label}
        </Link>
    </Sheet>
);
