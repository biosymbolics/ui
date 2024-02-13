'use server';

import Typography from '@mui/joy/Typography';

import { FindBuyers } from './contents';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const description = searchParams.description ?? '';
    const useGptExpansion = searchParams.useGptExpansion === 'true';
    const k = parseInt(searchParams.k ?? 1000, 10);

    return (
        <>
            <Typography gutterBottom level="h1">
                Search for Potential IP Buyers
            </Typography>
            <FindBuyers
                description={description}
                useGptExpansion={useGptExpansion}
                k={k}
            />
        </>
    );
};

export default Page;
