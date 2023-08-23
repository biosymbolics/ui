'is client';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';

import { fetchOptions } from './actions';
import { Description } from './description';
import { Patents } from './patents';
import { SearchBar } from './search';

export const Page = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const terms = searchParams.terms?.split(';') ?? [];
    const minPatentYears = parseInt(searchParams.minPatentYears ?? '10', 10);
    const domains = searchParams.domains?.split(';') ?? [];

    if (terms.length === 0) {
        return <div>Missing terms</div>;
    }

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    fetchOptions={fetchOptions}
                    domains={domains}
                    minPatentYears={minPatentYears}
                    terms={terms}
                />
            </Section>
            <Section variant="main">
                <Section>
                    <Typography gutterBottom level="h1">
                        Terms: {terms.join(', ')}
                    </Typography>
                    <Suspense fallback={<Skeleton height="20vh" />}>
                        <Description terms={terms} />
                    </Suspense>
                </Section>
                <Section>
                    <Suspense fallback={<Skeleton height="80vh" />}>
                        <Patents
                            domains={domains}
                            minPatentYears={minPatentYears}
                            terms={terms}
                        />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
