import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchPatents } from '@/app/core/actions';
import { PatentsDetail } from '@/components/composite/patents/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';

type Props = {
    searchParams: Record<string, string>;
};

const PatentsDetailInner = async ({ terms }: { terms: string[] }) => {
    const patents = await fetchPatents({ terms });
    return <PatentsDetail patents={patents} />;
};

const PatentsDetailModal = ({ searchParams }: Props) => {
    const ids = searchParams.ids?.split(';') ?? null;
    const terms = searchParams.terms?.split(';') ?? null;

    if (!terms && !ids) {
        return null;
    }
    return (
        <Modal isOpen={!!searchParams.terms} title={searchParams.terms ?? '??'}>
            <Suspense fallback={<CircularProgress />}>
                <PatentsDetailInner terms={ids || terms} />
            </Suspense>
        </Modal>
    );
};

export default PatentsDetailModal;
