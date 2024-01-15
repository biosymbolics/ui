import { fetchApprovals } from '@/app/core/actions';
import { ApprovalsDetail } from '@/components/composite/approvals/client';

const ApprovalsDetailPage = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const terms = searchParams.terms?.split(';') ?? null;
    const approvals = await fetchApprovals({ terms, queryType: 'OR' });
    return <ApprovalsDetail approvals={approvals} />;
};

export default ApprovalsDetailPage;
