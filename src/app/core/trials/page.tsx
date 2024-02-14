import { fetchTrials } from '@/app/core/actions';
import { TrialsDetail } from '@/components/composite/trials/client';

const TrialsDetailPage = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const ids = searchParams.ids?.split(';') ?? null;
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms && !ids) {
        return null;
    }
    const trials = await fetchTrials({ terms: ids || terms });
    return <TrialsDetail trials={trials} />;
};

export default TrialsDetailPage;
