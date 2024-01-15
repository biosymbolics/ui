import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchApprovals } from '@/app/core/actions';
import { ApprovalsDetail } from '@/components/composite/approvals/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';

type Props = {
    searchParams: Record<string, string>;
};

const ApprovalsDetailInner = async ({ searchParams }: Props) => {
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms) {
        return null;
    }
    const approvals = await fetchApprovals({ terms });
    return <ApprovalsDetail approvals={approvals} />;
};

const ApprovalsDetailModal = ({ searchParams }: Props) => (
    <Modal isOpen={!!searchParams.terms} title="Approvals">
        <Suspense fallback={<CircularProgress />}>
            <ApprovalsDetailInner searchParams={searchParams} />
        </Suspense>
    </Modal>
);

export default ApprovalsDetailModal;
