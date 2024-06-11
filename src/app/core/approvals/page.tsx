import { fetchApprovals } from '@/app/core/actions';
import { ApprovalsDetail } from '@/components/composite/approvals/client';
import { RegulatoryApprovalSearchArgsWithIdsSchema } from '@/types';

/**
 * Regulatory Approval detail page component
 * (used as a page and modal content)
 */
const ApprovalsDetailPage = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const { ids, terms, ...params } =
        RegulatoryApprovalSearchArgsWithIdsSchema.parse(searchParams);

    if (!terms && !ids) {
        return null;
    }

    const approvals = await fetchApprovals({ terms: ids || terms });
    return <ApprovalsDetail {...params} approvals={approvals} />;
};

export default ApprovalsDetailPage;
