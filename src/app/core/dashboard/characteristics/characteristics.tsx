'use server';

import { DEFAULT_PATHNAME } from '@/constants';
import { SearchError } from '@/components/composite';
import { Heatmap } from '@/components/charts/heatmap';
import {
    BaseSearchArgs,
    HeadField,
    DocumentCharacteristic,
    TailField,
} from '@/types';

import { fetchDocumentCharacteristics } from './actions';
import { DocumentCharacteristicsControl, getClickUrl } from './control';

type DocCharacteristicsProps = BaseSearchArgs & {
    headField: HeadField;
    tailField: TailField;
    pathname?: string;
};

const CharacteristicsInner = async ({
    pathname = DEFAULT_PATHNAME,
    ...args
}: BaseSearchArgs & DocCharacteristicsProps) => {
    try {
        const data = await fetchDocumentCharacteristics(args);

        return (
            <Heatmap<DocumentCharacteristic>
                getClickUrl={getClickUrl}
                data={data}
                pathname={pathname}
                tooltipFields={['head', 'tail', 'documents']}
                xField="head"
                yField="tail"
            />
        );
    } catch (e) {
        return <SearchError error={e} />;
    }
};

/**
 * Document characteristics report component (heatmap of X by Y style reports)
 */
export const DocumentCharacteristics = (args: DocCharacteristicsProps) => (
    <DocumentCharacteristicsControl {...args}>
        <CharacteristicsInner {...args} />
    </DocumentCharacteristicsControl>
);
