'is client';

import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';

import { Description } from './description';
import { Patents } from './patents';
import { SearchBar } from './search';
import { fetchOptions } from './utils';

export const Page = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const terms = searchParams.terms?.split(',') ?? [];
    const minPatentYears = parseInt(searchParams.minPatentYears ?? '10', 10);
    const relevancyThreshold = searchParams.relevancyThreshold ?? 'high';

    if (terms.length === 0) {
        return <div>Missing terms</div>;
    }

    return (
        <>
            <Section variant="separated">
                <SearchBar
                    fetchOptions={fetchOptions}
                    minPatentYears={minPatentYears}
                    terms={terms}
                    relevancyThreshold={relevancyThreshold}
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
                            minPatentYears={minPatentYears}
                            terms={terms}
                            relevancyThreshold={relevancyThreshold}
                        />
                    </Suspense>
                </Section>
            </Section>
        </>
    );
};

export default Page;
