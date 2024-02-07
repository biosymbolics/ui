import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchApprovals } from '@/app/core/actions';
import { ApprovalsDetail } from '@/components/composite/approvals/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';

type Props = {
    searchParams: Record<string, string>;
};

const ApprovalsDetailInner = async ({ terms }: { terms: string[] }) => {
    const approvals = await fetchApprovals({ terms });
    return <ApprovalsDetail approvals={approvals} />;
};

const ApprovalsDetailModal = ({ searchParams }: Props) => {
    const ids = searchParams.ids?.split(';') ?? null;
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms && !ids) {
        return null;
    }
    return (
        <Modal isOpen={!!searchParams.terms} title={searchParams.terms ?? '??'}>
            <Suspense fallback={<CircularProgress />}>
                <ApprovalsDetailInner terms={ids || terms} />
            </Suspense>
        </Modal>
    );
};

export default ApprovalsDetailModal;
