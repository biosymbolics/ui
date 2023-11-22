'use client';

import { SetStateAction, useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

import { Button } from '@/components/input/button';
import { Autocomplete } from '@/components/input';
import { Slider } from '@/components/input/slider';
import { Section } from '@/components/layout/section';
import { useNavigation } from '@/hooks/navigation';
import { PatentSearchArgs } from '@/types/patents';
import { Option } from '@/types/select';
import { getQueryArgs } from '@/utils/patents';
import { Checkbox } from '@/components/input/checkbox';
import { Select } from '@/components/input/select';

export const SearchBar = ({
    fetchOptions,
    isExhaustive,
    minPatentYears,
    queryType,
    exemplarPatents,
    terms,
}: {
    fetchOptions: (term: string) => Promise<Option[]>;
} & PatentSearchArgs): JSX.Element => {
    const { navigate } = useNavigation();
    const pathname = usePathname();
    const [newTerms, setTerms] = useState<string[] | null>(terms);
    const [newExemplarPatents, setExemplarPatents] = useState<string[] | null>(
        exemplarPatents
    );
    const [newQueryType, setQueryType] = useState<string | null>(queryType);
    const [newIsExhaustive, setIsExhaustive] = useState<boolean>(isExhaustive);
    const [newMinPatentYears, setMinPatentYears] =
        useState<number>(minPatentYears);

    const handlePatentLifeChange = (value: number) => {
        if (typeof value !== 'number') {
            console.warn(`Invalid value: ${JSON.stringify(value)}`);
            return;
        }
        setMinPatentYears(value);
    };

    return (
        <>
            <Typography gutterBottom level="h2">
                Select Terms
            </Typography>
            <Autocomplete<Option, true, false>
                isMultiple
                defaultValue={(terms || []).map((term) => ({
                    id: term,
                    label: term,
                }))}
                isOptionEqualToValue={(option: Option, value: Option) =>
                    option.id === value.id
                }
                onChange={(e, values) => {
                    setTerms(values.map((v) => v.id));
                }}
                optionFetcher={fetchOptions}
                size="lg"
                variant="soft"
            />
            <Section variant="l1">
                <Grid container spacing={4}>
                    <Grid xs={12} sm={4}>
                        <Slider
                            defaultValue={newMinPatentYears}
                            label="Minimum Patent Years Left"
                            min={0}
                            max={20}
                            onChange={(e, v) =>
                                handlePatentLifeChange(v as number)
                            }
                            size="lg"
                        />
                    </Grid>
                    <Grid xs={12} sm={2}>
                        <Select
                            defaultValue={queryType}
                            label="Search Type"
                            onChange={(
                                e: unknown,
                                value: SetStateAction<string | null>
                            ) => {
                                setQueryType(value);
                            }}
                            options={['AND', 'OR']}
                        />
                    </Grid>
                    <Grid xs={12} sm={3}>
                        <Checkbox
                            checked={newIsExhaustive}
                            label="Exhaustive"
                            onChange={(e) => {
                                setIsExhaustive(e.target.checked);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 1 }}>
                    <Grid xs={12} sm={6}>
                        <Autocomplete<Option, true, false>
                            isMultiple
                            defaultValue={(exemplarPatents || []).map(
                                (patent) => ({
                                    id: patent,
                                    label: patent,
                                })
                            )}
                            isOptionEqualToValue={(
                                option: Option,
                                value: Option
                            ) => option.id === value.id}
                            label="Exemplar Patents"
                            onChange={(e, values) => {
                                setExemplarPatents(values.map((v) => v.id));
                            }}
                            optionFetcher={fetchOptions}
                            size="md"
                            tooltip="Patents that exemplify the terms you are searching for."
                            variant="soft"
                        />
                    </Grid>
                </Grid>
            </Section>
            <Section variant="l2">
                <Button
                    onClick={() => {
                        if (!newTerms) {
                            console.debug("No terms selected, can't search");
                            return;
                        }
                        const queryArgs = getQueryArgs({
                            isExhaustive: newIsExhaustive,
                            minPatentYears: newMinPatentYears,
                            queryType: newQueryType,
                            exemplarPatents: newExemplarPatents,
                            terms: newTerms,
                        });
                        navigate(`${pathname}?${queryArgs}`);
                    }}
                    sx={{ ml: 'auto' }}
                >
                    Search
                </Button>
            </Section>
        </>
    );
};
