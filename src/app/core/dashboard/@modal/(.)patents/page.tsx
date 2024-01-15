import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchPatents } from '@/app/core/actions';
import { PatentsDetail } from '@/components/composite/patents/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';

type Props = {
    searchParams: Record<string, string>;
};

const PatentsDetailInner = async ({ searchParams }: Props) => {
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms) {
        return null;
    }
    const patents = await fetchPatents({ terms });
    return <PatentsDetail patents={patents} />;
};

const PatentsDetailModal = ({ searchParams }: Props) => (
    <Modal isOpen={!!searchParams.terms} title="Patents">
        <Suspense fallback={<CircularProgress />}>
            <PatentsDetailInner searchParams={searchParams} />
        </Suspense>
    </Modal>
);

export default PatentsDetailModal;
