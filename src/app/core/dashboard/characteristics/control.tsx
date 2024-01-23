'use client';

import { ReactNode } from 'react';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';
import { Select } from '@/components/input';
import { useNavigation } from '@/hooks/navigation';
import { HeadField, PatentCharacteristic, PatentSearchArgs } from '@/types';
import { DEFAULT_PATHNAME } from '@/constants';

export const PatentCharacteristicsControl = ({
    headField,
    terms,
    children,
}: PatentSearchArgs & { children: ReactNode; headField: HeadField }) => {
    const { setParam } = useNavigation();

    return (
        <>
            <Section>
                <Typography level="h3">Patent Characteristics</Typography>
                <Typography gutterBottom level="body-md">
                    UMLS concepts directly or indirectly associated with patents
                    for search{' '}
                    <b>{(terms || []).map((t) => `'${t}'`).join(', ')}</b>
                </Typography>
            </Section>
            <Section>
                <Select<HeadField>
                    defaultValue={headField}
                    label="Dimension"
                    onChange={(e: unknown, value: HeadField | null) => {
                        if (value) {
                            setParam('headField', value);
                        }
                    }}
                    options={['priority_date', 'id']}
                    sx={{ maxWidth: 400, mb: 3 }}
                />
                {children}
            </Section>
        </>
    );
};

export const getClickUrl = (
    object: PatentCharacteristic,
    pathname: string = DEFAULT_PATHNAME
) => {
    const ids = object.documents?.join(';');
    const term = `${object.concept} x ${object.head}`;
    return `${pathname}/patents?ids=${ids}&terms=${term}`;
};
