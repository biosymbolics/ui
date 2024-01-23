import { fetchApprovals } from '@/app/core/actions';
import { ApprovalsDetail } from '@/components/composite/approvals/client';

const ApprovalsDetailPage = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const ids = searchParams.ids?.split(';') ?? null;
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms && !ids) {
        return null;
    }

    const approvals = await fetchApprovals({ terms: ids || terms });
    return <ApprovalsDetail approvals={approvals} />;
};

export default ApprovalsDetailPage;
