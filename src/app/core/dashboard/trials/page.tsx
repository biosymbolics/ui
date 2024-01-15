import { fetchTrials } from '@/app/core/actions';
import { TrialsDetail } from '@/components/composite/trials/client';

const TrialsDetailPage = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const terms = searchParams.terms?.split(';') ?? null;
    const trials = await fetchTrials({ terms, queryType: 'OR' });
    return <TrialsDetail trials={trials} />;
};

export default TrialsDetailPage;
