import { fetchPatents } from '@/app/core/actions';
import { PatentsDetail } from '@/components/composite/assets/client';
import { ControlledModal as Modal } from '@/components/navigation/modal';

const PatentsDetailModal = async ({
    searchParams,
}: {
    searchParams: Record<string, string>;
}) => {
    const terms = searchParams.terms?.split(';') ?? null;
    console.info('MOAL terms', terms);

    if (!terms) {
        return null;
    }
    const patents = await fetchPatents({ terms });
    return (
        <Modal isOpen={!!terms} title="Patents!">
            <PatentsDetail patents={patents} />
        </Modal>
    );
};

export default PatentsDetailModal;
