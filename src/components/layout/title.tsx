import NextLink from 'next/link';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export const Title = ({
    title,
    description,
    link,
}: {
    title: string;
    description: string;
    link: { label: string; url: string };
}) => (
    <>
        <Typography gutterBottom level="title-lg">
            {title}
        </Typography>
        <Typography gutterBottom level="body-md">
            {description}
        </Typography>
        <Link component={NextLink} href={link.url} target="_blank">
            {link.label}
        </Link>
    </>
);
