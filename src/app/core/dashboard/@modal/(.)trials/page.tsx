import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchTrials } from '@/app/core/actions';
import { TrialsDetail } from '@/components/composite/trials/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';

type Props = {
    searchParams: Record<string, string>;
};

const TrialsDetailInner = async ({ searchParams }: Props) => {
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms) {
        return null;
    }
    const trials = await fetchTrials({ terms, queryType: 'OR' });
    return <TrialsDetail trials={trials} />;
};

const TrialsDetailModal = ({ searchParams }: Props) => (
    <Modal isOpen={!!searchParams.terms} title="Trials">
        <Suspense fallback={<CircularProgress />}>
            <TrialsDetailInner searchParams={searchParams} />
        </Suspense>
    </Modal>
);

export default TrialsDetailModal;
