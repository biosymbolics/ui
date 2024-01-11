'use client';

import { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import { DEFAULT_PATHNAME } from '@/constants';
import { Heatmap } from '@/components/charts/heatmap';
import { Section } from '@/components/layout/section';
import { Select } from '@/components/input/select';
import { HeadField, PatentSearchArgs } from '@/types/documents/patents';

import { fetchPatentCharacteristics } from './actions';

export const PatentCharacteristics = async ({
    pathname = DEFAULT_PATHNAME,
    terms,
    ...args
}: PatentSearchArgs & { pathname?: string }) => {
    const [headField, setHeadField] = useState<HeadField>('priority_year');
    try {
        const data = await fetchPatentCharacteristics({
            terms,
            headField,
            ...args,
        });

        return (
            <>
                <Section>
                    <Typography level="h3">Patent Characteristics</Typography>
                    <Typography gutterBottom level="body-md">
                        UMLS concepts directly or indirectly associated with
                        patents for search{' '}
                        <b>{(terms || []).map((t) => `'${t}'`).join(', ')}</b>
                    </Typography>
                </Section>
                <Section>
                    <Select<HeadField>
                        defaultValue={headField}
                        label="Dimension"
                        onChange={(e: unknown, value: HeadField | null) => {
                            if (value) {
                                setHeadField(value);
                            }
                        }}
                        options={['priority_year', 'assignee']}
                        sx={{ maxWidth: 400, mb: 3 }}
                    />
                    <Heatmap
                        clickBaseUrl={`${pathname}/patents?terms=`}
                        clickField="documents"
                        data={data}
                        pathname={pathname}
                        xField="head"
                        yField="concept"
                    />
                </Section>
            </>
        );
    } catch (e) {
        return (
            <Box>
                Failed to fetch patents:{' '}
                {e instanceof Error ? e.message : JSON.stringify(e)}
            </Box>
        );
    }
};
