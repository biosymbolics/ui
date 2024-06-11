'use client';

import { ReactNode } from 'react';
import Typography from '@mui/joy/Typography';

import { Section } from '@/components/layout/section';
import { DocumentCharacteristic, PatentSearchArgs } from '@/types';

export const DocumentCharacteristicsControl = ({
    terms,
    children,
}: PatentSearchArgs & { children: ReactNode }) => (
    <>
        <Section>
            <Typography level="h3">Landscape</Typography>
            <Typography gutterBottom level="body-md">
                Entities associated with search{' '}
                <b>{(terms || []).map((t) => `'${t}'`).join(', ')}</b>
            </Typography>
        </Section>
        {children}
        {/* <Section>
                <Select<HeadField>
                    defaultValue={headField}
                    label="Dimension"
                    onChange={(e: unknown, value: HeadField | null) => {
                        if (value) {
                            setParam('headField', value);
                        }
                    }}
                    options={['priorityDate', 'id']}
                    sx={{ maxWidth: 400, mb: 3 }}
                />
                {children}
            </Section> */}
    </>
);

/**
 * Gets URL for a given document characteristic
 * (specifying head and tail terms)
 */
export const getClickUrl = (object: DocumentCharacteristic) => {
    const ids = object.documents?.join(';');
    const term = `${object.tail} x ${object.head}`;
    return `patents?ids=${ids}&terms=${term}`;
};
