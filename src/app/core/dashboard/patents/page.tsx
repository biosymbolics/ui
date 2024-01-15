import { fetchPatents } from '@/app/core/actions';
import { PatentsDetail } from '@/components/composite/patents/client';

const PatentsDetailPage = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const terms = searchParams.terms?.split(';') ?? null;
    const patents = await fetchPatents({ terms });
    return <PatentsDetail patents={patents} />;
};

export default PatentsDetailPage;
