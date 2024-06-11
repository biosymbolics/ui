'use server';

import Typography from '@mui/joy/Typography';

import { FindCompaniesArgsSchema } from '@/types';

import { FindCompanies } from './contents';

/**
 * Page component for finding companies
 */
const FindCompaniesPage = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const params = FindCompaniesArgsSchema.parse(searchParams);

    return (
        <>
            <Typography gutterBottom level="h1">
                Search for Companies
            </Typography>
            <FindCompanies {...params} />
        </>
    );
};

export default FindCompaniesPage;
