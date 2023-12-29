import { Suspense } from 'react';
import Skeleton from '@mui/joy/Skeleton';

import { fetchPatents } from '@/app/core/actions';
import { PatentsDetail } from '@/components/composite/assets/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';

const PatentsDetailInner = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms) {
        return null;
    }
    const patents = await fetchPatents({ terms });
    return <PatentsDetail patents={patents} />;
};

const PatentsDetailModal = ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => (
    <Modal isOpen={!!searchParams.terms} title="Patents">
        <Suspense fallback={<Skeleton />}>
            <PatentsDetailInner searchParams={searchParams} />
        </Suspense>
    </Modal>
);

export default PatentsDetailModal;
