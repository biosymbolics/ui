'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';

import { Button } from '@/components/input/button';
import { Autocomplete } from '@/components/input';
import { useNavigation } from '@/hooks/navigation';
import { Option } from '@/types/select';
import { Slider } from '@/components/input/slider';
import { Section } from '@/components/layout/section';

export const SearchBar = ({
    fetchOptions,
    minYears,
    terms,
}: {
    fetchOptions: (term: string) => Promise<Option[]>;
    minYears: number;
    terms: string[];
}): JSX.Element => {
    const { navigate } = useNavigation();
    const pathname = usePathname();
    const [newTerms, setTerms] = useState<string[] | null>(terms);
    const [newMinYears, setMinYears] = useState<number>(minYears);

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
                                setMinYears(value);
                            }}
                            defaultValue={newMinYears}
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
                        navigate(
                            `${pathname}?terms=${newTerms.join(
                                ','
                            )}&minYears=${newMinYears}`
                        );
                    }}
                    sx={{ marginLeft: 'auto' }}
                >
                    Search
                </Button>
            </Box>
        </>
    );
};
