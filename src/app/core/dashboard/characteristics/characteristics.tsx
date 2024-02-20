'use server';

import { DEFAULT_PATHNAME } from '@/constants';
import { SearchError } from '@/components/composite';
import { Heatmap } from '@/components/charts/heatmap';
import {
    BaseSearchArgs,
    HeadField,
    PatentCharacteristic,
    PatentSearchArgs,
    TailField,
} from '@/types';

import { fetchDocumentCharacteristics } from './actions';
import { DocumentCharacteristicsControl, getClickUrl } from './control';

const CharacteristicsInner = async ({
    pathname = DEFAULT_PATHNAME,
    ...args
}: PatentSearchArgs & { headField: HeadField; pathname?: string }) => {
    try {
        const data = await fetchDocumentCharacteristics(args);

        return (
            <Heatmap<PatentCharacteristic>
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

export const DocumentCharacteristics = (
    args: BaseSearchArgs & {
        headField: HeadField;
        tailField: TailField;
        pathname?: string;
    }
) => (
    <DocumentCharacteristicsControl {...args}>
        <CharacteristicsInner {...args} />
    </DocumentCharacteristicsControl>
);
