import { Suspense } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

import { fetchPatents } from '@/app/core/actions';
import { PatentsDetail } from '@/components/composite/patents/client';
import { RouteableModal as Modal } from '@/components/navigation/modal';
import { PatentSearchArgsWithIdsSchema } from '@/types';

type Props = {
    searchParams: Record<string, string>;
};

const PatentsDetailInner = async ({ terms }: { terms: string[] }) => {
    const patents = await fetchPatents({ terms });
    return <PatentsDetail patents={patents} />;
};

const PatentsDetailModal = ({ searchParams }: Props) => {
    const { ids, terms, ...params } =
        PatentSearchArgsWithIdsSchema.parse(searchParams);

    return (
        <Modal isOpen={!!searchParams.terms} title={searchParams.terms ?? '??'}>
            <Suspense fallback={<CircularProgress />}>
                <PatentsDetailInner {...params} terms={ids || terms || []} />
            </Suspense>
        </Modal>
    );
};

export default PatentsDetailModal;
