import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchTrials } from '@/app/core/actions';
import { TrialsDetail } from '@/components/composite/trials/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';

type Props = {
    searchParams: Record<string, string>;
};

const TrialsDetailInner = async ({ terms }: { terms: string[] }) => {
    const trials = await fetchTrials({ terms });
    return <TrialsDetail trials={trials} />;
};

const TrialsDetailModal = ({ searchParams }: Props) => {
    const ids = searchParams.ids?.split(';') ?? null;
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms && !ids) {
        return null;
    }
    return (
        <Modal isOpen={!!searchParams.terms} title="Trials">
            <Suspense fallback={<CircularProgress />}>
                <TrialsDetailInner terms={ids || terms} />
            </Suspense>
        </Modal>
    );
};

export default TrialsDetailModal;
