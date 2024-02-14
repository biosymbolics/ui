import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchApprovals } from '@/app/core/actions';
import { ApprovalsDetail } from '@/components/composite/approvals/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';
import { PatentSearchArgsWithIdsSchema } from '@/types';

type Props = {
    searchParams: Record<string, string>;
};

const ApprovalsDetailInner = async ({ terms }: { terms: string[] }) => {
    const approvals = await fetchApprovals({ terms });
    return <ApprovalsDetail approvals={approvals} />;
};

const ApprovalsDetailModal = ({ searchParams }: Props) => {
    const { ids, terms, ...params } =
        PatentSearchArgsWithIdsSchema.parse(searchParams);

    return (
        <Modal isOpen title={searchParams.terms ?? '??'}>
            <Suspense fallback={<CircularProgress />}>
                <ApprovalsDetailInner {...params} terms={ids || terms || []} />
            </Suspense>
        </Modal>
    );
};

export default ApprovalsDetailModal;
