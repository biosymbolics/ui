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
    const { terms: termsStr } = searchParams;
    const terms = termsStr?.split(';') ?? [];

    if (!terms) {
        return null;
    }
    return (
        <Modal isOpen={!!searchParams.terms} title={termsStr || '??'}>
            <Suspense fallback={<CircularProgress />}>
                <PatentsDetailInner terms={terms} />
            </Suspense>
        </Modal>
    );
};

export default PatentsDetailModal;
