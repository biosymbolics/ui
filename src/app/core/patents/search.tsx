'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';

import { Button } from '@/components/input/button';
import { Autocomplete } from '@/components/input';
import { Slider } from '@/components/input/slider';
import { Section } from '@/components/layout/section';
import { Select } from '@/components/input/select';
import { useNavigation } from '@/hooks/navigation';
import { PatentSearchArgs } from '@/types/patents';
import { Option } from '@/types/select';
import { getQueryArgs } from '@/utils/patents';

export const SearchBar = ({
    fetchOptions,
    minPatentYears,
    terms,
    relevanceThreshold,
}: {
    fetchOptions: (term: string) => Promise<Option[]>;
} & PatentSearchArgs): JSX.Element => {
    const { navigate } = useNavigation();
    const pathname = usePathname();
    const [newTerms, setTerms] = useState<string[] | null>(terms);
    const [newMinPatentYears, setMinPatentYears] =
        useState<number>(minPatentYears);
    const [newRelevanceThreshold, setRelevanceThreshold] =
        useState<string>(relevanceThreshold);

    return (
        <>
            <Autocomplete<Option, true, false>
                isMultiple
                defaultValue={terms.map((term) => ({ id: term, label: term }))}
                isOptionEqualToValue={(option: Option, value: Option) =>
                    option.id === value.id
                }
                label="Select terms"
                onChange={(e, values) => {
                    setTerms(values.map((v) => v.id));
                }}
                optionFetcher={fetchOptions}
                size="lg"
                variant="soft"
            />
            <Section>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={4}>
                        <Slider
                            label="Minimum Patent Years Left"
                            min={0}
                            max={20}
                            onChange={(e, value) => {
                                if (typeof value !== 'number') {
                                    console.warn(
                                        `Invalid value: ${JSON.stringify(
                                            value
                                        )}`
                                    );
                                    return;
                                }
                                setMinPatentYears(value);
                            }}
                            defaultValue={newMinPatentYears}
                        />
                    </Grid>
                    <Grid xs={12} sm={4}>
                        <Select
                            defaultValue={newRelevanceThreshold}
                            label="Term Relevance Threshold"
                            onChange={(e, value) => {
                                if (!value) {
                                    console.warn(
                                        'Invalid select value: undefined'
                                    );
                                    return;
                                }
                                setRelevanceThreshold(value);
                            }}
                            options={[
                                'very low',
                                'low',
                                'medium',
                                'high',
                                'very high',
                            ]}
                        />
                    </Grid>
                </Grid>
            </Section>
            <Box display="flex" marginTop={3}>
                <Button
                    onClick={() => {
                        if (!newTerms) {
                            console.debug("No terms selected, can't search");
                            return;
                        }
                        const queryArgs = getQueryArgs({
                            minPatentYears: newMinPatentYears,
                            relevanceThreshold: newRelevanceThreshold,
                            terms: newTerms,
                        });
                        navigate(`${pathname}?${queryArgs}`);
                    }}
                    sx={{ marginLeft: 'auto' }}
                >
                    Search
                </Button>
            </Box>
        </>
    );
};
