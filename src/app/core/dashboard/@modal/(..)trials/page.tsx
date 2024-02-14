import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchTrials } from '@/app/core/actions';
import { TrialsDetail } from '@/components/composite/trials/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';
import { PatentSearchArgsWithIdsSchema } from '@/types';

type Props = {
    searchParams: Record<string, string>;
};

const TrialsDetailInner = async ({ terms }: { terms: string[] }) => {
    const trials = await fetchTrials({ terms });
    return <TrialsDetail trials={trials} />;
};

const TrialsDetailModal = ({ searchParams }: Props) => {
    const { ids, terms, ...params } =
        PatentSearchArgsWithIdsSchema.parse(searchParams);

    return (
        <Modal isOpen title={searchParams.terms ?? '??'}>
            <Suspense fallback={<CircularProgress />}>
                <TrialsDetailInner {...params} terms={ids || terms || []} />
            </Suspense>
        </Modal>
    );
};

export default TrialsDetailModal;
