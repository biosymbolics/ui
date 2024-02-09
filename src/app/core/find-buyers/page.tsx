'use server';

import Typography from '@mui/joy/Typography';

import { FindBuyers } from './contents';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const description = searchParams.description ?? '';

    return (
        <>
            <Typography gutterBottom level="h1">
                Find Buyers
            </Typography>
            <FindBuyers description={description} />
        </>
    );
};

export default Page;
