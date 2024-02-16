'use client';

import { SetStateAction, useState } from 'react';
import { usePathname } from 'next/navigation';
import Grid from '@mui/joy/Grid';
import isEmpty from 'lodash/fp/isEmpty';

import {
    Autocomplete,
    Button,
    Select,
    Slider,
    TextArea,
} from '@/components/input';
import { Section } from '@/components/layout/section';
import { useNavigation } from '@/hooks/navigation';
import { PatentSearchArgs } from '@/types';
import { Option } from '@/types/select';
import { getQueryArgs } from '@/utils/patents';

import { FetchAutocompletions } from './types';

/**
 * Search bar for assets
 */
export const SearchBar = ({
    description: initialDescription,
    endYear: initialEndYear = 2024,
    fetchAutocompletions,
    k: initialK,
    queryType: initialQueryType = 'AND',
    startYear: initialStartYear = 2014,
    terms: initialTerms,
}: {
    fetchAutocompletions: FetchAutocompletions;
} & PatentSearchArgs): JSX.Element => {
    const { navigate } = useNavigation();
    const pathname = usePathname();
    const [terms, setTerms] = useState<string[]>(initialTerms || []);
    const [description, setDescription] = useState<string | null>(
        initialDescription || null
    );
    const [k, setK] = useState<number>(initialK || 1000);
    const [queryType, setQueryType] = useState<string | null>(
        initialQueryType || null
    );
    const [newYearRange, setYearRange] = useState<[number, number]>([
        initialStartYear,
        initialEndYear,
    ]);

    return (
        <>
            <Autocomplete<Option, true, false>
                isMultiple
                defaultValue={(terms || []).map((term) => ({
                    id: term,
                    label: term,
                }))}
                isOptionEqualToValue={(option: Option, value: Option) =>
                    option.id === value.id
                }
                label="Select Terms"
                onChange={(e, values) => {
                    setTerms(values.map((v) => v.id));
                }}
                optionFetcher={fetchAutocompletions}
                optionLabelField="label"
                size="xlg"
                tooltip="Compounds, diseases, MoAs, pharmaceutical companies, etc."
                variant="soft"
            />
            <Section variant="l2">
                <TextArea
                    aria-label="description"
                    defaultValue={description || undefined}
                    label="Describe technology, platform, or theme"
                    onChange={(e) => setDescription(e.target.value)}
                    maxRows={20}
                    minRows={2}
                    placeholder="(optional) describe the invention or technology you are interested in."
                />
            </Section>

            <Section variant="l1">
                <Grid container spacing={2}>
                    <Grid xs={12} sm={4}>
                        <Slider<[number, number]>
                            defaultValue={newYearRange}
                            label="Year Range"
                            onChange={(value) => setYearRange(value)}
                            min={2000}
                            minDistance={2}
                            max={2025}
                            size="lg"
                            sx={{ mr: 3 }}
                            valueLabelDisplay="on"
                        />
                    </Grid>

                    <Grid xs={12} sm={4}>
                        <Slider<number>
                            defaultValue={k}
                            label="Search Breadth"
                            onChange={(newK) => setK(newK)}
                            min={100}
                            max={5000}
                            size="lg"
                            step={100}
                            sx={{ mr: 3 }}
                            tooltip="KNN, aka how distantly to search for related IP. Higher values will take longer to compute."
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
                </Grid>
            </Section>
            <Section variant="l2">
                <Button
                    onClick={() => {
                        if (isEmpty(terms) && isEmpty(description)) {
                            console.warn(
                                "No terms selected nor description specified; can't search"
                            );
                            return;
                        }
                        const queryArgs = getQueryArgs({
                            endYear: newYearRange?.[1],
                            description,
                            k,
                            queryType,
                            startYear: newYearRange?.[0],
                            terms,
                        });
                        navigate(`${pathname}?${queryArgs}`);
                    }}
                    size="lg"
                    sx={{ ml: 'auto' }}
                >
                    Search
                </Button>
            </Section>
        </>
    );
};
