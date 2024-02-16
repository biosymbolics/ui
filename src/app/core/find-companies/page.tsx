'use server';

import Typography from '@mui/joy/Typography';

import { FindCompaniesParamsSchema } from '@/types';

import { FindCompanies } from './contents';

const Page = ({ searchParams }: { searchParams: Record<string, string> }) => {
    const params = FindCompaniesParamsSchema.parse(searchParams);

    return (
        <>
            <Typography gutterBottom level="h1">
                Search for Companies
            </Typography>
            <FindCompanies {...params} />
        </>
    );
};

export default Page;
