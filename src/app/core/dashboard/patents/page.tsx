import { fetchPatents } from '@/app/core/actions';
import { PatentsDetail } from '@/components/composite/patents/client';

const PatentsDetailPage = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const ids = searchParams.ids?.split(';') ?? null;
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms && !ids) {
        return null;
    }
    const patents = await fetchPatents({ terms: ids || terms });

    return <PatentsDetail patents={patents} />;
};

export default PatentsDetailPage;
